import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { getEnvironment } from '@/global/helpers/getEnvironment';
import { App } from '@/app/App';

const { 
	VITE_AUTH0_DOMAIN, 
	VITE_AUTH0_CLIENTID 
} = getEnvironment();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Auth0Provider
			domain={ VITE_AUTH0_DOMAIN }
			clientId={ VITE_AUTH0_CLIENTID }
			authorizationParams={{
				redirect_uri: window.location.origin
			}}
		>
			<App /> 
		</Auth0Provider>
	</React.StrictMode>
);
