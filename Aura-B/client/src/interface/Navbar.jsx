import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onToogleShoppingCart, onToogleSidebar, startLogout } from '@/store';
import { DropdownButton, Search } from '@/interface';
import { SVGLogo } from '@/assets';
import { MdMenu, MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { RiLoader4Line } from 'react-icons/ri';

export const Navbar = () => {
	const { status, user } = useSelector( state => state.session );
	const { isLoading, shoppingCart } = useSelector( state => state.app );
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/login');
	};

	const handleLogout = () => {
		navigate('/', { replace: true });
		dispatch(startLogout());
	};

	return (
		<nav className="Navbar">
			<button 
				className="Navbar__sidebar-button fluid"
				onClick={ () => dispatch(onToogleSidebar()) }
			>
				<MdMenu />
			</button>
			<div className="Navbar__logo">
				<NavLink to="/">
					<SVGLogo />
				</NavLink>
			</div>
			<div className="Navbar__nav">
				<NavLink to="/categories">Categories</NavLink>
				<NavLink to="/products">Products</NavLink>
				<NavLink>Contact</NavLink>
			</div>
			<div className="Navbar__controls">
				<Search />
				<button 
					className="Navbar__controls-cart fluid" 
					onClick={ () => dispatch(onToogleShoppingCart()) } 
					disabled={ isLoading } 
				>
					{ ( isLoading ) 
						? 	<RiLoader4Line className="animate-spin" />
						: 	<>
								<MdOutlineShoppingCart />
								{ 
									!!shoppingCart.length && (
										<span className="Navbar__notify">
											<span className="Navbar__nofity-ping animate-ping"></span>
											<span className="Navbar__notify-icon"></span>
										</span>
									)
								}
							</> 
					}
				</button>
				<DropdownButton 
					className="Navbar__controls-login"
         		disabled={ isLoading || status === 'checking' }
					conditions={ !isLoading && status === 'auth' }
				>
					<span 
						className={`Navbar__controls-login-button fluid ${ (status === 'auth' && !isLoading ) ? 'logged' : '' }`} 
						onClick={ (status !== 'auth') ? handleLogin : null }
					>
						{ 
							( isLoading || status === 'checking' )
							? 	<RiLoader4Line className="animate-spin text-2xl"/>
							: 	( status === 'auth' ) 
								? user.name[0]+user.surname[0]
								: <FaRegUser /> 
						}
					</span>
					<div className="Navbar__controls-login-dropdown">
						<ul>
							{/* <li><Link to='/account'>My Account</Link></li> */}
							<li><Link to='/account/orders'>My Orders</Link></li>
						</ul>
						<ul>
							<li><span onClick={ handleLogout }>Log Out</span></li>
						</ul>
					</div>
				</DropdownButton>
			</div>		
		</nav>
	);
};
