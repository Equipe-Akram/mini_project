import pool from '../config/db.js';

export const save = async (email, token, token_expiry) => {
    try {
        const result = await pool.query('INSERT INTO verification_token (email, token, expires_at) VALUES ($1, $2, $3) RETURNING *', [email, token, token_expiry]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const find = async (email,token) => {
    try {
        const result = await pool.query('SELECT * FROM verification_token WHERE email = $1 and token = $2', [email, token]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const del = async (token) => {
    try {
        const result = await pool.query('DELETE FROM verification_token WHERE token = $1 RETURNING *', [token]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}