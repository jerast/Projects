import { usePostsContext } from '../context/PostContext';
import Post from '../components/Post';

export const PostList = () => {
	const { posts } = usePostsContext();

	if (posts.length === 0)
		return <h1 className='page-title'>There are no posts</h1>

	return [...posts].reverse().map((post) => <Post post={post} key={post._id} />);
};
 