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
} from './Styles';
import Button from '../../Components/Buttons/Button';
import ArrowUp from '../../../Assets/ArrowUp.png';
import ArrowDown from '../../../Assets/ArrowDown.png';
import ArrowUpVoted from '../../../Assets/ArrowUpVoted.png';
import ArrowDownVoted from '../../../Assets/ArrowDownVoted.png';

import { ResourceListType, vote } from '../Types';
import { makeRequest } from '../../Api/Api';
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
	const [votes, setVotes] = useState<number>(resource.votes);
	const [voted, setVoted] = useState<vote>(resource.vote ? resource.vote : 0);

	const voteResource = async (vote: vote, resourceId: number) => {
		let resp = await makeRequest('resources/vote_resource', 'post', {
			vote: vote,
			resourceId: resourceId,
		});
		if (resp?.data) {
			setVoted(vote);
			setVotes(votes + vote);
		}
	};

	const removeVote = async (
		vote: vote,
		resourceId: number,
		update: boolean,
	) => {
		let resp = await makeRequest('resources/remove_vote', 'put', {
			vote: vote,
			resourceId: resourceId,
		});
		if (resp?.data && update) {
			setVoted(0);
			setVotes(votes - vote);
		}
	};

	const handleUpClick = async (vote: vote, resourceId: number) => {
		if (voted === 1) {
			await voteResource(0, resourceId);
		} else {
			await voteResource(vote, resourceId);
		}
	};

	const handleDownClick = async (vote: vote, resourceId: number) => {
		if (voted === -1) {
			await voteResource(0, resourceId);
		} else {
			await voteResource(vote, resourceId);
		}
	};

	return (
		<ResourceCard key={resource.r_id}>
			<ResourceVotes>
				<ArrowImage
					src={voted > 0 ? ArrowUpVoted : ArrowUp}
					alt={'arrow_up'}
					onClick={() => handleUpClick(1, resource.r_id)}
				/>
				<ResourceVoteCount>{votes}</ResourceVoteCount>
				<ArrowImage
					src={voted < 0 ? ArrowDownVoted : ArrowDown}
					alt={'arrow_down'}
					onClick={() => handleDownClick(-1, resource.r_id)}
				/>
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
