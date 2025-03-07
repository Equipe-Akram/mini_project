import * as authModel from '../models/authModel.js';
import * as jwtUtils from '../utils/jwtUtils.js';
import * as passwordUtils from '../utils/passwordUtils.js';
import * as Token from '../models/tokenModel.js'
import * as resetTokenModel from '../models/resetTokenModel.js'
import * as verificationTokenModel from '../models/verificationTokenModel.js'
import * as nodeMailerUtils from '../utils/nodeMailerUtils.js'

 
export const register = async (req, res, next) => {
    const { nom, prenom, email, password } = req.body;
    const hashedPassword = await passwordUtils.hashPassword(password)
    try {
        const user = await authModel.register(nom, prenom, email, hashedPassword)
        //const token = jwtUtils.generateToken(user)

        /* const refreshToken = jwtUtils.generateRefreshToken(user)
        await Token.save(user.id, refreshToken)
        res.cookie("refreshToken", refreshToken, {httpOnly: false, secure: false, sameSite:"None"}) */

        const verifyToken = jwtUtils.generateToken(user)
        await verificationTokenModel.save(email, verifyToken, new Date(Date.now() + 3600000))

        const verifyLink = `${process.env.CLIENT_URL}/auth/verify/${verifyToken}`
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Account Verification',
            text: `Click on the link to verify your account: ${verifyLink}`
        };
        await nodeMailerUtils.transporter.sendMail(mailOptions);
        res.json({ message: "User registered successfully, verification email sent" });
        
    } catch (error) {
        next(error)
    }
}
export const verifyAccount = async (req, res, next) => {
    const { token } = req.params;
    try {
        const decoded = jwtUtils.verifyToken(token)
        if (!decoded) return res.status(400).json({ message: 'Invalid token' });

        const verifyToken = await verificationTokenModel.find(decoded.email, token)
        if (!verifyToken) return res.status(400).json({ message: 'Invalid token' });

        if (new Date(verifyToken.expires_at) < new Date()) {
            return res.status(400).send('Token has expired');
        }

        await authModel.verifyAccount(decoded.email)
        await verificationTokenModel.del(token)
        res.json({ message: "Account verified successfully" });
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.login(email);
        if (!user) {
            return res.status(400).send({message : 'Email not found'})
        }
        if (!user.is_verified) {
            return res.status(401).send({message : 'Account not verified'})
        }
        const passwordIsValid = await passwordUtils.comparePassword(password, user.password)
        if (!passwordIsValid) {
            return res.status(402).send({message : 'Invalid email or password'})
        }
        const token = jwtUtils.generateToken(user)
        const refreshToken = jwtUtils.generateRefreshToken(user)

        await Token.save(user.id, refreshToken)
        
        res.cookie("refreshToken", refreshToken, {httpOnly: false,maxAge: 24*60*60*1000, secure: false, sameSite:"None"})
        res.json({ token, refreshToken })

    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req, res, next) => {
    const {refreshToken} = req.cookies
    if (!refreshToken) return res.sendStatus(401)

    const tokenExist = await Token.find(refreshToken)
    if (!tokenExist) return res.sendStatus(403)

    try {
        const user = jwtUtils.verifyRefreshToken(refreshToken)
        if (!user) return res.sendStatus(403)

        await Token.del(refreshToken)

        const newAccessToken = jwtUtils.generateToken({id: user.id,email:user.email})
        const newRefreshToken = jwtUtils.generateRefreshToken({id: user.id,email:user.email})

        await Token.save(user.id, newRefreshToken)

        res.cookie("refreshToken", newRefreshToken, {httpOnly: false, secure: false, sameSite:"None"}) 
        res.json({ newAccessToken })
    } catch (error){
        next(error)
    }  
}
export const logout = async (req, res, next) => {
    try {
        await Token.del(req.cookies.refreshToken)
        res.clearCookie('refreshToken')
        res.json({ message: "Logged out successfully" });
    }catch (error) {
        next(error)
    }   
}
export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await authModel.login(email);
        if (!user) {
            return res.status(400).send({message : 'Email not found'})
        }
        const resetToken = jwtUtils.generateToken(user)
        await resetTokenModel.save(email, resetToken, new Date(Date.now() + 3600000))

        const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `Click on the link to reset your password: ${resetLink}`
        };
        await nodeMailerUtils.transporter.sendMail(mailOptions);
        res.send('Password reset link sent, check your email!');
    } catch (error) {
        next(error)
    }
}
export const resetPassword = async (req, res, next) => {
    const { password } = req.body;
    const { token } = req.params;
    try {
        const decoded = jwtUtils.verifyToken(token)
        const email = decoded.email
        const resetToken = await resetTokenModel.find(email, token)
        if (!resetToken) return res.status(400).json({ message: 'Invalid token' });

        if (new Date(resetToken.reset_token_expiry) < new Date()) {
            return res.status(400).send('Token has expired');
        }

        const hashedPassword = await passwordUtils.hashPassword(password)
        await authModel.resetPassword(email, hashedPassword)

        await resetTokenModel.del(token)
        res.json({ message: "Password reset successfully" });     

    } catch (error) {
        next(error)
    }
}