import { usePosts } from '../context/PostContext';
import PostCard from '../components/PostCard';

export const PostList = () => {
	const { posts } = usePosts();

	if (posts.length === 0)
		return <h1 className='page-title'>There are no posts</h1>

	return [...posts].reverse().map((post) => <PostCard post={post} key={post._id} />);
};
 