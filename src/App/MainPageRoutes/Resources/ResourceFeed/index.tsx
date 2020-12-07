import React, { Dispatch, SetStateAction, Fragment, useState } from 'react';
import { useRequest } from '../../../../Hooks';
import { ResourceListType } from '../Types';
import { makeRequest } from '../../../../Api';
import { getLocal } from '../../../../Utils';
import ResourceCard from './ResourceCard/index';
import { useHistory } from 'react-router-dom';
import PlusIcon from '../../../../Assets/Plus.png';
import { Feed, MoreButton } from '../../../../Styles/CardStyles';

type ResourceFeedPropTypes = {
	pagination: number;
	reverse: string;
	sortBy: string;
	filterBy: string;
	setFilter: Dispatch<SetStateAction<string>>;
	resources: ResourceListType[];
	setResources: Dispatch<SetStateAction<ResourceListType[] | undefined>>;
	show: string;
};

const ResourcesResourceFeed: React.FC<ResourceFeedPropTypes> = ({
	pagination,
	reverse,
	sortBy,
	filterBy,
	setFilter,
	resources,
	setResources,
	show,
}) => {
	const history = useHistory();
	const [nextResources, setNextResources, ] = useRequest<
		ResourceListType[]
	>(
		`resources?page=${pagination}&filter=${filterBy}&order=${sortBy}&reverse=${reverse}&show=${show}`,
		'get',
		{},
		resources.length >= 14,
	);
	const [next, setNext] = useState(false);
	const deleteResource = async (rId: number) => {
		if (window.confirm('Are you sure you want to delete this resource?')) {
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
							(resource: ResourceListType) =>
								resource.r_id !== rId,
						),
					);
				}
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
						filter={filterBy}
					/>
				);
			});
	};
	return (
		<Fragment>
			<Feed>
				{resources && renderResources()}

			</Feed>
			{next && nextResources && setNextResources && (
					<ResourcesResourceFeed
						pagination={++pagination}
						reverse={reverse}
						sortBy={sortBy}
						show={show}
						filterBy={filterBy}
						setFilter={setFilter}
						resources={nextResources}
						setResources={setNextResources}
					/>
				)}
			{!next && resources.length >= 14 && !!nextResources?.length &&(
				<MoreButton>
					<img
						src={PlusIcon}
						alt={'load more posts'}
						onClick={() => setNext(true)}
					/>
				</MoreButton>
			)}
		</Fragment>
	);
};

export default ResourcesResourceFeed;
