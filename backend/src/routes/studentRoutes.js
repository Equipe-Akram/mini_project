import express from 'express'
const router = express.Router()

import * as studentController from '../controllers/studentController.js'
import * as inputValidator from '../middlewares/inputValidator.js'

router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getStudentById)
router.post('/', inputValidator.studentValidation, studentController.addStudent)
router.put('/:id', inputValidator.studentValidation, studentController.updateStudent)
router.delete('/:id', studentController.deleteStudent)


export default router;



