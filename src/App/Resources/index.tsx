import React, { useState } from 'react';
import { useNav, useRequest } from '../../Hooks';
import ResourceCard from './ResourceCard';
import {
	Resources,
	SubmitResourceButton,
	FilterButton,
	ResourcePageHead,
} from './Styles';

import SubmitResource from './SubmitResource/index';
import Button from '../Components/Buttons/Button';
import { makeRequest } from '../Api/Api';
import { getLocal } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { ResourceListType, ResourceType, vote } from './Types';

const ResourcesHome: React.FC<RouteComponentProps> = ({ history }) => {
	const [filter, setFilter] = useState('none');
	const [resources, setResources, isLoading] = useRequest<ResourceListType[]>(
		`resources?page=1&filter=${filter}`,
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
		console.log(resources);
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
					/>
				);
			});
	};

	return (
		<Resources>
			<ResourcePageHead>
				<SubmitResourceButton onClick={() => setPopup(true)}>
					Submit Resource
				</SubmitResourceButton>
				<FilterButton onClick={() => setFilter('none')}>
					Filter: {filter}
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
