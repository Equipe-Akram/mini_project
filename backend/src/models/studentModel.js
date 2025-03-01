import pool from '../config/db.js'

export const getAllStudents = async (userId) => {
    const result = await pool.query('SELECT * FROM student s JOIN professor_student ps ON s.id = ps.student_id WHERE ps.professor_id = $1', [userId])
    return result.rows
}
export const getStudentById = async (userId, id) => {
    const result = await pool.query('SELECT * FROM student s JOIN professor_student ps ON s.id = ps.student_id WHERE ps.professor_id = $1 and s.id = $2', [userId, id])
    return result.rows[0]
    }
export const addStudent = async (nom, prenom, note) => {
    return result.rows[0]
}
export const updateStudent = async (nom, prenom, note, id, userId) => {
    const result = await pool.query('UPDATE student s SET nom = $1, prenom = $2, note = $3 FROM professor_student ps WHERE s.id = ps.student_id  AND s.id = $4 AND ps.professor_id = $5 RETURNING s.*;', [nom, prenom, note, id, userId])

    return result.rows[0]
}
export const deleteStudent = async (userId, id) => {
    const result = await pool.query('DELETE FROM student s USING professor_student ps WHERE s.id = ps.student_id AND s.id = $1 AND ps.professor_id = $2 RETURNING s.*', [id, userId])
    return result.rows[0]
}
