import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	PostComments,
	PostContent,
	PostHead,
	PostTitle,
	PostDate,
	PostDescription,
	PostAuthor,
	PostInfo,
} from './Styles';
import { RouteComponentProps } from '../../../../Types';
import { useDismiss, useRequest } from '../../../../Hooks';
import { withRouter } from 'react-router-dom';
import { PostType } from '../Types';
import ViewPost from '../../../Components/CommentThread';
import TextEditor from '../../../Components/TextEditor';
import { formatDate } from '../../../../Utils';
import Modal from '../../../Components/Modal';
import { makeRequest } from '../../../../Api';

const FeedPostModal: React.FC<RouteComponentProps<{ bid: number }>> = ({
	history,
	match,
}) => {
	const inside = useRef<HTMLDivElement>(null);

	const close = () => {
		history.push('/forum');
	};

	const [post, setPost, isLoading] = useRequest<PostType>(
		`blogs/${match.params.bid}`,
		'get',
	);

	const updatePost = async () => {
		if (post) {
			try {
				let resp = await makeRequest('blogs/update_blog', 'PUT', {
					content: post.content,
					title: post.title,
					blogId: post.b_id,
				});
				setPost(resp.data);
			} catch (e) {
				return false;
			}
		}
		close();
		return true;
	};

	const handleDescriptionChange = (e: string) => {
		post && setPost({ ...post, content: e });
	};

	useDismiss(inside, close);

	return ReactDOM.createPortal(
		<Modal
			saveCondition={post?.owner}
			save={updatePost}
			close={close}
			inside={inside}
		>
			<PostHead>
				<PostInfo>
					<PostTitle>
						<span>{post?.title}</span>
					</PostTitle>
					<PostDate>
						<span>{formatDate(post?.published_date)}</span>
					</PostDate>
					<PostAuthor>
						<span
							onClick={() => history.push(`/user/${post?.u_id}`)}
						>
							{post?.username}
						</span>
					</PostAuthor>
				</PostInfo>
			</PostHead>
			<PostContent>
				{post && (
					<PostDescription>
						<TextEditor
							editable={post.owner}
							state={post.content}
							setState={handleDescriptionChange}
						/>
					</PostDescription>
				)}
			</PostContent>
			<PostComments>
				{post && (
					<ViewPost
						commentthread={post?.commentthread}
						focusList={{
							focus: [post.username],
							title: 'author',
						}}
						OPAuthorId={post.u_id}
					/>
				)}
			</PostComments>
		</Modal>,
		document.querySelector('#modal') as Element,
	);
};

export default withRouter(FeedPostModal);
