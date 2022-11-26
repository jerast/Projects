import { Link } from 'react-router-dom';
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai';


const Navbar = () => {
	return (
		<nav className="bg-zinc-800 flex justify-between py-5 px-12 shadow-md">
			<Link to="/" className="text-xl font-light text-gray-200 flex gap-3">
				<img src="/vite.svg" alt="" />
				<span className='hidden sm:block'>MERN Tasks List</span>
			</Link>
			<ul className="flex gap-4">
				<li>
					<Link to="/" className="navbar-link">
						<AiFillHome className='text-sm'/>
						<span className='hidden sm:block ml-2'>Home</span>
					</Link>
				</li>
				<li>
					<Link to="/new" className="navbar-link">
						<AiFillPlusCircle className='text-sm'/>
						<span className='hidden sm:block ml-2'>New Task</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
