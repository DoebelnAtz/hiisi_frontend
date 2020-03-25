import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';

import Reply from './Reply';
import { useRequest } from '../../../Hooks';
import { CommentSection, Comments, ReplyToThread } from './Styles';
import { CommentType } from '../../MainPageRoutes/Forum/Types';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { ShowAllCommentsButton } from './Styles';
import { FocusList } from '../../../Types';
import CommentFeed from './CommentFeed';
import { ReplyRow, ShowRepliesButton } from './Comment/Styles';
import { RowDiv } from '../../../Styles/LayoutStyles';

type CommentThread = {
	commentthread: number;
	focusList: FocusList;
	OPAuthorId: number;
	expand?: boolean;
};

const ShowComments: React.FC<CommentThread> = ({
	commentthread,
	focusList,
	OPAuthorId,
	expand = true,
}) => {
	const location = useLocation();
	const history = useHistory();
	const [expanded, setExpanded] = useState(expand);
	const [commentThread, setCommentThread] = useState(
		queryString.parse(location.search)?.comment
			? Number(queryString.parse(location.search)?.comment)
			: commentthread,
	);
	const [comments, setComments, isLoading] = useRequest<CommentType[]>(
		`blogs/commentthread/${commentThread}?page=1`,
		'get',
	);

	return (
		<CommentSection>
			{commentthread !== commentThread && (
				<ShowAllCommentsButton
					onClick={() => {
						history.push(`${location.pathname}`);
						setCommentThread(commentthread);
						setExpanded(true);
					}}
				>
					All comments
				</ShowAllCommentsButton>
			)}
			<RowDiv>
				{!Number(queryString.parse(location.search)?.comment) &&
					!!comments?.length && (
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
				<ReplyRow full={!!comments?.length}>

						<Reply
							commentThread={comments}
							expandChildThread={setExpanded}
							setCommentThread={setComments as Dispatch<SetStateAction<CommentType[]>>}
							childThreadId={commentthread}
							OPAuthorId={OPAuthorId}
						/>

				</ReplyRow>
			</RowDiv>
			<Comments>
				{(!!Number(queryString.parse(location.search)?.comment) ||
					expanded) &&
					comments && (
						<CommentFeed
							comments={comments?.filter(comment => comment.parentthread === commentThread)}
							allComments={comments}
							commentThread={commentThread}
							page={2}
							focusList={focusList}
						/>
					)}
			</Comments>
		</CommentSection>
	);
};

export default ShowComments;
