import React, { useEffect, useState } from 'react';
import { useNav, useRequest } from '../../Hooks';
import ResourceCard from './ResourceCard';
import {
	Resources,
	SubmitResourceButton,
	FilterButton,
	ResourcePageHead,
	LoadButton,
} from './Styles';

import SubmitResource from './SubmitResource/index';
import { makeRequest } from '../Api/Api';
import { getLocal } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { ResourceListType, ResourceType, Tag, vote } from './Types';
import DropDown from '../Components/DropDown';

const ResourcesHome: React.FC<RouteComponentProps> = ({ history }) => {
	const [filter, setFilter] = useState('none');
	const [sortBy, setSortBy] = useState('popular');
	const [sortRev, setSortRev] = useState('false');
	const [pagination, setPagination] = useState(1);
	const [resources, setResources, isLoading] = useRequest<ResourceListType[]>(
		`resources?page=${pagination}&filter=${filter}&order=${sortBy}&reverse=${sortRev}`,
		'get',
	);
	const [tags, setTags, isLoadingTags] = useRequest<Tag[]>(
		'resources/tags?q=&limit=100',
		'get',
	);

	useNav('resources');
	const [popup, setPopup] = useState(false);

	const deleteResource = async (rId: number) => {
		if (resources) {
			let deleted = await makeRequest(
				'resources/delete_resource',
				'delete',
				{
					userId: getLocal('token').user.u_id,
					resourceId: rId,
				},
			);
			if (deleted?.data?.success) {
				setResources(
					resources.filter(
						(resource: ResourceListType) => resource.r_id !== rId,
					),
				);
			}
		}
	};

	const renderResources = () => {
		if (!!resources)
			return resources.map((resource: ResourceListType) => {
				return (
					<ResourceCard
						key={resource.r_id}
						resource={resource}
						openResource={() =>
							history.push(`/resources/${resource.r_id}`)
						}
						deleteResource={() => deleteResource(resource.r_id)}
						setFilter={setFilter}
						filter={filter}
					/>
				);
			});
	};

	const onSortSelect = (sort: string) => {
		if (sort === sortBy) {
			setSortRev(sortRev === 'true' ? 'false' : 'true');
		} else {
			setSortRev('false');
			setSortBy(sort);
		}
	};

	const onFilterSelect = (newFilter: string) => {
		if (newFilter === filter) {
			setFilter('none');
		} else {
			setFilter(newFilter);
		}
	};

	return (
		<Resources>
			{resources && popup && (
				<SubmitResource
					popup
					setResources={setResources}
					resources={resources}
					setPopup={setPopup}
				/>
			)}
			<ResourcePageHead>
				<SubmitResourceButton onClick={() => setPopup(true)}>
					Submit Resource
				</SubmitResourceButton>
				<DropDown
					width={'156px'}
					height={'34px'}
					state={sortBy}
					text={'Sort by: '}
					setSelect={onSortSelect}
					optionList={['popular', 'recent', 'title']}
				/>
				{tags && (
					<DropDown
						width={'204px'}
						height={'34px'}
						state={filter}
						text={'Filter by: '}
						withFilter={true}
						setSelect={onFilterSelect}
						optionList={tags.map((tag) => tag.title)}
					/>
				)}
				<FilterButton onClick={() => setFilter('none')}>
					Remove filter
				</FilterButton>
			</ResourcePageHead>
			{!isLoading && renderResources()}
			{resources && resources.length >= pagination * 10 && (
				<LoadButton onClick={() => setPagination(pagination + 1)}>
					Moar
				</LoadButton>
			)}
		</Resources>
	);
};

export default ResourcesHome;
