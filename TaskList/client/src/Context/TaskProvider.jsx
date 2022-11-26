import { useState, useContext } from 'react';
import {
	getTasksRequest,
	getTaskRequest,
	createTaskRequest,
	updateTaskRequest,
	toogleTaskDoneRequest,
	deleteTaskRequest,
} from '../api/tasks.api';
import { TaskContext } from './TaskContext';

export const useTasks = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error('useTasks must be used within a TaskContextProvider');
	}
	return context;
};

export const TaskContextProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);

	const getTasks = async () => {
		try {
			const response = await getTasksRequest();
			// console.log(response.data);

			setTasks(response.data);
		} catch (error) {
			console.error();
		}
	};

	const getTask = async (id) => {
		try {
			const response = await getTaskRequest(id);
			return response.data;
			// console.log(response.data);
		} catch (error) {
			console.error();
		}
	};

	const createTask = async (values) => {
		try {
			const response = await createTaskRequest(values);
			// console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const updateTask = async (id, values) => {
		try {
			const response = await updateTaskRequest(id, values);
			// console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	const toggleTaskDone = async (id) => {
		try {
			const taskFound = tasks.find((task) => task.id === id);
			const response = await toogleTaskDoneRequest(id, { done: !taskFound.done });
			// console.log(response);

			tasks.map((task) => (task.id === id ? (task.done = !task.done) : task.done));
			setTasks([...tasks]);
			// getTasks();
		} catch (error) {
			console.error(error);
		}
	};

	const deleteTask = async (id) => {
		try {
			const response = await deleteTaskRequest(id);
			// console.log(response);

			setTasks(tasks.filter((task) => task.id !== id));
			// getTasks();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<TaskContext.Provider
			value={{ tasks, getTasks, getTask, createTask, updateTask, toggleTaskDone, deleteTask }}
		>
			{children}
		</TaskContext.Provider>
	);
};
