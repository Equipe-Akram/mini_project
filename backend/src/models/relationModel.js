import pool from '../config/db.js';

export const assignStudentToProfessor = async (professorId, studentId) => {
    const result = await pool.query('INSERT INTO professor_student (professor_id, student_id) VALUES ($1, $2) RETURNING *', [professorId, studentId]);
    return result.rows[0];
}
