import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AdminRoutes, PublicRoutes, UserRoutes } from '@/routes';

export const AppRoutes = () => {
	const { user } = useSelector( state => state.session );

	const authRouter = () => {
		// switch (user?.role) {
		// 	case undefined:
		// 		return <>
		// 			<Route path="/*" element={ <PublicRoutes /> } />
		// 			<Route path="/account/*" element={ <UserRoutes /> } />
		// 		</>;

		// 	case 'customer':
		// 		return <>
		// 			<Route path="/*" element={ <PublicRoutes /> } />
		// 			<Route path="/account/*" element={ <UserRoutes /> } />
		// 		</>;

		// 	case 'admin':
		// 		return <Route path="/*" element={ <AdminRoutes /> } />;
		
		// 	default:
		// 		return;
	};

	return (
		// <Routes>
		// 	{ authRouter() }
		// </Routes>
		<Routes>
			{
				( !user?.role || user.role === 'customer' ) 
					&& <Route path="/*" element={ <PublicRoutes /> } />
			}
			{
				user.role !== 'admin'
					&& <Route path="/account/*" element={<UserRoutes />} />
			}
			{
				user.role !== 'customer' 
					&& <Route path="/*" element={ <AdminRoutes /> } /> 
			}
		</Routes>
	);
};