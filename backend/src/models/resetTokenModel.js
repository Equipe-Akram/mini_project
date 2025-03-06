import pool from '../config/db.js';

export const save = async (email, reset_token, reset_token_expiry) => {
    try {
        const result = await pool.query('INSERT INTO reset_password_token (email, reset_token, reset_token_expiry) VALUES ($1, $2, $3) RETURNING *', [email, reset_token, reset_token_expiry]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const find = async (email,token) => {
    try {
        const result = await pool.query('SELECT * FROM reset_password_token WHERE email = $1 and reset_token = $2', [email, token]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const del = async (token) => {
    try {
        const result = await pool.query('DELETE FROM reset_password_token WHERE reset_token = $1 RETURNING *', [token]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
}