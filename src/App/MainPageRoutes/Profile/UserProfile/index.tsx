import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRequest, useWidth } from '../../../../Hooks';
import { MixedFeedItem, Profile } from '../Types';
import { getLocal, setLocal } from '../../../../Utils/index';
import MixedFeed from '../MixedFeed';
import DropDown from '../../../Components/DropDown';
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
} from '../Styles';
import GuardsBG from '../../../../Assets/GuardsBGDark2.png';

const UserProfile: React.FC = () => {
	//TODO: add friend button
	const params = useParams<{ uid: string }>();
	const [profile] = useRequest<Profile>(`users/${params.uid}`, 'get');
	const [filter, setFilter] = useState('none');
	const [sortBy, setSortBy] = useState(
		getLocal('mixedSortPref')?.sortBy || 'popular',
	);
	const [reverse, setReverse] = useState(
		getLocal('mixedSortPref')?.reverse || 'false',
	);
	const [feed] = useRequest<MixedFeedItem[]>(
		`users/all?page=1&filter=${filter}&user=${params.uid}&order=${sortBy}&reverse=${reverse}`,
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
						<ProfileText>Piscine: {profile?.class_of}</ProfileText>
					</ProfileInfo>
				</ProfileStats>
			</ProfileHead>
			<ProfileButtonRow>
				<DropDown
					width={isMobile ? `calc(${width}px / 2 - 21px)` : `160px`}
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
					width={isMobile ? `calc(${width}px / 2 - 20px)` : `160px`}
					text={`Filter: `}
					height={'32px'}
				/>
			</ProfileButtonRow>
			{feed && profile && (
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

export default UserProfile;
