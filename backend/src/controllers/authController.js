import * as authModel from '../models/authModel.js';
import * as jwtUtils from '../utils/jwtUtils.js';
import * as passwordUtils from '../utils/passwordUtils.js';

export const register = async (req, res, next) => {
    const { nom, prenom, email, password } = req.body;
        // encrypt password
    const hashedPassword = passwordUtils.hashPassword(password)
    try {
        const user = await authModel.register(nom, prenom, email, hashedPassword)
        // token
        const token = jwtUtils.generateToken(user)
        const refreshToken = jwtUtils.generateRefreshToken(user)
        res.json({ token })
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authModel.login(email);
        if (!user) {
            return res.status(400).send({message : 'Email not found'})
        }
        const passwordIsValid = passwordUtils.comparePassword(password, user.password)
        if (!passwordIsValid) {
            return res.status(402).send({message : 'Invalid password'})
        }
        const token = jwtUtils.generateToken(user)
        const refreshToken = jwtUtils.generateRefreshToken(user)
        res.json({ token })

    } catch (error) {
        next(error)
    }
}

export const refreshToken = async (req, res) => {}