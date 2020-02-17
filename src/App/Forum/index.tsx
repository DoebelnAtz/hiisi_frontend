import React, { useState, useRef } from 'react';
import Post from './Post';
import { useRequest } from '../../Hooks';
import { useTrail, animated } from 'react-spring';
import CreatePostModal from './CreatePostModal';
import Button from '../Components/Buttons/Button';
import { PostType } from './Types';
import { FeedPage, FeedButtonRow, CreatePostButton } from './Styles';
import DropDown from '../Components/DropDown';
import ForumFeed from './ForumFeed';
import PlaceHolderFeed from '../Components/PlaceHolderFeed';

const Feed = ({}) => {
	const [popup, setPopup] = useState(false);

	const isMounted = useRef(true);

	const [sortBy, setSortBy] = useState('popular');
	const [reverse, setReverse] = useState('false');
	const [posts, setPosts, isLoading] = useRequest<PostType[]>(
		`blogs?page=1&order=${sortBy}&reverse=${reverse}`,
		'get',
	);
	const config = { mass: 5, tension: 2000, friction: 200 };

	const trail = useTrail(posts?.length ?? 0, {
		config,
		opacity: !isLoading ? 1 : 0,
		x: !isLoading ? 0 : 20,
		height: !isLoading ? 80 : 0,
		from: { opacity: 0, x: 50, height: 0 },
	});

	const handleOrderSelect = (e: string) => {
		if (e === sortBy) {
			setReverse(reverse === 'false' ? 'true' : 'false');
		} else {
			setSortBy(e);
		}
	};

	return (
		<FeedPage>
			<FeedButtonRow>
				<CreatePostButton onClick={() => setPopup(true)}>
					Submit Post
				</CreatePostButton>
				<DropDown
					state={sortBy}
					setSelect={handleOrderSelect}
					text={'Sort by: '}
					optionList={['popular', 'recent', 'title']}
					height={'34px'}
					width={'160px'}
				/>
			</FeedButtonRow>
			<CreatePostModal
				popup={popup}
				setPopup={setPopup}
				isMounted={isMounted}
			/>
			{(posts && (
				<ForumFeed
					reverse={reverse}
					sortBy={sortBy}
					page={2}
					posts={posts}
				/>
			)) || <PlaceHolderFeed />}
		</FeedPage>
	);
};

export default Feed;
