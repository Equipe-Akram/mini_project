
import * as studentModel from '../models/studentModel.js'
import {assignStudentToProfessor}  from '../models/relationModel.js'

// Standarized response function
const handleResponse = (res, status, message, data = null) => 
    res.status(status).json({ status, message, data })

export const getAllStudents = async (req, res, next) => {
    const userId = req.userId
    try {
        const result = await studentModel.getAllStudents(userId)
        if (!result) return handleResponse(res, 404, 'No students found')
        handleResponse(res, 200, 'Students retrieved successfully', result)
    } catch (err) {
        next(err)
    }
}
export const getStudentById = async (req, res, next) => {
    const {id} = req.params
    const userId = req.userId
    try {
        const result = await  studentModel.getStudentById(userId, id)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student retrieved successfully', result)
    } catch (err) {
        next(err)
    }
}
export const addStudent = async (req, res, next) => {
    const { nom, prenom, note } = req.body
    const userId = req.userId
    try {     
        const result = await  studentModel.addStudent(nom, prenom, note)
        const relation = assignStudentToProfessor(userId, result.id)
        handleResponse(res, 201, 'Student added successfully', result)
    } catch (err) {
        next(err)
    }
}
export const updateStudent = async (req, res, next) => {
    const { id } = req.params
    const { nom, prenom, note } = req.body
    const userId = req.userId
    try {
        const result = await  studentModel.updateStudent(nom, prenom, note, id, userId)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student updated successfully', result)
    } catch (err) {
        next(err)
    }
}
export const deleteStudent = async (req, res, next) => {
    const { id } = req.params
    const userId = req.userId
    try {
        const result = await  studentModel.deleteStudent(id, userId)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student deleted successfully', result)
    } catch (err) {
        next(err)
    }
}
