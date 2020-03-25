import React, { Fragment, useState } from 'react';
import { CommentType } from '../../../MainPageRoutes/Forum/Types';
import Comment from '../Comment';
import { FocusList } from '../../../../Types';
import { MoreButton } from './Styles';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import PlusIcon from '../../../../Assets/Plus.png';
type CommentFeedProps = {
	commentThread: number;
	allComments: CommentType[];
	page: number;
	focusList: FocusList;
	comments: CommentType[];
	odd?: boolean;
};

const CommentFeed: React.FC<CommentFeedProps> = ({
	comments,
	commentThread,
	page,
	allComments,
	focusList,
	odd = true,
}) => {
	const [showNext, setShowNext] = useState(false);
	const renderComments = (comment = comments, isExpanded = true) => {
		if (comment) {
			return comment.map((child: CommentType) => {
				return (
					<Comment
						key={child.c_id}
						odd={odd}
						allComments={allComments}
						focusList={focusList}
						isExpanded={isExpanded}
						child={child}
						renderComments={renderComments}
					/>
				);
			});
		} else {
			return <div>Loading...</div>;
		}
	};
	return (
		<Fragment>
			{comments && renderComments()}
		</Fragment>
	);
};

export default CommentFeed;
