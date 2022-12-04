import { Link } from 'react-router-dom';
import { AiFillHome, AiFillPlusCircle } from 'react-icons/ai';
import { BsMoonStarsFill } from 'react-icons/bs';


const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-icon">
				<img src="/vite.svg" alt="" />
				<span className='hidden sm:block'>Tasks List APP</span>
			</Link>
			<ul className="flex gap-2 sm:gap-4">
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
				<li>
					<span className='navbar-link' onClick={() => {document.body.classList.toggle('dark')}}>
						<BsMoonStarsFill />
					</span>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
