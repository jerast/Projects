import { Link } from 'react-router-dom';
import { BsMoonStars, BsXOctagon, BsHouse, BsUpload } from 'react-icons/bs';

const Navbar = () => {
	return (
		<nav className="sidebar">
			<ul className="sidebar-list">
				<li>
					<span>Posts</span>
					<ul>
						<li>
							<Link to="/" className="sidebar-link">
								<BsHouse />
								<span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link to="/new" className="sidebar-link">
								<BsUpload />
								<span>New Post</span>
							</Link>
						</li>
					</ul>
				</li>
				<li>
					<span>Settings</span>
					<ul>
						<li>
							<Link to="/notFound" className="sidebar-link">
								<BsXOctagon />
								<span>Not Found Page</span>
							</Link>
						</li>
					</ul>
				</li>
			</ul>
			<ul className="sidebar-list">
				<li>
					<button
						className="sidebar-button"
						onClick={() => {
							document.body.classList.toggle('dark');
						}}
					>
						<BsMoonStars />
						<span>Dark mode</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};
export default Navbar;
