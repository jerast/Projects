import { useTasks } from '../Context/TaskProvider';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaTrash, FaPen, FaSyncAlt } from "react-icons/fa";

const TaskCard = ({ task }) => {
	const { deleteTask, toggleTaskDone } = useTasks();
	const navigate = useNavigate();

	const handleDateTime = (value) => value.match(/(\d{2,4})/g);

	return (
		<div className='card group'>
			<h2 className='card-title'>{task.title}</h2>
			<p className='card-description'>{task.description}</p>
			<span className='card-status overflow-hidden'>
				{task.done 
					? <FaCheck className='w-full h-full p-[12px] bg-violet-600 dark:bg-violet-800 dark:shadow-xl'/> 
					: <FaTimes className='w-full h-full p-[10px] bg-zinc-700  dark:bg-zinc-800 dark:shadow-xl'/> }
			</span>
			<span className='text-zinc-400 dark:text-zinc-600 text-xs absolute bottom-2 right-4'>{new Date(task.createAt).toDateString().replace(' ', ', ')}</span>
			<div className='absolute bottom-[-20px] left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 ease-in-out duration-300'>
				<button className='card-button' onClick={() => toggleTaskDone(task.id)}><FaSyncAlt className='card-button-icon '/></button>
				<button className='card-button' onClick={() => navigate(`/edit/${task.id}`)}><FaPen className='card-button-icon'/></button>
				<button className='card-button' onClick={() => deleteTask(task.id)}><FaTrash className='card-button-icon'/></button>
			</div>
		</div>
	);
};
export default TaskCard;
