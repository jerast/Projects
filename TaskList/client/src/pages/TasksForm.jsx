import { Form, Formik } from 'formik';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../Context/TaskProvider';

const TasksForm = () => {
	const { createTask, getTask, updateTask } = useTasks();
	const params = useParams();
	const navigate = useNavigate();

	const [task, setTask] = useState({
		title: '',
		description: '',
	});

	useEffect(() => {
		(async () => {
			if (params.id) {
				const { title, description } = await getTask(params.id);

				setTask({ title, description });
			}
		})();
	}, []);

	return (
		<section className='main-section grid grid-flow-row justify-items-center gap-8 px-12 py-8'>
			<h1 className="font-bold text-zinc-700 dark:text-zinc-300 text-4xl my-4">{params.id ? 'Edit task' : 'New Task'}</h1>

			<Formik
				initialValues={task}
				enableReinitialize
				onSubmit={async (values) => {
					(params.id )
						? await updateTask(params.id, values) 
						: await createTask(values);
					setTask({
						title: values.title,
						description: values.description,
					});
					navigate('/');
				}}
			>
				{({ handleChange, handleSubmit, values, isSubmitting }) => (
					<Form onSubmit={handleSubmit} className="form"> 
						<label>
							<span>Title</span>
							<input
								type="text"
								name="title"
								placeholder="Write a title"
								required
								onChange={handleChange}
								value={values.title}
							/>
						</label>
						<label>
							<span>Description</span>
							<textarea
								name="description"
								rows="3"
								placeholder="Write a desription"
								required
								onChange={handleChange}
								value={values.description}
							/>
						</label>
						<button type="submit" disabled={isSubmitting} className="form-button">
							{isSubmitting ? 'Saving...' : 'Save'}
						</button>
					</Form>
				)}
			</Formik>
		</section>
	);
};
export default TasksForm;
