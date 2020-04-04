import React, {  useState } from 'react';
import { useRequest, useWidth } from '../../../Hooks';
import { MixedFeedItem, Profile } from '../Profile/Types';
import { getLocal, setLocal } from '../../../Utils';
import MixedFeed from '../Profile/MixedFeed';
import DropDown from '../../Components/DropDown';
import {
	ProfileBackground,
	ProfileButtonRow,
	ProfileFeed,
	ProfileHead,
	ProfileInfo,
	ProfilePageDiv,
	ProfilePic,
	ProfileStats,
	ProfileText,
	ProfileUsername,
} from '../Profile/Styles';
import GuardsBG from '../../../Assets/GuardsBGDark2.png';

const ProfilePage: React.FC = () => {
	//TODO: add friend button
	const [profile] = useRequest<Profile>(`users/me`, 'get');
	const [filter, setFilter] = useState('none');
	const [sortBy, setSortBy] = useState(
		getLocal('mixedSortPref')?.sortBy || 'popular',
	);
	const [reverse, setReverse] = useState(
		getLocal('mixedSortPref')?.reverse || 'false',
	);
	const [feed] = useRequest<MixedFeedItem[]>(
		`users/all?page=1&filter=${filter}&user=${
			getLocal('token').user.u_id
		}&order=${sortBy}&reverse=${reverse}`,
		'get',
	);
	const [width, isMobile] = useWidth();

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
					<ProfilePic src={profile?.profile_pic} />
				</ProfileBackground>
				<ProfileStats>
					<ProfileInfo>
						<ProfileUsername>{profile?.username}</ProfileUsername>
						<ProfileText>{profile?.class_of}</ProfileText>
					</ProfileInfo>
				</ProfileStats>
			</ProfileHead>
			<ProfileButtonRow>
				<DropDown
					width={isMobile ? `calc(${width}px / 2 - 15px)` : `160px`}
					height={'32px'}
					state={sortBy}
					text={`${reverse === 'false' ? '▼' : '▲'} Sort by: `}
					setSelect={onSortSelect}
					optionList={['popular', 'recent', 'title']}
				/>
				<DropDown
					state={filter}
					setSelect={onFilterSelect}
					optionList={['resources', 'projects', 'posts']}
					width={isMobile ? `calc(${width}px / 2 - 15px)` : `160px`}
					text={`Filter: `}
					height={'32px'}
				/>
			</ProfileButtonRow>
			{feed && profile && (
				<ProfileFeed>
					<MixedFeed
						feed={feed}
						filter={filter}
						page={2}
						profile={profile}
						reverse={reverse}
						sortBy={sortBy}
					/>
				</ProfileFeed>
			)}
		</ProfilePageDiv>
	);
};

export default ProfilePage;
