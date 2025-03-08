import * as authModel from '../models/authModel.js';
import * as jwtUtils from '../utils/jwtUtils.js';
import * as passwordUtils from '../utils/passwordUtils.js';
import * as Token from '../models/tokenModel.js'
 
export const register = async (req, res, next) => {
    const { nom, prenom, email, password } = req.body;
    const hashedPassword = await passwordUtils.hashPassword(password)
    try {
        const user = await authModel.register(nom, prenom, email, hashedPassword)  
        res.json({ message: "User registered successfully" });
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
       
        const passwordIsValid = await passwordUtils.comparePassword(password, user.password)
        if (!passwordIsValid) {
            return res.status(402).send({message : 'Invalid email or password'})
        }
        const token = jwtUtils.generateToken(user)
        const refreshToken = jwtUtils.generateRefreshToken(user)

        await Token.save(user.id, refreshToken)
        
        res.cookie("refreshToken", refreshToken, {httpOnly: false,maxAge: 24*60*60*1000, secure: false, sameSite:"None"})
        res.json({ token })

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
