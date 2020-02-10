import React, { Dispatch, SetStateAction, useState } from 'react';
import {
	ArrowImage,
	DeleteButton,
	ResourceCard,
	ResourceContent,
	ResourceTitle,
	ResourceVoteCount,
	ResourceVotes,
	Tag,
	Tags,
} from '../Styles';
import Button from '../../Components/Buttons/Button';
import ArrowUp from '../../../Assets/ArrowUp.png';
import ArrowDown from '../../../Assets/ArrowDown.png';
import { ResourceListType, vote } from '../Types';
import { RouteComponentProps } from 'react-router';
import { makeRequest } from '../../Api/Api';
import { getLocal } from '../../../utils/utils';
import { number } from 'prop-types';

type ResourceCardPropTypes = {
	resource: ResourceListType;
	setFilter: Dispatch<SetStateAction<string>>;
	deleteResource: () => void;
	openResource: () => void;
	key?: number;
};

const ResourcesResourceCard: React.FC<ResourceCardPropTypes> = ({
	key,
	resource,
	setFilter,
	deleteResource,
	openResource,
}) => {
	const [votes, setVotes] = useState<number>();

	const voteResource = async (vote: vote, resourceId: number) => {
		let resp = await makeRequest('resources/vote_resource', 'post', {
			vote: vote,
			resourceId: resourceId,
		});
		if (votes && resp?.data) {
			setVotes(votes + vote);
		}
	};

	return (
		<ResourceCard key={resource.r_id}>
			<ResourceVotes>
				<ArrowImage src={ArrowUp} alt={'arrow_up'} onClick={() => {}} />
				<ResourceVoteCount>
					{votes ? votes : resource.votes}
				</ResourceVoteCount>
				<ArrowImage src={ArrowDown} alt={'arrow_down'} />
			</ResourceVotes>
			<ResourceContent>
				<ResourceTitle
					onClick={() => {
						openResource();
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
						<Button onClick={() => deleteResource()}>X</Button>
					)}
				</DeleteButton>
			</ResourceContent>
		</ResourceCard>
	);
};

export default ResourcesResourceCard;
