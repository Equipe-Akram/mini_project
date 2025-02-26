
import * as studentModel from '../models/studentModel.js'

// Standarized response function
const handleResponse = (res, status, message, data = null) => 
    res.status(status).json({ status, message, data })

export const getAllStudents = async (req, res, next) => {
    try {
        const result = await studentModel.getAllStudents()
        handleResponse(res, 200, 'Students retrieved successfully', result)
    } catch (err) {
        next(err)
    }
}
export const getStudentById = async (req, res, next) => {
    const {id} = req.params
    try {
        const result = await  studentModel.getStudentById(id)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student retrieved successfully', result)
    } catch (err) {
        next(err)
    }
}
export const addStudent = async (req, res, next) => {
    const { nom, prenom, note } = req.body
    try {
        const result = await  studentModel.addStudent(nom, prenom, note)
        handleResponse(res, 201, 'Student added successfully', result)
    } catch (err) {
        next(err)
    }
}
export const updateStudent = async (req, res, next) => {
    const { id } = req.params
    const { nom, prenom, note } = req.body
    try {
        const result = await  studentModel.updateStudent(id, nom, prenom, note)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student updated successfully', result)
    } catch (err) {
        next(err)
    }
}
export const deleteStudent = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await  studentModel.deleteStudent(id)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student deleted successfully', result)
    } catch (err) {
        next(err)
    }
}
