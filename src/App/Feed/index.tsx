import React, { useState, useRef, useEffect, SetStateAction } from 'react';
import Post from './Post';
import { useRequest } from '../../Hooks';
import { useTrail, animated } from 'react-spring';
import CreatePostModal from './CreatePostModal';
import Button from '../Components/Buttons/Button';
import { makeRequest } from '../Api/Api';
import { getLocal } from '../../utils/utils';
import { PostType } from './Types';
import { FeedPage } from './Styles';

const Feed = ({}) => {
	const [popup, setPopup] = useState(false);

	const isMounted = useRef(true);

	// @ts-ignore
	const [posts, setPosts, isLoading] = useRequest<PostType[] | null>(
		'blogs',
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

	const renderList = () => {
		if (posts)
			return trail.map(({ x, height, ...rest }: any, i: number) => {
				return (
					<animated.div
						style={{
							...rest,
							transform: x.interpolate(
								(x: any) => `translate3d(0,${x}px,0)`,
							),
						}}
						id={'feed'}
						key={posts[i].b_id}
					>
						<Post content={posts[i]} />
					</animated.div>
				);
			});
	};

	return (
		<FeedPage>
			<Button
				text={'Create Post'}
				customStyle={{ margin: 'var(--viewMargin)' }}
				onClick={() => setPopup(true)}
			/>
			<CreatePostModal
				popup={popup}
				setPopup={setPopup}
				setPosts={setPosts}
				posts={posts}
				isMounted={isMounted}
			/>
			{!isLoading && renderList()}
		</FeedPage>
	);
};

export default Feed;
