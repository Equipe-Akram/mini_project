import express from 'express'
const router = express.Router()
import * as authController from '../controllers/authController.js'
import * as inputValidator from '../middlewares/inputValidator.js'

router.post('/register', inputValidator.registerValidation, authController.register)
router.get('/verify/:token', authController.verifyAccount);
router.post('/login', inputValidator.loginValidation, authController.login)
router.get('/refresh', authController.refreshToken);
router.post('/logout', authController.logout)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password/:token', inputValidator.resetPasswordValidation, authController.resetPassword)

export default router;