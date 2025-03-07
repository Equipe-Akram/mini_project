import pool from '../config/db.js';

export const register = async (nom, prenom, email, password) => {
    try {
        const result = await pool.query('INSERT INTO professor (nom, prenom, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [nom, prenom, email, password]);
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

