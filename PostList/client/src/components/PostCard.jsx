import { usePosts } from '../context/PostContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BsPencil, BsTrash, BsChat, BsReply } from 'react-icons/bs';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';

const PostCard = ({ post }) => {
	const { getPost, deletePost, toogleLike, backgrounds } = usePosts();

	const [postContent, setPostContent] = useState({});

	const handleTitle = () => {
		if (!postContent.title) return;

		if (postContent.titleBg)
			return (
				<div className="post-title-bg">
					<img src={backgrounds[postContent.titleBg - 1].url} alt="" />
					<span
						className={
							backgrounds[postContent?.titleBg - 1]?.dark ? 'text-zinc-200' : 'text-zinc-700'
						}
					>
						{postContent.title}
					</span>
				</div>
			);

		return <p className="post-title">{postContent.title}</p>;
	};
	const handleImage = () => {
		if (!postContent?.image?.public_id) return;

		return (
			<figure className={`post-image`}>
				<img src={postContent.image.url} alt="" />
			</figure>
		);
	};
	const handleDeletePost = () => {
		toast((t) => (
			<div className="toast">
				<p className="toast-message">Do you want to delete?</p>
				<div className="toast-buttons">
					<button className="button-secondary" onClick={() => toast.dismiss(t.id)}>
						Cancel
					</button>
					<button
						className="button-primary"
						onClick={() => {
							toast.dismiss(t.id);
							toast.promise(
								deletePost(postContent._id),
								{
									loading: 'Deleting...',
									success: <b>Deleted!</b>,
									error: <b>Delete failed.</b>,
								},
								{
									position: 'top-center',
								}
							);
						}}
					>
						Accept
					</button>
				</div>
			</div>
		));
	};
	const handleToogleLike = async () => {
		await toogleLike(postContent);
		setPostContent({ ...postContent, like: !postContent.like });
	};

	useEffect(() => {
		if (postContent?._id) return;
		(async () => setPostContent(await getPost(post)))();
	});

	return (
		<div className="post">
			<div className="post-header">
				<img src="/profile/profile1.jpg" alt="" />
				<p>
					<span>José Rodríguez Romero</span>
					<span>{new Date(postContent.date).toDateString().replace(' ', ', ')}</span>
				</p>
				<div className="post-buttons">
					<Link to={`/edit/${postContent._id}`}>
						<BsPencil />
					</Link>
					<button onClick={handleDeletePost}>
						<BsTrash />
					</button>
				</div>
			</div>
			{handleTitle()}
			{handleImage()}
			<hr className="post-division" />
			<div className="post-interaction">
				<button onClick={handleToogleLike}>
					{postContent.like ? <AiTwotoneLike className="liked" /> : <AiOutlineLike />}
					<span>Like</span>
				</button>
				<button>
					<BsChat />
					<span>Comment</span>
				</button>
				<button>
					<BsReply />
					<span>Share</span>
				</button>
			</div>
		</div>
	);
};
export default PostCard;
