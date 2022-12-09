import PostCard from '../components/PostCard';
import { usePosts } from '../context/PostContext';

export const PostList = () => {
	const { base } = usePosts();

	return base?.Base?.length === undefined ? (
		<h1>No posts in DB</h1>
	) : (
		[...base.Base].reverse().map((post) => <PostCard post={post} key={post} />)
	);
};
