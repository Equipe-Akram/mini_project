import * as jwtUtils from '../utils/jwtUtils.js';

const authMiddleware = async (req, res, next) => {
    const token = req.header('authorization').split(' ')[1]
    if (!token ){
        return res.status(401).send({message: 'no token provided'})
    }  
    const decoded = jwtUtils.verifyToken(token)
    if (!decoded) {
        return res.status(403).send({message: 'invalid token'})
    }
    req.userId = decoded.id
    next()
}

export default authMiddleware;