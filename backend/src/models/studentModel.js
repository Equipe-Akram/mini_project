import pool from '../config/db.js'

export const getAllStudents = async () => {
    const result = await pool.query('SELECT * FROM student')
    return result.rows
}
export const getStudentById = async (id) => {
    const result = await pool.query('SELECT * FROM student WHERE id = $1', [id])
    return result.rows[0]
    }
export const addStudent = async (nom, prenom, note) => {
    const result = await pool.query('INSERT INTO student (nom, prenom, note) VALUES ($1, $2, $3) RETURNING *', [nom, prenom, note])
    return result.rows[0]
}
export const updateStudent = async (id, nom, prenom, note) => {
    const result = await pool.query('UPDATE student SET nom = $1, prenom = $2, note = $3 WHERE id = $4 RETURNING *', [nom, prenom, note, id])
    return result.rows[0]
}
export const updateStudentPartial = async (data, id) => {
    const toUpdate = Object.keys(data)
    const toUpdateWith = Object.values(data)
    const result = await pool.query(`UPDATE student SET ${toUpdate.map((toUpdate, i) => `${toUpdate} = $${i + 1}`).join(', ')} WHERE id = $${toUpdate.length + 1} RETURNING *`, [...toUpdateWith, id])
    console.log(toUpdateWith)
    return result.rows[0] 
}
export const deleteStudent = async (id) => {
    const result = await pool.query('DELETE FROM student WHERE id = $1 RETURNING *', [id])
    return result.rows[0]
}
