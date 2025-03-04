import pool from '../config/db.js';

export const save = async (userId, token) => {
    await pool.query('INSERT INTO refresh_token (professor_id, token) VALUES ($1, $2)', [userId, token])
}

export const find = async (token) => {
    const result = await pool.query('SELECT * FROM refresh_token WHERE token = $1', [token])
    return result.rows[0]
}
export const del = async (token) => {
    await pool.query('DELETE FROM refresh_token WHERE token = $1', [token]);
}
export const findByProfId = async (prof_id) => {
    const result = await pool.query('SELECT * from refresh_token WHERE professor_id = $1', [prof_id])
    return result.rows[0]
}