import { Link } from 'react-router-dom';
import { BsFillHouseDoorFill, BsPlusLg } from 'react-icons/bs';

const Navbar = () => {
	return (
		<nav className="sidebar">
			<ul className="sidebar-list">
				<li>
					<span>Posts</span>
					<ul>
						<li>
							<Link to="/" className="sidebar-link">
								<BsFillHouseDoorFill />
								<span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to="/new" className="sidebar-link">
								<BsPlusLg />
								<span>New Post</span>
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
