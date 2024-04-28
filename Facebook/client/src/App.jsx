import { ThemeProvider } from './context/ThemeContext';
import { PostProvider } from './context/PostContext';
import { PostList, PostForm, NotFound } from './pages/App';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
// import Modal from './components/Modal';

const App = () => {
	return (
		<main className="main">
			{/* <Modal/> */}
			<ThemeProvider>
				<Header />
				<Sidebar />
			</ThemeProvider>
			<section className="page-container">
				<PostProvider>
					<Routes>
						<Route path="/" element={<PostList />} />
						<Route path="/new" element={<PostForm />} />
						<Route path="/edit/:id" element={<PostForm />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</PostProvider>
			</section>
			<Toaster position="bottom-left" reverseOrder={true} />
		</main>
	);
};

export default App;
