import React, { useState } from 'react';
import { useRequest } from '../../../Hooks';
import { MixedFeedItem, Profile } from './Types';
import { getLocal, setLocal } from '../../../Utils';
import MixedFeed from './MixedFeed';
import DropDown from '../../Components/DropDown';
import {
	ProfileBackground,
	ProfileButtonRow,
	ProfileHead,
	ProfileInfo,
	ProfilePageDiv,
	ProfilePic,
	ProfileStats,
	ProfileText,
	ProfileUsername,
} from './Styles';
import GuardsBG from '../../../Assets/GuardsBGDark2.png';
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
		`users/all?page=1&filter=${filter}&user=${profile.u_id}&order=${sortBy}&reverse=${reverse}`,
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

	const onFilterSelect = (newFilter: string) => {
		setFilter(newFilter === filter ? 'none' : newFilter);
	};

	// @ts-ignore
	return (
		<ProfilePageDiv>
			<ProfileHead>
				<ProfileBackground src={GuardsBG}>
					<ProfilePic
						src={profile.profile_pic}
						alt={profile.username}
					/>
				</ProfileBackground>
				<ProfileStats>
					<ProfileInfo>
						<ProfileUsername>{profile.username}</ProfileUsername>
						<ProfileText>class of: {profile.class_of}</ProfileText>
					</ProfileInfo>
				</ProfileStats>
			</ProfileHead>
			<ProfileButtonRow>
				<DropDown
					width={'175px'}
					height={'34px'}
					state={sortBy}
					text={`${reverse === 'false' ? '▼' : '▲'} Sort by: `}
					setSelect={onSortSelect}
					optionList={['popular', 'recent', 'title']}
				/>
				<DropDown
					state={filter}
					setSelect={onFilterSelect}
					optionList={['resources', 'projects', 'posts']}
					width={'158px'}
					text={`Filter: `}
					height={'34px'}
				/>
			</ProfileButtonRow>
			{feed && (
				<MixedFeed
					feed={feed}
					filter={filter}
					page={2}
					profile={profile}
					reverse={reverse}
					sortBy={sortBy}
				/>
			)}
		</ProfilePageDiv>
	);
};

export default ProfilePage;
