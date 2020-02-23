import React, { Fragment, useState } from 'react';
import { useRequest } from '../../../../Hooks';
import { CommentType } from '../../../MainPageRoutes/Forum/Types';
import Comment from '../Comment';
import { FocusList } from '../../../../Types';
import { MoreButton } from './Styles';
import { RowDiv } from '../../../../Styles/LayoutStyles';
import PlusIcon from '../../../../Assets/Plus.png';
type CommentFeedProps = {
	commentThread: number;
	page: number;
	focusList: FocusList;
	comments: CommentType[];
	odd?: boolean;
};

const CommentFeed: React.FC<CommentFeedProps> = ({
	comments,
	commentThread,
	page,
	focusList,
	odd = true,
}) => {
	const [nextComments, setNextComments, isLoading] = useRequest<
		CommentType[]
	>(
		`blogs/commentthread/${commentThread}?page=${page}`,
		'get',
		{},
		comments.length >= 10,
	);
	const [showNext, setShowNext] = useState(false);
	const renderComments = (comment = comments, isExpanded = true) => {
		if (comment) {
			return comment.map((child: CommentType) => {
				return (
					<Comment
						key={child.c_id}
						odd={odd}
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
			{showNext && nextComments && (
				<CommentFeed
					comments={nextComments}
					commentThread={commentThread}
					page={page + 1}
					odd={odd}
					focusList={focusList}
				/>
			)}
			{!showNext && comments && comments?.length >= 10 && (
				<RowDiv>
					<MoreButton
						src={PlusIcon}
						alt={'more comments'}
						onClick={() => setShowNext(true)}
					/>
				</RowDiv>
			)}
		</Fragment>
	);
};

export default CommentFeed;
