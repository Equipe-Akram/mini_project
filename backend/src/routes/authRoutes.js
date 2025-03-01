import express from 'express'
const router = express.Router()
import * as authController from '../controllers/authController.js'
import * as inputValidator from '../middlewares/inputValidator.js'

router.post('/register', inputValidator.registerValidation, authController.register)
router.post('/login', inputValidator.loginValidation, authController.login)
router.post('/refresh', authController.refreshToken);

export default router;