import React, { Fragment, useState } from 'react';

import Reply from './Reply';
import Comment from './Comment';
import { useDismiss, useRequest } from '../../../Hooks';
import { CommentSection, Comments, ReplyToThread } from './Styles';
import { CommentType, ViewPostProps } from '../../MainPageRoutes/Forum/Types';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { ShowAllCommentsButton } from './Styles';

const ShowComments: React.FC<ViewPostProps> = ({
	commentthread,
	focusList,
}) => {
	const location = useLocation();
	const history = useHistory();
	const [commentThread, setCommentThread] = useState(
		queryString.parse(location.search)?.comment
			? Number(queryString.parse(location.search)?.comment)
			: commentthread,
	);
	const [comments, setComments, isLoading] = useRequest<CommentType[]>(
		`blogs/commentthread/${commentThread}`,
		'get',
	);
	const renderComments = (
		odd = true,
		comment = comments,
		isExpanded = true,
	) => {
		if (comment) {
			return comment.map((child: CommentType) => {
				return (
					<div key={child.c_id}>
						<Comment
							odd={odd}
							focusList={focusList}
							isExpanded={isExpanded}
							child={child}
							renderComments={renderComments}
						/>
					</div>
				);
			});
		} else {
			return <div>Loading...</div>;
		}
	};

	return (
		<CommentSection>
			<ReplyToThread />
			{!isLoading && (
				<Reply
					commentThread={comments}
					setCommentThread={setComments}
					childThreadId={commentthread}
				/>
			)}
			{commentthread !== commentThread && (
				<ShowAllCommentsButton
					onClick={() => {
						history.push(`${location.pathname}`);
						setCommentThread(commentthread);
					}}
				>
					All comments
				</ShowAllCommentsButton>
			)}

			<Comments>{!!comments?.length && renderComments()}</Comments>
		</CommentSection>
	);
};

export default ShowComments;
