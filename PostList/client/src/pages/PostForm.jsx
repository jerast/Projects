import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { titleBgData } from '../api/titleBg.data';
import { usePostsContext } from '../context/PostContext';
import * as Yup from 'yup';
import { BsXLg } from 'react-icons/bs';

export const PostForm = () => {
	const { createPost } = usePostsContext();

	const navigate = useNavigate();

	const handleRandomBg = (max) => Math.floor(Math.random() * max);

	const handleSubmitButton = (values) => !(values.title === '');

	return (
		<Formik
			initialValues={{
				title: '',
			}}
			validationSchema={Yup.object({
				title: Yup.string().required('Title is Required'),
			})}
			onSubmit={(values, actions) => {
				values.title.length <= 130
					? createPost({ ...values, titleBg: handleRandomBg(titleBgData.length) })
					: createPost(values);
				navigate('/');
			}}
		>
			{({ handleSubmit, values }) => (
				<Form className="post-form" onSubmit={handleSubmit}>
					<div className="post-form-header">
						<h1>Create post </h1>
						<Link to="/">
							<BsXLg />
						</Link>
					</div>
					<div className="post-form-profiler">
						<img src="/profile/profile1.jpg" alt="" />
						<p>
							<span>José Rodríguez Romero</span>
							<span>Friends</span>
						</p>
					</div>
					<Field
						as="textarea"
						className="post-form-title"
						name="title"
						placeholder="What's on your mind, José?"
						value={values.title}
					/>
					<button className="post-form-submit-button" type="submit">
						Post
					</button>
				</Form>
			)}
		</Formik>
	);
};

// Why is our post deleted? Nothing about us is correctable. 
// I wanna know why is our post deleted if we don't post bad things. 
// We post the truth! 
// I wanna be free in my opinion and post anything i want