import { usePosts } from '../context/PostContext';
import { BsPencil, BsTrash, BsChat, BsReply } from 'react-icons/bs';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const PostCard = ({ post }) => {
	const { deletePost, toogleLike, backgrounds } = usePosts();

	const handleTitle = () => {
		if (!post.title) return;

		if (post.titleBg)
			return (
				<div className="post-title-bg">
					<img src={backgrounds[post.titleBg - 1].url} alt="" />
					<span
						className={
							backgrounds[post.titleBg - 1].dark ? 'text-zinc-200' : 'text-zinc-700'
						}
					>
						{post.title}
					</span>
				</div>
			);

		return <p className="post-title">{post.title}</p>;
	};
	const handleImage = () => {
		if (!post.image) return;

		return (
			<figure className="post-image">
				<img src={post.image.url} alt="" />
			</figure>
		);
	};
	const handleDelete = () => {
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
							deletePost(post._id);
							toast.success('Deleted', { position: 'top-center' });
						}}
					>
						Accept
					</button>
				</div>
			</div>
		));
	};

	return (
		<div className="post">
			<div className="post-header">
				<img src="/profile/profile1.jpg" alt="" />
				<p>
					<span>José Rodríguez Romero</span>
					<span>{new Date(post.date).toDateString().replace(' ', ', ')}</span>
				</p>
				<div className="post-buttons">
					<Link to={`/edit/${post._id}`}>
						<BsPencil />
					</Link>
					<button onClick={handleDelete}>
						<BsTrash />
					</button>
				</div>
			</div>
			{handleTitle()}
			{handleImage()}
			<hr className="post-division" />
			<div className="post-interaction">
				<button onClick={() => toogleLike(post)}>
					{post.like ? <AiTwotoneLike className="liked" /> : <AiOutlineLike />}
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
