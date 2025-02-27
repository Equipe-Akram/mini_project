import {getAllStudentsService, getStudentByIdService, addStudentService, updateStudentService, deleteStudentService} from '../models/studentModel.js'
// Standarized response function
const handleResponse = (res, status, message, data = null) => {
    status,
    message,
    data
}

export const getAllStudents = async (req, res, next) => {
    try {
        const result = await getAllStudentsService()
        handleResponse(res, 200, 'Students retrieved successfully', result)
    } catch (err) {
        next(err)
    }
}
export const getStudentById = async (req, res, next) => {
    const {id} = req.params
    try {
        const result = await getStudentByIdService(id)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student retrieved successfully', result)
    } catch (err) {
        next(err)
    }
}
export const addStudent = async (req, res, next) => {
    const { nom, prenom, note } = req.body
    try {
        const result = await addStudentService(nom, prenom, note)
        handleResponse(res, 201, 'Student added successfully', result)
    } catch (err) {
        next(err)
    }
}
export const updateStudent = async (req, res, next) => {
    const { id } = req.params
    const { nom, prenom, note } = req.body
    try {
        const result = await updateStudentService(id, nom, prenom, note)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student updated successfully', result)
    } catch (err) {
        next(err)
    }
}
export const deleteStudent = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await deleteStudentService(id)
        if (!result) return handleResponse(res, 404, 'Student not found')
        handleResponse(res, 200, 'Student deleted successfully', result)
    } catch (err) {
        next(err)
    }
}