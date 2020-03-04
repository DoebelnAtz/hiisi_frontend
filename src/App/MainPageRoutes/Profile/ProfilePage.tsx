import React, { useState } from 'react';
import { useRequest } from '../../../Hooks';
import { MixedFeedItem, Profile } from './Types';
import { getLocal, setLocal } from '../../../Utils';
import MixedFeed from './MixedFeed';
import DropDown from '../../Components/DropDown';
import { ProfileButtonRow } from './Styles';

type ProfilePageProps = {
	profile: Profile;
};

const ProfilePage: React.FC<ProfilePageProps> = ({ profile }) => {
	//TODO: add friend button
	const [filter, setFilter] = useState('none');
	const [sortBy, setSortBy] = useState(
		getLocal('mixedSortPref')?.sortBy || 'popular',
	);
	const [reverse, setReverse] = useState(
		getLocal('mixedSortPref')?.reverse || 'false',
	);
	const [feed, setFeed, isLoading] = useRequest<MixedFeedItem[]>(
		`users/all?page=1&user=${profile.u_id}&order=${sortBy}&reverse=${reverse}`,
		'get',
	);

	const onSortSelect = (sort: string) => {
		if (sort === sortBy) {
			// Save sorting preference to localstorage
			setLocal('mixedSortPref', {
				sortBy: sort,
				reverse: reverse === 'true' ? 'false' : 'true',
			});
			setReverse(reverse === 'true' ? 'false' : 'true');
		} else {
			setLocal('mixedSortPref', { sortBy: sort });
			setReverse('false');
			setSortBy(sort);
		}
	};

	// @ts-ignore
	return (
		<div id={'profile_page'} className={'container'}>
			<div className={'row justify-content-center'}>
				<img
					className={'profile_profile_pic'}
					src={profile.profile_pic}
					alt={profile.username}
				/>
			</div>
			<div>
				<p>username: {profile.username}</p>
				<p>achievement points: {profile.achievement_points}</p>
				<p>grade: {profile.grade}</p>
				<p>class of: {profile.class_of}</p>
				<p>evaluation points: {profile.correction_points}</p>
				<p>coalition rank: {profile.coalition_rank}</p>
				<p>level: {profile.level}</p>
				<p>location: {profile.location}</p>
				<p>coalition points: {profile.coalition_points}</p>
				<p>wallet: {profile.wallet}</p>
				<p>active: {profile.active ? 'active' : 'inactive'}</p>
				{/*<AddFriend target={profile}/>*/}
			</div>
			<div className={'container'}>
				<ProfileButtonRow>
					<DropDown
						width={'175px'}
						height={'34px'}
						withFilter
						state={sortBy}
						text={`${reverse === 'false' ? '▼' : '▲'} Sort by: `}
						setSelect={onSortSelect}
						optionList={['popular', 'recent', 'title']}
					/>
				</ProfileButtonRow>
				{feed && (
					<MixedFeed
						feed={feed}
						page={2}
						profile={profile}
						reverse={reverse}
						sortBy={sortBy}
					/>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
