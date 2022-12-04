import { pool } from '../db.js';

export const ping = async (request, response) => {
    const [result] = await pool.query('SELECT "Pong" AS result');
    response.json(result[0]);
}