import React, { Dispatch, SetStateAction, useState } from 'react';
import {
	ResourceRow,
	ResourceThumbnail,
	ResourceTitle,
	ResourceTitleInfo,
	ResourceTitleType,
	ResourceType,
	Tag,
	Tags,
} from './Styles';
import {
	VoteCount,
	ArrowImage,
	ShareButton,
	CopiedSpan,
	DeleteButton,
	CardContent,
	CardInfo,
	CardDate,
	Card,
	CardVotes,
	CardTitle,
	CardButtons,
	CardAuthor,
	CardTitleInfo,
	CardEdited,
} from '../../../../../Styles/CardStyles';
import ArrowUp from '../../../../../Assets/ArrowUp.png';
import ArrowDown from '../../../../../Assets/ArrowDown.png';
import ArrowUpVoted from '../../../../../Assets/ArrowUpVoted.png';
import ArrowDownVoted from '../../../../../Assets/ArrowDownVoted.png';
import DeleteImg from '../../../../../Assets/x.png';
import ShareImg from '../../../../../Assets/Share.png';
import { ResourceListType, vote } from '../../Types';
import { makeRequest } from '../../../../../Api';
import { formatDate } from '../../../../../Utils';
import { RowDiv } from '../../../../../Styles/LayoutStyles';

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
	const [copied, setCopied] = useState(false);

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

	const handleShareClick = (text: string) => {
		setCopied(true);
		try {
			// on http connections this function fails
			navigator.clipboard.writeText(text);
			setTimeout(() => {
				setCopied(false);
			}, 700);
		} catch (e) {
			setCopied(false);
		}
	};
	return (
		<Card>
			<CardVotes>
				<ArrowImage>
					<img
						src={voted > 0 ? ArrowUpVoted : ArrowUp}
						alt={'arrow up'}
						onClick={() => handleUpClick(1, resource.r_id)}
					/>
				</ArrowImage>
				<VoteCount>
					<span>{votes}</span>
				</VoteCount>
				<ArrowImage>
					<img
						src={voted < 0 ? ArrowDownVoted : ArrowDown}
						alt={'arrow down'}
						onClick={() => handleDownClick(-1, resource.r_id)}
					/>
				</ArrowImage>
			</CardVotes>
			<CardContent
				key={resource.r_id}
				onClick={() => {
					openResource();
				}}
			>
				<ResourceRow>
					{resource.thumbnail && (
						<ResourceThumbnail
							src={resource.thumbnail}
							alt={'thumbnail'}
						/>
					)}
					<ResourceTitleInfo full={!resource.thumbnail}>
						<ResourceTitleType>
							<ResourceTitle>{resource.title}</ResourceTitle>
							<ResourceType>
								{resource.resource_type}
							</ResourceType>
						</ResourceTitleType>
						<CardInfo>
							<CardDate>
								{formatDate(resource.published_date)}
							</CardDate>
							<CardAuthor>{resource.username}</CardAuthor>
							<CardEdited>
								{resource.edited &&
									`edited: ${formatDate(resource.edited)}`}
							</CardEdited>
						</CardInfo>
					</ResourceTitleInfo>
				</ResourceRow>

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
			</CardContent>
			<CardButtons>
				{resource.owner && (
					<DeleteButton>
						<img
							onClick={() => deleteResource()}
							src={DeleteImg}
							alt={'delete resource'}
						/>
					</DeleteButton>
				)}
				<ShareButton>
					<img
						onClick={() =>
							handleShareClick(
								`${window.location.href}/${resource.r_id}`,
							)
						}
						src={ShareImg}
						alt={'share'}
					/>
					<CopiedSpan copied={copied}>Copied!</CopiedSpan>
				</ShareButton>
			</CardButtons>
		</Card>
	);
};

export default ResourcesResourceCard;
