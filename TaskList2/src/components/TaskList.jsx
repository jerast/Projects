import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';

const TaskList = () => {
	const { tasks } = useContext(TaskContext);

	if (tasks.length === 0) 
		return <h1 className='text-white text-4xl font-bold text-center mt-24'>No hay tareas en la lista</h1>;

	return (
		<div className='grid grid-cols-4 gap-2 p-8'>
			{
				tasks.map((task, index) => 
				<TaskCard key={index} task={task}/>)
			}
		</div>
	);
};

export default TaskList;
