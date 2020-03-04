import React, { useState } from 'react';
import { User } from '../../../../../Types';
import { useHistory } from 'react-router-dom';
import ArrowUpVoted from '../../../../../Assets/ArrowUpVoted.png';
import ArrowUp from '../../../../../Assets/ArrowUp.png';
import ArrowDownVoted from '../../../../../Assets/ArrowDownVoted.png';
import ArrowDown from '../../../../../Assets/ArrowDown.png';
import { formatDate } from '../../../../../Utils';
import ShareImg from '../../../../../Assets/Share.png';
import { vote } from '../../../Resources/Types';
import {
	MixedTitleInfo,
	Thumbnail,
	MixedType,
	MixedTitleType,
	MixedTitle,
} from './Styles';
import {
	Card,
	CardContent,
	CardVotes,
	CardInfo,
	CardButtons,
	CardDate,
	CardTitle,
	ArrowImage,
	VoteCount,
	CardTitleInfo,
	ShareButton,
	CopiedSpan,
	CardAuthor,
} from '../../../../../Styles/CardStyles';
import { makeRequest } from '../../../../../Api';
import { MixedFeedItem, Profile } from '../../Types';
import { ResourceThumbnail } from '../../../Resources/ResourceFeed/ResourceCard/Styles';
import { RowDiv } from '../../../../../Styles/LayoutStyles';

const MixedCard: React.FC<{ item: MixedFeedItem; profile: Profile }> = ({
	item,
	profile,
}) => {
	const history = useHistory();
	const [votes, setVotes] = useState<number>(item.votes);
	const [voted, setVoted] = useState<vote>(item.vote ? item.vote : 0);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [copied, setCopied] = useState(false);

	const voteProject = async (
		vote: vote,
		id: number,
		diff: number,
		voteUrl: string,
	) => {
		if (!disabled) {
			// prevent possible bugs caused by spamming
			setDisabled(true);
			setVotes(votes + diff);
			let backUp = voted;
			setVoted(vote);
			// endpoint expects projectId | blogId | resourceId, we give them all
			let resp = await makeRequest(voteUrl, 'post', {
				vote: vote,
				projectId: id,
				blogId: id,
				resourceId: id,
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

	const handleUpClick = async (vote: vote, projectId: number) => {
		let voteUrl =
			item.type === 'project'
				? 'projects/vote_project'
				: item.type === 'post'
				? 'blogs/vote_blog'
				: 'resources/vote_resource';
		if (voted === 1) {
			await voteProject(0, projectId, -1, voteUrl);
		} else if (voted === -1) {
			await voteProject(vote, projectId, 2, voteUrl);
		} else {
			await voteProject(vote, projectId, 1, voteUrl);
		}
	};

	const handleDownClick = async (vote: vote, projectId: number) => {
		let voteUrl =
			item.type === 'project'
				? 'projects/vote_project'
				: item.type === 'post'
				? 'blogs/vote_blog'
				: 'resources/vote_resource';
		if (voted === -1) {
			await voteProject(0, projectId, 1, voteUrl);
		} else if (voted === 1) {
			await voteProject(vote, projectId, -2, voteUrl);
		} else {
			await voteProject(vote, projectId, -1, voteUrl);
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
						alt={'arrow_up'}
						onClick={() => handleUpClick(1, item.id)}
					/>
				</ArrowImage>
				<VoteCount>
					<span>{votes}</span>
				</VoteCount>
				<ArrowImage>
					<img
						src={voted < 0 ? ArrowDownVoted : ArrowDown}
						alt={'arrow_down'}
						onClick={() => handleDownClick(-1, item.id)}
					/>
				</ArrowImage>
			</CardVotes>
			<CardContent
				onClick={() => history.push(`${item.link}/${item.id}`)}
			>
				<RowDiv>
					{item.thumbnail && (
						<Thumbnail
							onClick={(e: React.SyntheticEvent) => {
								e.stopPropagation();
								window.location.replace(item.link);
							}}
							src={item.thumbnail}
							alt={'thumbnail'}
						/>
					)}
					<MixedTitleInfo full={!item.thumbnail}>
						<MixedTitleType>
							<MixedTitle>{item.title}</MixedTitle>
							<MixedType>{item.type}</MixedType>
						</MixedTitleType>
						<CardInfo>
							<CardDate>
								{formatDate(item.published_date)}
							</CardDate>
							<CardAuthor>{profile.username}</CardAuthor>
						</CardInfo>
					</MixedTitleInfo>
				</RowDiv>
			</CardContent>
			<CardButtons>
				<ShareButton>
					<img
						onClick={() =>
							handleShareClick(
								`${window.location.origin}/${item.link}/${item.id}`,
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

export default MixedCard;
