import { Link } from 'react-router-dom';
import { BsXOctagon, BsHouse, BsUpload } from 'react-icons/bs';
const Navbar = () => {
	return (
		<nav className="navbar">
			<Link to="/" className="navbar-icon">
				<img src="/vite.svg" alt="" />
				<span>Post List App</span>
			</Link>
			<ul className="navbar-buttons">
				<li>
					<Link to="/new" className="navbar-link">
						<BsUpload />
					</Link>
				</li>
				<li>
					<Link to="/" className="navbar-link">
						<BsHouse />
					</Link>
				</li>
				<li>
					<Link to="/notFound" className="navbar-link">
						<BsXOctagon />
					</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
