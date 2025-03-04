import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (user) => {
    const pyload = { id: user.id, email: user.email }
    return jwt.sign(pyload, process.env.JWT_SECRET, { expiresIn: '1min'  })
}

export const generateRefreshToken = (user) => {
    const pyload = { id: user.id, email: user.email }
    return jwt.sign(pyload, process.env.JWT_REFRESH_SECRET,{
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
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    }
    catch (error) {
        return null
    }
}