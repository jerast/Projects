import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { onToogleSidebar, startLogout } from '@/store';
import { DropdownButton, Search } from '@/interface';
import { MdClose } from 'react-icons/md';
import { RiLoader4Line } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { SVGLogo } from '@/assets';

export const Sidebar = () => {
	const { isLoading, sidebarIsOpen } = useSelector( state => state.app );
	const { status, user } = useSelector( state => state.session );
	const [ isShow, toogleShow ] = useState( false );
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		sidebarIsOpen 
			? toogleShow(true) 
			: setTimeout(() => toogleShow(false), 250);
	}, [sidebarIsOpen]);

	const handleCloseSidebar = () => 
		dispatch(onToogleSidebar());

	const handleLogout = () => {
		dispatch(startLogout());
		navigate('/', { replace: true });
		dispatch(onToogleSidebar());
	};

	const handleLogin = () => {
		dispatch(onToogleSidebar());
		navigate('/login', { replace: true });
	};

   return (
      (isShow) && (
			<div className="Sidebar">
				<div 
					className={`Sidebar__backdrop ${ sidebarIsOpen ? 'animate-in fade-in duration-300' : 'animate-out fade-out duration-300' }`}
					onClick={ handleCloseSidebar }
				/>
				<div className={`Sidebar__content ${ sidebarIsOpen ? 'animate-in slide-in-from-left duration-300' : 'animate-out slide-out-to-left duration-300' }`}>					
					<div className="Sidebar__header">
						<button className="Sidebar__close-button fluid" onClick={ handleCloseSidebar }>
							<MdClose />
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
									<li><span onClick={ handleLogout }>Log Out</span></li>
								</ul>
							</div>
						</DropdownButton>
					</div>
					<Search />
					<ul className="Sidebar__group">
						<li><NavLink onClick={ handleCloseSidebar } to="/">Home</NavLink></li>
						<li><NavLink onClick={ handleCloseSidebar } to="/categories">Categories</NavLink></li>
						<li><NavLink onClick={ handleCloseSidebar } to="/products">Products</NavLink></li>
					</ul>
					{
						(!isLoading && status === 'auth') && (
							<ul className="Sidebar__group">
								<li><NavLink onClick={ handleCloseSidebar } to="/account">My Account</NavLink></li>
								<li><NavLink onClick={ handleCloseSidebar } to="/account/orders">My Orders</NavLink></li>
							</ul>
						)
					}
					{
						(!isLoading) && (
							<ul className="Sidebar__group">
								<li>
									<button onClick={ (status === 'auth') ? handleLogout : handleLogin }>
										{ (status === 'auth') ? 'Log Out' : 'Log In' }
									</button>
								</li>
							</ul>
						)
					}
					<SVGLogo className="Sidebar__logo" />
				</div>
			</div>
		)
   );
};