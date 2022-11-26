import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskForm = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const { createTask } = useContext(TaskContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		createTask(title, description);

		setTitle('');
		setDescription('');
	};

	return (
		<form onSubmit={handleSubmit} className="bg-neutral-700 p-10 mb-4 max-w-md mx-auto rounded-2xl">
			<h1 className='text-2xl font-bold text-white mb-3'>Crea tu tarea</h1>
			<input
				type="text"
				placeholder="Escribe tu tarea"
				required
				onChange={(event) => setTitle(event.target.value)}
				value={title}
				autoFocus
				className='bg-slate-300 p-3 w-full mb-2 rounded-md'
			/>
			<textarea
				cols="30"
				rows="2"
				placeholder="Escribe la descripción de la tarea"
				required
				onChange={(event) => setDescription(event.target.value)}
				value={description}
				className='bg-slate-300 p-3 w-full mb-2 rounded-md'
			/>
			<button className='bg-indigo-500 px-3 py-1 text-white rounded-lg'>Guardar</button>
		</form>
	);
};

export default TaskForm;
