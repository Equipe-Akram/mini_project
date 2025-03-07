import * as jwtUtils from '../utils/jwtUtils.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('authorization').split(' ')[1];

        if (!token ){
            return res.status(401).send({message: 'no token provided'})
        }
        const decoded = jwtUtils.verifyToken(token)
        if (!decoded) {
            return res.status(403).send({message: 'invalid token'})
        }
        req.userId = decoded.id
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'internal server error'})
    }
}

export default authMiddleware;