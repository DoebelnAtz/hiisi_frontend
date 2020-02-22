import React, { useEffect, useState, Fragment } from 'react';
import Reply from '../Reply';
import { formatDate } from '../../../../../../utils/utils';
import { makeRequest } from '../../../../../../Api/Api';
import Button from '../../../../../Components/Buttons/Button';
import { useRequest } from '../../../../../../Hooks';

import {
	ParentComment,
	CommentHead,
	CommentBody,
	ChildComments,
	CommentInfo,
	ButtonRow,
	ShowRepliesButton,
	ReplyRow,
} from './Styles';
import { CommentProps, CommentType } from '../../../Types';
import { Collaborator } from '../../../../../Components/Board/Column/Task/TaskInfo/Styles';
import { useHistory } from 'react-router';

const CommentCard: React.FC<CommentProps> = ({
	odd,
	focusList,
	child,
	renderComments,
	isExpanded,
}) => {
	const history = useHistory();
	const [expanded, setExpanded] = useState(false);
	const [childThread, setChildThread, isLoading] = useRequest<CommentType[]>(
		'blogs/commentthread/' + child.childthread,
		'get',
	);
	if (isExpanded)
		return (
			<ParentComment key={child.c_id} odd={odd}>
				<CommentHead>
					<img
						src={child.profile_pic}
						alt={`${child.username} profiled pic`}
						onClick={() => history.push(`/user/${child.u_id}`)}
					/>
					<CommentInfo>
						<span>
							{child.username} | {formatDate(child.comment_date)}
							{focusList.focus.includes(child.username)
								? ' | ' + focusList.title
								: ''}
						</span>
					</CommentInfo>
				</CommentHead>
				<CommentBody>
					<span>{child.commentcontent}</span>
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
						<Reply
							commentThread={childThread}
							expandChildThread={setExpanded}
							setCommentThread={setChildThread}
							childThreadId={child.childthread}
						/>
					</ReplyRow>
				</ButtonRow>
				{!!childThread && (
					<ChildComments>
						{renderComments(!odd, childThread, expanded)}
					</ChildComments>
				)}
			</ParentComment>
		);
	else {
		return <Fragment />;
	}
};

export default CommentCard;
