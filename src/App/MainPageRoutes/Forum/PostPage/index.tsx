import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import {
	InsideDiv,
	OutsideDiv,
	PostComments,
	PostContent,
	PostHead,
	PostTitle,
	PostDate,
} from './Styles';
import { RouteComponentProps } from '../../../../Types';
import { useDismiss, useRequest } from '../../../../Hooks';
import { withRouter } from 'react-router-dom';
import { PostType } from '../Types';
import ViewPost from '../Post/ViewPost';
import TextEditor from '../../../Components/TextEditor';
import { formatDate } from '../../../../utils/utils';

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
		<OutsideDiv>
			<InsideDiv ref={inside}>
				<PostHead>
					<PostTitle>{post?.title}</PostTitle>
					<PostDate>{formatDate(post?.published_date)}</PostDate>
				</PostHead>
				<PostContent>
					<TextEditor
						editable={true}
						state={post?.content}
						setState={handleDescriptionChange}
					/>
				</PostContent>
				<PostComments>
					{post && (
						<ViewPost
							commentthread={post?.commentthread}
							focusList={{
								focus: [post.username],
								title: 'author',
							}}
						/>
					)}
				</PostComments>
			</InsideDiv>
		</OutsideDiv>,
		document.querySelector('#modal') as Element,
	);
};

export default withRouter(FeedPostModal);
