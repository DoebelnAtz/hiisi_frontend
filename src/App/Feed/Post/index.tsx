import React, { useState } from 'react';

import ViewPost from './ViewPost';
import { PostProps } from '../Types';
import {
	BlogPost,
	ButtonRow,
	CommentButton,
	LikeButton,
	PostAuthor,
	PostDate,
	PostContent,
	PostInfo,
	PostButtons,
	PostTitle,
	PostVotes,
} from './Styles';
import ArrowUp from '../../../Assets/ArrowUp.png';
import ArrowDown from '../../../Assets/ArrowDown.png';
import ArrowUpVoted from '../../../Assets/ArrowUpVoted.png';
import ArrowDownVoted from '../../../Assets/ArrowDownVoted.png';
import DeleteImg from '../../../Assets/x.png';
import { formatDate } from '../../../utils/utils';
import { makeRequest } from '../../Api/Api';
import { RouteComponentProps } from '../../../Types';
import { withRouter } from 'react-router-dom';

import {
	VoteCount,
	ArrowImage,
	DeleteButton,
} from '../../../Styles/sharedStyles';
import { vote } from '../../Resources/Types';

const Post: React.FC<RouteComponentProps<{}> & PostProps> = ({
	content,
	history,
}) => {
	//  TODO: refactor the code for this component, too many child components.

	const [votes, setVotes] = useState<number>(content.votes);
	const [voted, setVoted] = useState<vote>(content.voted ? content.voted : 0);
	const [disabled, setDisabled] = useState<boolean>(false);

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
	console.log(content, voted);

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
		<BlogPost>
			<PostVotes>
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
			</PostVotes>
			<PostContent
				onClick={() => {
					history.push(`/blog/${content.b_id}`);
				}}
			>
				<PostTitle>{content.title}</PostTitle>
				<PostInfo>
					<PostDate>{formatDate(content.published_date)}</PostDate>
					<PostAuthor>{content.username}</PostAuthor>
				</PostInfo>
			</PostContent>
			<PostButtons>
				{content.owner && (
					<DeleteButton>
						<img onClick={() => {}} src={DeleteImg} />
					</DeleteButton>
				)}
			</PostButtons>
		</BlogPost>
	);
};

export default withRouter(Post);
