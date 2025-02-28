import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION })
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.email}, process.env.JWT_REFRESH_SECRET,{
        expiresIn: process.env.JWT_REFRESH_EXPIRATION } 
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (error) {
        return null
    }
}