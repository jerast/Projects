import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// base: '/PostList/',
	// server: {
	// 	proxy: {
	// 		'/': {
	// 			target: 'http://localhost:4000/api',
	// 			changeOrigin: false,
	// 			secure: false,
	// 		},
	// 	},
	// },
});
