import { Link } from 'react-router-dom';
import { BsPencil, BsTrash, BsChat, BsReply } from 'react-icons/bs';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';
import { titleBgData } from '../api/titleBg.data';

const Post = ({ post }) => {
	const handleTitle = () => {
		if (!post.title) return;

		if (post.titleBg)
			return (
				<div className="post-title-bg">
					<img src={titleBgData[post.titleBg].url} alt="" />
					<span
						className={
							titleBgData[post.titleBg].dark
								? 'text-zinc-200 shadow-md'
								: 'text-zinc-700'
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

	return (
		<div className="post">
			<div className="post-header">
				<img src="/profile/profile1.jpg" alt="" />
				<p>
					<span>José Rodríguez Romero</span>
					<span>{new Date(post.date).toDateString().replace(' ', ', ')}</span>
				</p>
				<div className="post-buttons">
					<Link to="/new">
						<BsPencil />
					</Link>
					<Link>
						<BsTrash />
					</Link>
				</div>
			</div>
			{handleTitle()}
			{handleImage()}
			<hr className="post-division" />
			<div className="post-interaction">
				<button>
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
export default Post;
