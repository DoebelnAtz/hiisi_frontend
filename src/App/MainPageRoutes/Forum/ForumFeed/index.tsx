import React, {
	Dispatch,
	Fragment,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import Post from './Post/index';
import { PostType } from '../Types';
import { useRequest } from '../../../../Hooks';
import { MoreButton } from './Styles';
import PlusIcon from '../../../../Assets/Plus.png';
import { makeRequest } from '../../../../Api';
import { Feed } from '../../../../Styles/CardStyles';
type ForumFeedProps = {
	sortBy: string;
	page: number;
	reverse: string;
	posts: PostType[];
	setPosts: Dispatch<SetStateAction<PostType[] | undefined>>;
};

const ForumFeed: React.FC<ForumFeedProps> = ({
	sortBy,
	page,
	reverse,
	posts,
	setPosts,
}) => {
	const [nextPosts, setNextPosts] = useRequest<PostType[]>(
		`blogs?page=${page}&order=${sortBy}&reverse=${reverse}`,
		'get',
		{},
		posts.length >= 10,
	);
	const isVisible = useRef<HTMLElement>(null);
	const [showNext, setShowNext] = useState(false);
	const deletePost = async (blogId: number) => {
		let resp = await makeRequest('blogs/delete_blog', 'delete', {
			blogId: blogId,
		});
		if (resp.data) {
			setPosts(posts.filter((post) => post.b_id !== blogId));
		}
	};

	const renderList = () => {
		if (posts) {
			return posts.map((post) => {
				return (
					<Post
						deletePost={() => deletePost(post.b_id)}
						content={post}
						key={post.b_id}
					/>
				);
			});
		}
	};

	return (
		<Fragment>
			<Feed>
				{renderList()}
				{showNext && nextPosts && (
					<ForumFeed
						sortBy={sortBy}
						page={page + 1}
						reverse={reverse}
						posts={nextPosts}
						setPosts={setNextPosts}
					/>
				)}
			</Feed>
			{!showNext && posts.length >= 10 && (
				<MoreButton>
					<img
						src={PlusIcon}
						alt={'load more posts'}
						onClick={() => setShowNext(true)}
					/>
				</MoreButton>
			)}
		</Fragment>
	);
};

export default ForumFeed;
