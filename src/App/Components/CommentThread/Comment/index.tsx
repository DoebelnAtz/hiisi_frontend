import React, { useState, Fragment } from 'react';
import Reply from '../Reply';
import { formatDate } from '../../../../Utils';
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
} from './Styles';
import { CommentType } from '../../../MainPageRoutes/Forum/Types';
import { useHistory } from 'react-router';
import CommentFeed from '../CommentFeed';
import { FocusList } from '../../../../Types';

export interface CommentProps {
	odd: boolean;
	focusList: FocusList;
	child: CommentType;
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
	isExpanded,
}) => {
	const history = useHistory();
	const [expanded, setExpanded] = useState(false);
	const [childThread, setChildThread, isLoading] = useRequest<CommentType[]>(
		`blogs/commentthread/${child.childthread}?page=1`,
		'get',
	);
	if (isExpanded)
		return (
			<ParentComment key={child.c_id} odd={odd}>
				<CommentHead odd={odd}>
					<img
						src={child.profile_pic}
						alt={`${child.username} profiled pic`}
						onClick={() => history.push(`/user/${child.u_id}`)}
					/>
					<CommentInfo odd={odd}>
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
							OPAuthorId={child.u_id}
						/>
					</ReplyRow>
				</ButtonRow>
				{expanded && !!childThread && (
					<ChildComments>
						<CommentFeed
							commentThread={child.childthread}
							comments={childThread}
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
