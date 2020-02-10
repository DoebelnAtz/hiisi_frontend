import React, { useState } from 'react';
import { useRequest } from '../../Hooks';

import {
	ResourceCard,
	Resources,
	Tag,
	Tags,
	ResourceTitle,
	DeleteButton,
	SubmitResourceButton,
	FilterButton,
	ResourcePageHead,
} from './Styles';
import SubmitResource from './SubmitResource/index';
import Button from '../Components/Buttons/Button';
import { makeRequest } from '../Api/Api';
import { getLocal } from '../../utils/utils';
import { RouteComponentProps } from 'react-router';
import { ResourceListType, ResourceType } from './Types';

const ResourcesHome: React.FC<RouteComponentProps> = ({ history }) => {
	const [filter, setFilter] = useState('none');
	const [resources, setResources, isLoading] = useRequest<ResourceListType[]>(
		`resources?page=1&filter=${filter}`,
		'get',
	);
	const [popup, setPopup] = useState(false);
	console.log(resources);

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
					<ResourceCard key={resource.r_id}>
						<ResourceTitle
							onClick={() => {
								history.push(`/resources/${resource.r_id}`);
							}}
						>
							{resource.title}
						</ResourceTitle>
						<Tags>
							{resource.tags.map((tag, index) => (
								<Tag
									color={resource.colors[index]}
									key={index}
									onClick={() => setFilter(tag)}
								>
									# {tag}
								</Tag>
							))}
						</Tags>
						<DeleteButton>
							{resource.owner && (
								<Button
									onClick={() =>
										deleteResource(resource.r_id)
									}
								>
									X
								</Button>
							)}
						</DeleteButton>
					</ResourceCard>
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
