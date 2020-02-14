import React, { useState } from 'react';

import ViewPost from './ViewPost';
import { PostProps } from '../Types';
import {
	BlogPost,
	ButtonRow,
	CommentButton,
	LikeButton,
	PostAuthor,
	PostContent,
	PostDate,
	PostHead,
	PostInfo,
	PostTitle,
	CommentSection,
} from './Styles';
import { formatDate } from '../../../utils/utils';
import { makeRequest } from '../../Api/Api';

const Post: React.FC<PostProps> = ({ content }) => {
	//  TODO: refactor the code for this component, too many child components.

	const [expanded, setExpanded] = useState<boolean>(false);

	const [likes, setLikes] = useState<number>(content.likes);

	const handleLike = async () => {
		if (!content.liked) {
			let resp = await makeRequest('blogs/like_post', 'post', {
				blogId: content.b_id,
			});
			if (resp.data.success) {
				content.liked = true;
				setLikes(likes + 1);
			}
		}
	};

	return (
		<BlogPost>
			<PostHead>
				<PostTitle>{content.title}</PostTitle>
				<PostInfo>
					<PostDate>{formatDate(content.published_date)}</PostDate>
					<PostAuthor>{content.username}</PostAuthor>
				</PostInfo>
			</PostHead>

			<PostContent>{content.content}</PostContent>
			<ButtonRow>
				<CommentButton
					onClick={() => {
						setExpanded(!expanded);
					}}
				>
					<i className="fas fa-comment-alt"> </i>
					Comments
				</CommentButton>
				<LikeButton onClick={handleLike}>
					<i
						style={
							content.liked
								? { color: 'Red' }
								: { color: 'White' }
						}
						className="fas fa-heart"
					/>
					{likes}
				</LikeButton>
			</ButtonRow>
			{expanded && (
				<CommentSection>
					<ViewPost
						focusList={{
							focus: [content.username],
							title: 'author',
						}}
						commentthread={content.commentthread}
					/>
				</CommentSection>
			)}
		</BlogPost>
	);
};

export default Post;
