import { Routes, Route } from 'react-router-dom';
import { PostProvider } from './context/PostContext';
import { PostList, PostForm, NotFound } from './pages/App';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => {
	return (
		<main className="main">
			<header className="header">
				<Navbar />
			</header>
			<Sidebar />

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
		</main>
	);
};

export default App;
