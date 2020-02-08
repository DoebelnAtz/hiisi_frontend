import React, { useState } from 'react';

import ViewPost from './ViewPost';
import PostMainContent from './PostMainContent';
import { PostProps } from '../Types';
import { BlogPost } from './Styles';

const Post: React.FC<PostProps> = ({ content }) => {
	//  TODO: refactor the code for this component, too many child components.

	const [expanded, setExpanded] = useState(false);

	return (
		<BlogPost>
			<PostMainContent
				expand={() => setExpanded(!expanded)}
				content={content}
			/>
			{expanded && (
				<ViewPost
					focusList={{ focus: [content.username], title: 'author' }}
					commentthread={content.commentthread}
				/>
			)}
		</BlogPost>
	);
};

export default Post;
