import React, { useEffect, useState } from 'react';
import { useNav, useRequest } from '../../Hooks';
import ResourceCard from './ResourceCard';
import {
	Resources,
	SubmitResourceButton,
	FilterButton,
	ResourcePageHead,
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
	const [resources, setResources, isLoading] = useRequest<ResourceListType[]>(
		`resources?page=1&filter=${filter}&order=${sortBy}`,
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
	console.log(tags);
	return (
		<Resources>
			<ResourcePageHead>
				<SubmitResourceButton onClick={() => setPopup(true)}>
					Submit Resource
				</SubmitResourceButton>
				<DropDown
					width={'156px'}
					height={'34px'}
					state={sortBy}
					text={'Sort by: '}
					setState={setSortBy}
					optionList={['popular', 'recent']}
				/>
				{tags && (
					<DropDown
						width={'204px'}
						height={'34px'}
						state={filter}
						text={'Filter by: '}
						withFilter={true}
						setState={setFilter}
						optionList={tags.map((tag) => tag.title)}
					/>
				)}
				<FilterButton onClick={() => setFilter('none')}>
					Remove filter
				</FilterButton>
			</ResourcePageHead>
			{!isLoading && renderResources()}
			{resources && popup && (
				<SubmitResource
					popup
					setResources={setResources}
					resources={resources}
					setPopup={setPopup}
				/>
			)}
		</Resources>
	);
};

export default ResourcesHome;
