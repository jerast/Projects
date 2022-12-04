import { useState, useEffect, createContext } from 'react';
import { taskData as data } from '../data/tasks';

export const TaskContext = createContext();

export const TaskContextProvider = (props) => {
	const [tasks, setTasks] = useState([]);

	useEffect(() => setTasks(data), []);

	const createTask = (title, description) => {
		const newTask = {
			id: tasks.length,
			title,
			description: description,
		};
		setTasks([...tasks, newTask]);
	};

	const deleteTask = (id) => {
		const newTaskList = tasks.filter((task) => task.id !== id);

		setTasks(newTaskList);
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				createTask,
				deleteTask,
			}}
		>
			{props.children}
		</TaskContext.Provider>
	);
};
