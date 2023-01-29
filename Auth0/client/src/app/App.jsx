import { LoginButton } from '@/app/components/LoginButton';
import { Profile } from '@/app/components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from './components/LogoutButton';

export const App = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) return <h4>...Loading</h4>;

	return (
		<>
			<h1>App</h1>
			{isAuthenticated ? (
				<>
					<Profile />
					<LogoutButton />
				</>
			) : (
				<LoginButton />
			)}
		</>
	);
};
