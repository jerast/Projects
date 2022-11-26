import { Route, Routes } from 'react-router-dom';
import { TaskContextProvider } from './Context/TaskProvider';
import Navbar from './Components/Navbar';
import NotFound from './pages/NotFound';
import TasksForm from './pages/TasksForm';
import TasksList from './pages/TasksList';

const App = () => {
	return (
		<main className="bg-zinc-900 h-screen flex flex-col">
			<TaskContextProvider>
				<Navbar />
				<Routes>
					<Route path="*" element={<NotFound />} />
					<Route path="/" element={<TasksList />} />
					<Route path="/new" element={<TasksForm />} />
					<Route path="/edit/:id" element={<TasksForm />} />
				</Routes>
			</TaskContextProvider>
		</main>
	);
};
export default App;
