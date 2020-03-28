import React, { useState } from 'react';
import { RouteComponentProps } from '../../../../../Types';

import { PostProps } from '../../Types';
import ArrowUp from '../../../../../Assets/ArrowUp.png';
import ArrowDown from '../../../../../Assets/ArrowDown.png';
import ArrowUpVoted from '../../../../../Assets/ArrowUpVoted.png';
import ArrowDownVoted from '../../../../../Assets/ArrowDownVoted.png';
import DeleteImg from '../../../../../Assets/x.png';
import { formatDate } from '../../../../../Utils';
import { makeRequest } from '../../../../../Api';
import { withRouter } from 'react-router-dom';

import {
	VoteCount,
	ArrowImage,
	DeleteButton,
	Card,
	CardContent,
	CardInfo,
	CardButtons,
	CardDate,
	CardVotes,
	CardTitle,
	ShareButton,
	CopiedSpan,
	CardAuthor,
	CardTitleInfo,
	CardEdited,
} from '../../../../../Styles/CardStyles';
import { vote } from '../../../Resources/Types';
import ShareImg from '../../../../../Assets/Share.png';
import { useWidth } from '../../../../../Hooks';
import {
	MobileArrowImage,
	MobileCard,
	MobileCardAuthor,
	MobileCardButtons,
	MobileCardContainer,
	MobileCardContent,
	MobileCardDate,
	MobileCardEdited,
	MobileCardInfo,
	MobileCardTitle,
	MobileCardTitleInfo,
	MobileCardVotes,
	MobileCopiedSpan,
	MobileDeleteButton,
	MobileShareButton,
	MobileVoteCount,
} from '../../../../../Styles/MobileCardStyles';

const Post: React.FC<RouteComponentProps<{}> & PostProps> = ({
	post,
	history,
	deletePost,
}) => {
	const [votes, setVotes] = useState<number>(post.votes);
	const [voted, setVoted] = useState<vote>(post.voted ? post.voted : 0);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [copied, setCopied] = useState(false);
	const [width, isMobile] = useWidth();

	const voteBlog = async (vote: vote, blogId: number, diff: number) => {
		if (!disabled) {
			setDisabled(true); // prevent possible bugs caused by spamming
			setVotes(Number(votes) + diff);
			let backUp = voted;
			setVoted(vote);
			try {
				let resp = await makeRequest('blogs/vote_blog', 'post', {
					vote: vote,
					blogId: blogId,
				});
			} catch (e) {
				setVoted(voted);
				setVotes(Number(votes) - diff);
			}
			setDisabled(false);
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

	const handleUpClick = async (vote: vote, blogId: number) => {
		if (voted === 1) {
			await voteBlog(0, blogId, -1);
		} else if (voted === -1) {
			await voteBlog(vote, blogId, 2);
		} else {
			await voteBlog(vote, blogId, 1);
		}
	};

	const handleDownClick = async (vote: vote, blogId: number) => {
		if (voted === -1) {
			await voteBlog(0, blogId, 1);
		} else if (voted === 1) {
			await voteBlog(vote, blogId, -2);
		} else {
			await voteBlog(vote, blogId, -1);
		}
	};

	if (isMobile) {
		return (
			<MobileCard>
				<MobileCardContainer>
					<MobileCardInfo>
						<MobileCardAuthor>{post.username}</MobileCardAuthor>
						<MobileCardDate>
							{formatDate(post.published_date)}
						</MobileCardDate>
					</MobileCardInfo>
					<MobileCardContent
						onClick={() => {
							history.push(`/forum/${post.b_id}`);
						}}
					>
						<MobileCardTitleInfo>
							<MobileCardTitle>{post.title}</MobileCardTitle>
						</MobileCardTitleInfo>
						{!!post.edited && (
							<MobileCardEdited>
								edited: {formatDate(post.edited)}
							</MobileCardEdited>
						)}
					</MobileCardContent>
					<MobileCardButtons>
						<MobileArrowImage>
							<img
								src={voted > 0 ? ArrowUpVoted : ArrowUp}
								alt={'arrow up'}
								onClick={() => handleUpClick(1, post.b_id)}
							/>
						</MobileArrowImage>
						<MobileVoteCount>
							<span>{votes}</span>
						</MobileVoteCount>
						<MobileArrowImage>
							<img
								src={voted < 0 ? ArrowDownVoted : ArrowDown}
								alt={'arrow down'}
								onClick={() => handleDownClick(-1, post.b_id)}
							/>
						</MobileArrowImage>
						<MobileCopiedSpan copied={copied}>
							Copied!
						</MobileCopiedSpan>
						<MobileShareButton>
							<img
								onClick={() =>
									handleShareClick(
										`${window.location.href}/${post.b_id}`,
									)
								}
								src={ShareImg}
								alt={'share'}
							/>
						</MobileShareButton>
						{post.owner && (
							<MobileDeleteButton>
								<img
									onClick={() => deletePost()}
									src={DeleteImg}
									alt={'delete resource'}
								/>
							</MobileDeleteButton>
						)}
					</MobileCardButtons>
				</MobileCardContainer>
			</MobileCard>
		);
	} else {
		return (
			<Card>
				<CardVotes>
					<ArrowImage>
						<img
							src={voted > 0 ? ArrowUpVoted : ArrowUp}
							alt={'arrow_up'}
							onClick={() => handleUpClick(1, post.b_id)}
						/>
					</ArrowImage>
					<VoteCount>
						<span>{votes}</span>
					</VoteCount>
					<ArrowImage>
						<img
							src={voted < 0 ? ArrowDownVoted : ArrowDown}
							alt={'arrow_down'}
							onClick={() => handleDownClick(-1, post.b_id)}
						/>
					</ArrowImage>
				</CardVotes>
				<CardContent
					onClick={() => {
						history.push(`/forum/${post.b_id}`);
					}}
				>
					<CardTitleInfo>
						<CardTitle>{post.title}</CardTitle>
						<CardInfo>
							<CardDate>
								{formatDate(post.published_date)}
							</CardDate>
							<CardAuthor>{post.username}</CardAuthor>
							<CardEdited>
								{post.edited &&
									`edited: ${formatDate(post.edited)}`}
							</CardEdited>
						</CardInfo>
					</CardTitleInfo>
				</CardContent>
				<CardButtons>
					{post.owner && (
						<DeleteButton>
							<img
								onClick={deletePost}
								src={DeleteImg}
								alt={'delete post'}
							/>
						</DeleteButton>
					)}
					<ShareButton>
						<img
							onClick={() =>
								handleShareClick(
									`${window.location.href}/${post.b_id}`,
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
	}
};

export default withRouter(Post);
