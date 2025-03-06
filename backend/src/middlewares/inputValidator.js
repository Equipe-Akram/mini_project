import Joi from 'joi';

const userSchema = Joi.object({
    nom: Joi.string().min(3).required(),
    prenom: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
})
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})
const studentSchema = Joi.object({
    nom: Joi.string().min(3).required(),
    prenom: Joi.string().min(3).required(),
    note: Joi.number().min(0).max(20).required(),
})
const resetPasswordSchema = Joi.object({
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
})

export const registerValidation = (req, res, next) => {
    const {error} = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }
    next()
}
export const loginValidation = (req, res, next) => {
    const {error} = loginSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }
    next()
}
export const studentValidation = (req,res,next) => {
    const {nom, prenom, note} = req.body
    const {error} = studentSchema.validate({nom, prenom, note})
        if (error){return res.status(400).json({ status: 400, message: error.details[0].message })}
    next()
}

export const resetPasswordValidation = (req, res, next) => {
    const {password, confirmPassword} = req.body
    const {error} = resetPasswordSchema.validate({password, confirmPassword})
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message })
    }
    next()
}