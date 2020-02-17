import React, { Fragment, useState } from 'react';
import Post from '../Post';
import { PostType } from '../Types';
import { useRequest } from '../../../Hooks';
import { MoreButton } from './Styles';
import PlusIcon from '../../../Assets/Plus.png';
type ForumFeedProps = {
	sortBy: string;
	page: number;
	reverse: string;
	posts: PostType[];
};

const ForumFeed: React.FC<ForumFeedProps> = ({
	sortBy,
	page,
	reverse,
	posts,
}) => {
	const [nextPosts, ,] = useRequest<PostType[]>(
		`blogs?page=${page}&order=${sortBy}&reverse=${reverse}`,
		'get',
		{},
		posts.length >= 10,
	);
	const [showNext, setShowNext] = useState(false);
	const renderList = () => {
		if (posts)
			return posts.map((post) => {
				return <Post content={post} key={post.b_id} />;
			});
	};
	return (
		<Fragment>
			{renderList()}
			{showNext && nextPosts && (
				<ForumFeed
					sortBy={sortBy}
					page={page + 1}
					reverse={reverse}
					posts={nextPosts}
				/>
			)}
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
