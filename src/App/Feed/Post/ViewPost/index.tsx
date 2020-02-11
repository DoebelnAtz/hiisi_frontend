import React, { Fragment } from 'react';

import Reply from './Reply';
import Comment from './Comment';
import { useRequest } from '../../../../Hooks';
import { CommentSection } from './Styles';
import { CommentType, ViewPostProps } from '../../Types';

const ShowComments: React.FC<ViewPostProps> = ({
	commentthread,
	focusList,
}) => {
	const [comments, setComments, isLoading] = useRequest<CommentType[]>(
		`blogs/commentthread/${commentthread}`,
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
		<Fragment>
			<CommentSection>
				{!isLoading && (
					<Reply
						commentThread={comments}
						setCommentThread={setComments}
						childThreadId={commentthread}
					/>
				)}
				{!!comments?.length && renderComments()}
			</CommentSection>
		</Fragment>
	);
};

export default ShowComments;
