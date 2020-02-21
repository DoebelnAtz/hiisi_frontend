import React, { useState } from 'react';

import { PostProps } from '../Types';

import ArrowUp from '../../../Assets/ArrowUp.png';
import ArrowDown from '../../../Assets/ArrowDown.png';
import ArrowUpVoted from '../../../Assets/ArrowUpVoted.png';
import ArrowDownVoted from '../../../Assets/ArrowDownVoted.png';
import DeleteImg from '../../../Assets/x.png';
import { formatDate } from '../../../utils/utils';
import { makeRequest } from '../../../Api/Api';
import { RouteComponentProps } from '../../../Types';
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
} from '../../../Styles/CardStyles';
import { vote } from '../../Resources/Types';
import ShareImg from '../../../Assets/Share.png';

const Post: React.FC<RouteComponentProps<{}> & PostProps> = ({
	content,
	history,
	deletePost,
}) => {
	const [votes, setVotes] = useState<number>(content.votes);
	const [voted, setVoted] = useState<vote>(content.voted ? content.voted : 0);
	const [disabled, setDisabled] = useState<boolean>(false);
	const [copied, setCopied] = useState(false);

	const voteBlog = async (vote: vote, blogId: number, diff: number) => {
		if (!disabled) {
			setDisabled(true); // prevent possible bugs caused by spamming
			setVotes(votes + diff);
			let backUp = voted;
			setVoted(vote);
			let resp = await makeRequest('blogs/vote_blog', 'post', {
				vote: vote,
				blogId: blogId,
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

	return (
		<Card>
			<CardVotes>
				<ArrowImage>
					<img
						src={voted > 0 ? ArrowUpVoted : ArrowUp}
						alt={'arrow_up'}
						onClick={() => handleUpClick(1, content.b_id)}
					/>
				</ArrowImage>
				<VoteCount>
					<span>{votes}</span>
				</VoteCount>
				<ArrowImage>
					<img
						src={voted < 0 ? ArrowDownVoted : ArrowDown}
						alt={'arrow_down'}
						onClick={() => handleDownClick(-1, content.b_id)}
					/>
				</ArrowImage>
			</CardVotes>
			<CardContent
				onClick={() => {
					history.push(`/forum/${content.b_id}`);
				}}
			>
				<CardTitleInfo>
					<CardTitle>{content.title}</CardTitle>
					<CardInfo>
						<CardDate>
							{formatDate(content.published_date)}
						</CardDate>
						<CardAuthor>{content.username}</CardAuthor>
					</CardInfo>
				</CardTitleInfo>
			</CardContent>
			<CardButtons>
				{content.owner && (
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
								`${window.location.href}/${content.b_id}`,
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

export default withRouter(Post);
