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
	ResourceButtons,
	ResourceDate,
} from './Styles';
import Button from '../../Components/Buttons/Button';
import ArrowUp from '../../../Assets/ArrowUp.png';
import ArrowDown from '../../../Assets/ArrowDown.png';
import ArrowUpVoted from '../../../Assets/ArrowUpVoted.png';
import ArrowDownVoted from '../../../Assets/ArrowDownVoted.png';

import { ResourceListType, vote } from '../Types';
import { makeRequest } from '../../Api/Api';
import { formatDate } from '../../../utils/utils';

type ResourceCardPropTypes = {
	resource: ResourceListType;
	setFilter: Dispatch<SetStateAction<string>>;
	deleteResource: () => void;
	openResource: () => void;
	filter: string;
	key?: number;
};

const ResourcesResourceCard: React.FC<ResourceCardPropTypes> = ({
	resource,
	setFilter,
	deleteResource,
	openResource,
	filter,
}) => {
	const [votes, setVotes] = useState<number>(resource.votes);
	const [voted, setVoted] = useState<vote>(resource.vote ? resource.vote : 0);
	const [disabled, setDisabled] = useState<boolean>(false);
	const voteResource = async (
		vote: vote,
		resourceId: number,
		diff: number,
	) => {
		if (!disabled) {
			setDisabled(true); // prevent possible bugs caused by spamming
			setVotes(votes + diff);
			let backUp = voted;
			setVoted(vote);
			let resp = await makeRequest('resources/vote_resource', 'post', {
				vote: vote,
				resourceId: resourceId,
			});
			if (!resp?.data) {
				// To make the UI feel more responsive we set states before we make a
				// request, then set them back if the request fails
				setVoted(voted);
				setVotes(votes - diff);
			}
			setDisabled(false);
		}
	};

	const handleUpClick = async (vote: vote, resourceId: number) => {
		if (voted === 1) {
			await voteResource(0, resourceId, -1);
		} else if (voted === -1) {
			await voteResource(vote, resourceId, 2);
		} else {
			await voteResource(vote, resourceId, 1);
		}
	};

	const handleDownClick = async (vote: vote, resourceId: number) => {
		if (voted === -1) {
			await voteResource(0, resourceId, 1);
		} else if (voted === 1) {
			await voteResource(vote, resourceId, -2);
		} else {
			await voteResource(vote, resourceId, -1);
		}
	};

	const handleFiltering = (filterName: string) => {
		if (filterName === filter) {
			setFilter('none');
		} else {
			setFilter(filterName);
		}
	};

	return (
		<ResourceCard>
			<ResourceVotes>
				<ArrowImage>
					<img
						src={voted > 0 ? ArrowUpVoted : ArrowUp}
						alt={'arrow_up'}
						onClick={() => handleUpClick(1, resource.r_id)}
					/>
				</ArrowImage>
				<ResourceVoteCount>
					<span>{votes}</span>
				</ResourceVoteCount>
				<ArrowImage>
					<img
						src={voted < 0 ? ArrowDownVoted : ArrowDown}
						alt={'arrow_down'}
						onClick={() => handleDownClick(-1, resource.r_id)}
					/>
				</ArrowImage>
			</ResourceVotes>
			<ResourceContent
				key={resource.r_id}
				onClick={() => {
					openResource();
				}}
			>
				<ResourceTitle>
					{resource.title}
					<ResourceDate>
						{formatDate(resource.published_date)}
					</ResourceDate>
				</ResourceTitle>
				<Tags>
					{resource.tags &&
						resource.tags?.map((tag, index) => (
							<Tag
								color={resource.colors[index]}
								key={index}
								onClick={(e: React.SyntheticEvent) => {
									e.stopPropagation();
									handleFiltering(tag);
								}}
							>
								# {tag}
							</Tag>
						))}
				</Tags>
			</ResourceContent>
			<ResourceButtons>
				<DeleteButton>
					{resource.owner && (
						<Button onClick={() => deleteResource()}>X</Button>
					)}
				</DeleteButton>
			</ResourceButtons>
		</ResourceCard>
	);
};

export default ResourcesResourceCard;
