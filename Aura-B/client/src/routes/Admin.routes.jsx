import { Navigate, Route, Routes } from 'react-router-dom';

export const AdminRoutes = () => {
	
	if (!localStorage.getItem('sessionToken')) 
		return <Navigate to="/login" />;

	return (
		<Routes>
			<Route path="/" element={ <h1>Admin</h1> } />
			<Route path="*" element={ <h1>Not Found</h1> } />
		</Routes>
	);
};
