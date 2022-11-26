import { useTasks } from '../Context/TaskProvider';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaTimes, FaTrash, FaPen, FaSyncAlt } from "react-icons/fa";

const TaskCard = ({ task }) => {
	const { deleteTask, toggleTaskDone } = useTasks();
	const navigate = useNavigate();

	const handleDateTime = (value) => value.match(/(\d{2,4})/g);

	return (
		<div className='card relative flex flex-col group'>
			<h2 className='font-bold text-zinc-300 text-lg my-2'>{task.title}</h2>
			<p className='text-zinc-500 text-sm mb-3'>{task.description}</p>
			<span className='card-status overflow-hidden'>
				{task.done 
					? <FaCheck className='w-full h-full p-[12px] bg-violet-800 shadow-xl'/> 
					: <FaTimes className='w-full h-full p-[10px] bg-zinc-800 shadow-xl'/> }
			</span>
			<span className='text-zinc-600 text-xs absolute bottom-2 right-4'>{new Date(task.createAt).toDateString().replace(' ', ', ')}</span>
			<div className='absolute bottom-[-20px] left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 ease-in-out duration-300'>
				<button className='card-button' onClick={() => toggleTaskDone(task.id)}><FaSyncAlt className='card-button-icon '/></button>
				<button className='card-button' onClick={() => navigate(`/edit/${task.id}`)}><FaPen className='card-button-icon'/></button>
				<button className='card-button' onClick={() => deleteTask(task.id)}><FaTrash className='card-button-icon'/></button>
			</div>
		</div>
	);
};
export default TaskCard;
