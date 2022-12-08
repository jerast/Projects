import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

	// Application theme State and Effect func
	const [appTheme, setAppTheme] = useState(
		window.matchMedia('(prefers-color-scheme: dark)').matches
	);
	useEffect(() => {
		toogleTheme();
	}, []);

	// Aplication theme toogle func
	const toogleTheme = () => {
		appTheme
            ? document.body.classList.add('dark') 
            : document.body.classList.remove('dark');
		setAppTheme(!appTheme);
	}

	return (
		<ThemeContext.Provider
			value={{
				appTheme,
				setAppTheme,
				toogleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
