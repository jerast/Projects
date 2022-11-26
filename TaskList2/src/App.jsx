import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
	return (
		<main className="bg-zinc-900 h-screen p-8">
			<div className="container mx-auto">
				<TaskForm />
				<TaskList />
			</div>
		</main>
	);
};

export default App;
