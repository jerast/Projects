import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../Context/TaskProvider';
import TaskCard from '../Components/TaskCard';
import { FaPlus } from 'react-icons/fa';

const TasksList = () => {
	const { tasks, getTasks } = useTasks();

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<section className="main-section grid grid-flow-row justify-items-center gap-8 px-12 py-8">
			<h1 className="font-bold text-zinc-300 text-4xl my-4">Task List</h1>
			{tasks.length === 0 ? (
				<div className='flex flex-col items-center m-5'>
					<h1 className='text-violet-600 text-4xl font-light m-2'>No tasks to list</h1>
					{/* <BiListPlus /> */}
					<span className='rotate-90 text-8xl leading-snug ml-4 text-violet-900'>{":("}</span>
					<span className='font-light text-lg text-zinc-600 m-2'>Please add new task</span>
				</div>
			) : (
				tasks.map((task) => <TaskCard key={task.id} task={task} />)
			)}
			<Link to="/new" className='shadow-xl'><FaPlus className='fixed-button shadow-xl'/></Link>
		</section>
	);
};
export default TasksList;
