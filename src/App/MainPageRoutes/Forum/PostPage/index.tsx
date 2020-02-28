import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	PostComments,
	PostContent,
	PostHead,
	PostTitle,
	PostDate,
	PostDescription,
} from './Styles';
import { RouteComponentProps } from '../../../../Types';
import { useDismiss, useRequest } from '../../../../Hooks';
import { withRouter } from 'react-router-dom';
import { PostType } from '../Types';
import ViewPost from '../../../Components/CommentThread';
import TextEditor from '../../../Components/TextEditor';
import { formatDate } from '../../../../Utils';
import Modal from '../../../Components/Modal';

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

	const handleDescriptionChange = (e: string) => {
		post && setPost({ ...post, content: e });
	};

	useDismiss(inside, close);

	return ReactDOM.createPortal(
		<Modal inside={inside}>
			<PostHead>
				<PostTitle>{post?.title}</PostTitle>
				<PostDate>{formatDate(post?.published_date)}</PostDate>
			</PostHead>
			<PostContent>
				<PostDescription>
					<TextEditor
						editable={!post?.owner}
						state={post?.content}
						setState={handleDescriptionChange}
					/>
				</PostDescription>
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
