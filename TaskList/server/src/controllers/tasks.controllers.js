import { pool } from '../db.js';

export const getTasks = async (request, response) => {
	try {
		const [rows] = await pool.query('SELECt * FROM tasks ORDER BY createAt');
		response.json(rows);
		// rows.length > 0
		// 	? response.json(rows)
		// 	: response.status(200).json({ message: 'No tasks in database' });
	} catch (error) {
		return response.status(500).json({
			message: 'Something goes wrong',
			error: error.message,
		});
	}
};

export const getTask = async (request, response) => {
	try {
		const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [
			request.params.id
		]);
		rows.length > 0
			? response.json(rows[0])
			: response.status(404).json({ message: 'Task not found' });
	} catch (error) {
		return response.status(500).json({
			message: 'Something goes wrong',
			error: error.message,
		});
	}
};

export const createTask = async (request, response) => {
	const { title, description } = request.body;

	try {
		const [result] = await pool.query('INSERT INTO tasks(title, description) VALUES (?, ?)', [
			title,
			description,
		]);
		response.json({
			id: result.insertId,
			title,
			description,
		});
	} catch (error) {
		return response.status(500).json({
			message: 'Something goes wrong',
			error: error.message,
		});
	}
};

export const updateTasks = async (request, response) => {
	try {
		const [result] = await pool.query('UPDATE tasks SET ? WHERE id = ?', [
			request.body,
			request.params.id,
		]);
		result.affectedRows > 0
			? response.json(result)
			: response.status(404).json({ message: 'Task not found' });
	} catch (error) {
		return response.status(500).json({
			message: 'Something goes wrong',
			error: error.message,
		});
	}
};

export const deleteTasks = async (request, response) => {
	try {
		const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [
			request.params.id
		]);
		result.affectedRows > 0
			? response.sendStatus(204)
			: response.status(404).json({ message: 'Task not found' });
	} catch (error) {
		return response.status(500).json({
			message: 'Something goes wrong',
			error: error.message,
		});
	}
};
