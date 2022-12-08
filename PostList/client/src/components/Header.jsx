import { Link } from 'react-router-dom';
import { BsMoonStarsFill, BsPlusLg } from 'react-icons/bs';
import { useTheme } from '../context/ThemeContext';


const Header = () => {
	const { toogleTheme } = useTheme();

	const handleToogleDark = () => toogleTheme();

	return (
		<header className="header">
			<nav className="navbar">
				<Link to="/" className="navbar-icon">
					<img src="/vite.svg" alt="" />
					<span>Post List App</span>
				</Link>
				<ul className="navbar-buttons">
					<li>
						<Link to="/new" className="navbar-link">
							<BsPlusLg />
						</Link>
					</li>
					<li>
						<button className="navbar-link" onClick={handleToogleDark}>
							<BsMoonStarsFill />
						</button>
					</li>
					<li>
						<img className='navbar-profile' src="/profile/profile1.jpg" alt="" />
					</li>
				</ul>
			</nav>
		</header>
	);
};
export default Header;
