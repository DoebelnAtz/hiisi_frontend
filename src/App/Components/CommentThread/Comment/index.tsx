import React, { useState, Fragment } from 'react';
import Reply from '../Reply';
import { formatDate, getLocal } from '../../../../Utils';
import { useRequest } from '../../../../Hooks';

import {
	ParentComment,
	CommentHead,
	CommentBody,
	ChildComments,
	CommentInfo,
	ButtonRow,
	ShowRepliesButton,
	ReplyRow,
	DeleteCommentBtn,
} from './Styles';
import { CommentType } from '../../../MainPageRoutes/Forum/Types';
import { useHistory } from 'react-router';
import CommentFeed from '../CommentFeed';
import { FocusList } from '../../../../Types';
import { makeRequest } from '../../../../Api';

export interface CommentProps {
	odd: boolean;
	focusList: FocusList;
	child: CommentType;
	allComments: CommentType[];
	renderComments: (
		thread: Array<CommentType> | undefined,
		expanded: boolean,
	) => void;
	isExpanded: boolean;
}

const CommentCard: React.FC<CommentProps> = ({
	odd,
	focusList,
	child,
	renderComments,
	allComments,
	isExpanded,
}) => {
	const history = useHistory();
	const [childThread, setChildThread] = useState(
		allComments.filter(
			(comment) => comment.parentthread === child.childthread,
		),
	);
	const [comment, setComment] = useState(child);

	const [expanded, setExpanded] = useState(true);

	const handleDelete = async () => {
		try {
			if (
				window.confirm('Are you sure you want to delete this comment?')
			) {
				await makeRequest('blogs/delete_comment', 'DELETE', {
					commentId: child.c_id,
				});
				setComment({
					...comment,
					username: null,
					u_id: null,
					profile_pic: null,
					commentcontent: 'deleted',
				});
			}
		} catch (e) {
			console.log('Failed to delete comment');
		}
	};
		if (isExpanded)
		return (
			<ParentComment key={comment.c_id} odd={odd}>
				<CommentHead odd={odd}>
					<img
						src={
							comment.profile_pic ??
							'https://cdn.intra.42.fr/users/small_marvin.png'
						}
						alt={`${comment.username} profiled pic`}
						onClick={() => history.push(`/user/${comment.u_id}`)}
					/>
					<CommentInfo odd={odd}>
						<span>
							{comment.username ?? 'deleted'} |{' '}
							{formatDate(comment.comment_date)}
							{comment.username &&
							focusList.focus.includes(comment.username)
								? ' | ' + focusList.title
								: ''}
						</span>
					</CommentInfo>
					{comment.u_id === getLocal('token').user.u_id && (
						<DeleteCommentBtn odd={odd} onClick={handleDelete}>
							✕
						</DeleteCommentBtn>
					)}
				</CommentHead>
				<CommentBody>
					<span>{comment.commentcontent}</span>
				</CommentBody>
				<ButtonRow>
					{!!childThread?.length && (
						<ShowRepliesButton
							onClick={() => setExpanded(!expanded)}
						>
							<i
								style={{ fontSize: '13px', marginRight: '5px' }}
								className="fas fa-comment-alt"
							/>
							{!expanded ? 'Show' : 'Hide'}
						</ShowRepliesButton>
					)}
					<ReplyRow full={!!childThread?.length}>
						{comment.u_id && (
							<Reply
								commentThread={childThread}
								expandChildThread={setExpanded}
								setCommentThread={setChildThread}
								childThreadId={comment.childthread}
								OPAuthorId={comment.u_id}
							/>
						)}
					</ReplyRow>
				</ButtonRow>
				{expanded && childThread && (
					<ChildComments>
						<CommentFeed
							commentThread={child.childthread}
							comments={childThread}
							allComments={allComments}
							focusList={focusList}
							page={2}
							odd={!odd}
						/>
					</ChildComments>
				)}
			</ParentComment>
		);
	else {
		return <Fragment />;
	}
};

export default CommentCard;
