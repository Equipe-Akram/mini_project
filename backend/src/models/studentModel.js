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
export const updateStudentService = async (id, nom, prenom, note) => {
    const result = await pool.query('UPDATE student SET nom = $1, prenom = $2, note = $3 WHERE id = $4 RETURNING *', [nom, prenom, note, id])
    return result.rows[0]
}
export const deleteStudentService = async (id) => {
    const result = await pool.query('DELETE FROM student WHERE id = $1 RETURNING *', [id])
    return result.rows[0]
}
