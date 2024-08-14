import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { BsXLg, BsFilePlusFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { resize } from '../helpers/resizers';

export const PostForm = () => {
	const { getPost, createPost, updatePost, backgrounds } = usePosts();
	const navigate = useNavigate();
	const params = useParams();

	const [formInitialValues, setFormInitialValues] = useState({
		title: '',
		titleBg: 0,
		image: undefined,
	});
	const formValidationSquema = Yup.object({
		title: Yup.string(),
		titleBg: Yup.number(),
	});
	const formOnSubmit = async ({ title, titleBg, image }) => {
		if (!title && !image) return toast.error(`Don't alter DOM Attributes!!!`);
		const fields =
			title.length > 130 || image ? { title, image, titleBg: 0 } : { title, titleBg };
		params.id ? await updatePost(params.id, fields) : await createPost(fields);
		navigate('/');
	};

	const [imageUrl, setImageUrl] = useState('');
	const handleLoadImage = (event, setFieldValue) => {
		event.preventDefault();

		if (!event?.target?.files?.length) return;

		setImageUrl(URL.createObjectURL(event?.target?.files[0]));
		setFieldValue('image', event.target.files[0]);
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
		<div className="post-form">
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
			<Formik
				initialValues={formInitialValues}
				validationSchema={formValidationSquema}
				onSubmit={formOnSubmit}
				enableReinitialize
			>
				{({ handleChange, handleSubmit, isSubmitting, values, setFieldValue }) => (
					<Form onSubmit={handleSubmit} className="post-form-fields">
						<div>
							<textarea
								className={
									values.title.length <= 130
										? 'post-form-title'
										: 'post-form-title text-sm'
								}
								name="title"
								placeholder="What's on your mind, José?"
								value={values.title}
								onChange={handleChange}
								autoFocus
							/>
							<div
								className={
									values.title.length <= 130 && values.image === undefined
										? 'post-form-backgrounds'
										: 'post-form-backgrounds hidden'
								}
							>
								<label>
									<input
										type="radio"
										name="titleBg"
										value={0}
										checked={values.titleBg == 0 ? 'checked' : ''}
										onChange={handleChange}
									/>
									<span>
										<BsXLg />
									</span>
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
											<img src={resize(item.mini)} alt="" />
										</label>
									))}
							</div>
							<label
								className="post-form-image"
								onClick={
									values?.image?.public_id
										? () => toast.error("Can't change an image from a uploaded post")
										: undefined
								}
							>
								<input
									type="file"
									name="image"
									onChange={(event) => handleLoadImage(event, setFieldValue)}
									disabled={values?.image?.public_id}
								/>
								<div>
									<BsFilePlusFill className={values.image ? 'hidden' : 'block'} />
									<span className={values.image ? 'hidden' : 'block'}>Hello</span>
									<img
										className={values.image ? 'block' : 'hidden'}
										src={values.image && !imageUrl ? values.image.url : imageUrl}
										alt=""
									/>
									<button
										className={values?.image?.name && !isSubmitting? 'flex' : 'hidden'}
										type="button"
										onClick={() => {
											setImageUrl(''), (values.image = undefined);
										}}
									>
										<BsXLg />
									</button>
								</div>
							</label>
						</div>
						<button
							className="post-form-submit-button"
							type="submit"
							disabled={isSubmitting || (!values.title && !values.image)}
						>
							{isSubmitting ? '...Posting' : 'Post'}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};
