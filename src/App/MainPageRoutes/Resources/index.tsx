import React, { useEffect, useState } from 'react';
import { useNav, useRequest } from '../../../Hooks';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import ResourceCard from './ResourceFeed/ResourceCard';
import {
	Resources,
	SubmitResourceButton,
	FilterButton,
	ResourcePageHead,
	LoadButton,
} from './Styles';

import SubmitResource from './SubmitResource/index';
import { makeRequest } from '../../../Api/Api';
import { getLocal, setLocal } from '../../../Utils';
import { RouteComponentProps } from 'react-router';
import { ResourceListType, ResourceType, Tag } from './Types';
import DropDown from '../../Components/DropDown';
import ResourcesResourceFeed from './ResourceFeed';
import PlaceHolderFeed from '../../Components/PlaceHolderFeed';

const defaultTag = { tag_id: 0, color: '', title: 'none' };

const ResourcesHome: React.FC<RouteComponentProps> = ({ history }) => {
	const [filter, setFilter] = useState<Tag>(defaultTag);
	const [sortBy, setSortBy] = useState(
		getLocal('resourceSortPref')?.sortBy || 'popular',
	);
	const [reverse, setSortRev] = useState('false');

	const [tags, ,] = useRequest<Tag[]>('resources/tags?q=&limit=100', 'get');
	const [resources, setResources, isLoading] = useRequest<ResourceType[]>(
		`resources?page=1&filter=${filter.tag_id}&order=${sortBy}&reverse=${reverse}`,
		'get',
	);
	useNav('resources');
	const [popup, setPopup] = useState(false);

	const onSortSelect = (sort: string) => {
		// Save sorting preference to localstorage
		setLocal('resourceSortPref', { sortBy: sort });
		if (sort === sortBy) {
			setSortRev(reverse === 'true' ? 'false' : 'true');
		} else {
			setSortRev('false');
			setSortBy(sort);
		}
	};

	const onFilterSelect = (newFilter: string) => {
		if (tags && newFilter === filter.title) {
			setFilter(defaultTag);
		} else {
			if (tags) {
				let nextFilter = tags.find((tag) => tag.title === newFilter);
				setFilter(nextFilter ?? defaultTag);
			}
		}
	};

	return (
		<Resources>
			{popup && resources && (
				<SubmitResource
					resources={resources}
					setResources={setResources}
					popup
					setPopup={setPopup}
				/>
			)}
			<ResourcePageHead>
				<SubmitResourceButton onClick={() => setPopup(true)}>
					Submit Resource
				</SubmitResourceButton>
				<DropDown
					width={'175px'}
					height={'34px'}
					state={sortBy}
					text={`${reverse === 'false' ? '▼' : '▲'} Sort by: `}
					setSelect={onSortSelect}
					optionList={['popular', 'recent', 'title']}
				/>
				{tags && (
					<DropDown
						width={'166px'}
						height={'34px'}
						state={filter.title}
						text={'Filter: '}
						withFilter={true}
						setSelect={onFilterSelect}
						optionList={tags.map((tag) => tag.title)}
					/>
				)}
				<FilterButton onClick={() => setFilter(defaultTag)}>
					Remove filter
				</FilterButton>
			</ResourcePageHead>
			{(resources && (
				<ResourcesResourceFeed
					pagination={2}
					reverse={reverse}
					sortBy={sortBy}
					filterBy={filter}
					setFilter={() => setFilter(defaultTag)}
					resources={resources}
					setResources={setResources}
				/>
			)) || <PlaceHolderFeed />}
		</Resources>
	);
};

export default ResourcesHome;
