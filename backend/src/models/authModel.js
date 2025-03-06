import pool from '../config/db.js';

export const register = async (nom, prenom, email, password) => {
    try {
        const result = await pool.query('INSERT INTO professor (nom, prenom, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [nom, prenom, email, password]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
export const verifyAccount = async (email) => {
    try {
        const result = await pool.query('UPDATE professor SET is_verified = true WHERE email = $1 RETURNING *', [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const login = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM professor WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}
export const resetPassword = async (email, password) => {
    try {
        const result = await pool.query('UPDATE professor SET password = $1 WHERE email = $2 RETURNING *', [password, email]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

