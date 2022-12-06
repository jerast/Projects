import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { BsXLg } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

export const PostForm = () => {
	const { getPosts, getPost, createPost, updatePost, backgrounds } = usePosts();
	const navigate = useNavigate();
	const params = useParams();

	const [formInitialValues, setFormInitialValues] = useState({ 
		title: '', 
		titleBg: '',
	})
	const formValidationSquema = Yup.object({
		title: Yup.string().min(1),
		titleBg: Yup.number(),
	});
	const formOnSubmit = async ({ title, titleBg }, actions) => {
		if (!title) return toast.error(`Don't alter DOM props!!!`);

		const fields = (() => (titleBg && title.length <= 130) 
			? { title, titleBg } 
			: { title })();

		(params.id) 
			? await updatePost(params.id, fields)
			: await createPost(fields);

		await getPosts();
		navigate('/');
	};

	useEffect(() => {
		(async () => {
			if (params.id) {
				const post = await getPost(params.id);
				setFormInitialValues(post);
			}
		})();
	}, []);

	return (
		<Formik
			initialValues={formInitialValues}
			validationSchema={formValidationSquema}
			onSubmit={formOnSubmit}
			enableReinitialize
		>
			{({ handleChange, handleSubmit, isSubmitting, values }) => (
				<Form className="post-form" onSubmit={handleSubmit}>
					<div className="post-form-header">
						<h1>{!params.id ? 'Create post' : 'Edit post'}</h1>
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
					<textarea
						className={values.title.length <= 130 ? 'post-form-title' : 'post-form-title text-sm'}
						name="title"
						placeholder="What's on your mind, José?"
						value={values.title}
						onChange={handleChange}
						autoFocus
					/>
					<div className={values.title.length <= 130 ? 'post-form-backgrounds' : 'hidden'}>
						<label>
							<input
								type="radio"
								name="titleBg"
								value={undefined}
								checked={values.titleBg == ''? 'checked' : ''}
								onChange={handleChange}
							/>
							<span><BsXLg /></span>
						</label>
						{backgrounds
							.filter((item) => item.mini)
							.map((item) => (
								<label key={item.id + 1}>
									<input
										type="radio"
										name="titleBg"
										value={item.id + 1}
										checked={values.titleBg == item.id + 1 ? 'checked' : ''}
										onChange={handleChange}
									/>
									<img src={item.mini} alt="" />
								</label>
							))}
					</div>
					<button
						className="post-form-submit-button"
						type="submit"
						disabled={isSubmitting || !values.title}
					>
						Post
					</button>
				</Form>
			)}
		</Formik>
	);
};
