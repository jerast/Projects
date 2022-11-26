import { pool } from '../db.js';

export const pong = async (request, response) => {
	const [rows] = await pool.query('Select "Pong" as Result');
	console.log(rows);
	response.json(rows[0 ]);
}