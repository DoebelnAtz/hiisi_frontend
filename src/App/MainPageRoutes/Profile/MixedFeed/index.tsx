import React, { Fragment, useState } from 'react';
import { useRequest } from '../../../../Hooks';
import ProjectCard from './MixedCard/index';
import { MoreButton } from '../../Forum/ForumFeed/Styles';
import PlusIcon from '../../../../Assets/Plus.png';
import { Feed } from '../../../../Styles/CardStyles';

import { ResourceListType, vote } from '../../Resources/Types';
import { PostType } from '../../Forum/Types';
import { ProjectCardType } from '../../OpenHive/Types';
import MixedCard from './MixedCard';
import { MixedFeedItem, Profile } from '../Types';
import { Profiler } from 'inspector';

type MixedFeedProps = {
	feed: MixedFeedItem[];
	page: number;
	reverse?: string;
	sortBy?: string;
	filter: string;
	profile: Profile;
};

const MixedFeed: React.FC<MixedFeedProps> = ({
	feed,
	page,
	profile,
	filter,
	sortBy,
	reverse,
}) => {
	const [nextFeed, setNextFeed, isLoading] = useRequest<MixedFeedItem[]>(
		`users/all?page=${page}&filter=${filter}&user=${profile.u_id}&order=${sortBy}&reverse=${reverse}`,
		'get',
		{},
		feed.length >= 14,
	);
	const [showNext, setShowNext] = useState(false);

	const renderAll = () => {
		return feed.map((item) => {
			return (
				<MixedCard
					key={`${item.title}${item.id}`}
					item={item}
					profile={profile}
				/>
			);
		});
	};

	return (
		<Fragment>
			<Feed>
				{renderAll()}
				{showNext && setNextFeed && nextFeed && (
					<MixedFeed
						page={page + 1}
						feed={nextFeed}
						filter={filter}
						sortBy={sortBy}
						profile={profile}
					/>
				)}
			</Feed>
			{!showNext && feed.length >= 14 && (
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

export default MixedFeed;