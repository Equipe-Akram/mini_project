import express from 'express'
const router = express.Router()
import {getAllStudents, getStudentById, addStudent,updateStudent , deleteStudent} from '../controllers/studentController.js'

router.get('/', getAllStudents)
router.get('/:id', getStudentById)
router.post('/', addStudent)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)


export default router;



