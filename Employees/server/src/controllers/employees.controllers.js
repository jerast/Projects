import { pool } from '../db.js';

export const getEmployees = async (request, response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee');
        response.json(rows);
    } catch (error) {
        return response.status(500).json({
            message: 'Something goes wrong' 
        });
    }
};

export const getEmployee = async (request, response) => {
    const {id} = request.params;

    try {
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', id);
        (rows.length > 0)  
            ? response.json(rows)
            : response.status(404).json({ message: 'Employee not found' });
    } catch (error) {
        return response.status(500).json({
            message: 'Something goes wrong' 
        });
    }
};

export const createEmployee = async (request, response) => {
    const {name, salary} = request.body;

    try {
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary]);
        response.send({ 
            id: rows.insertId,
            name,
            salary,
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Something goes wrong' 
        });
    }
};

export const updateEmployee = async (request, response) => {
    const {id} = request.params;
    const {name, salary} = request.body;

    try {
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id]);
        if (result.affectedRows === 0) {
            return response.status(404).json({ message: 'Employee not found' });
        }

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        response.json(rows);
    } catch (error) {
        return response.status(500).json({
            message: 'Something goes wrong' 
        });
    }
};

export const deleteEmployee = async (request, response) => {
    const {id} = request.params;
    
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id]);
        (result.affectedRows > 0)  
            ? response.sendStatus(204)
            : response.status(404).json({ message: 'Employee not found' });
    } catch (error) {
        return response.status(500).json({
            message: 'Something goes wrong' 
        });
    }
};