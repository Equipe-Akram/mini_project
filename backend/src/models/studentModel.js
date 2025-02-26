import pool from '../config/db.js'

export const getAllStudentsService = async () => {
    const result = await pool.query('SELECT * FROM student')
    return result.rows
}
export const getStudentByIdService = async (id) => {
    const result = await pool.query('SELECT * FROM student WHERE id = $1', [id])
    return result.rows[0]
    }
export const addStudentService = async (nom, prenom, note) => {
    const result = await pool.query('INSERT INTO student (nom, prenom, note) VALUES ($1, $2, $3) RETURNING *', [nom, prenom, note])
    return result.rows[0]
}
