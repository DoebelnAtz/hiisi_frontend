import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '../../../../../../Api/Api';
import { ReplyProps } from '../../../Types';

import {
	CommentInput,
	ReplyRow,
	CancelButton,
	SendButton,
	ReplyBtn,
} from './Styles';
import { useSpring } from 'react-spring';

const ReplyButton: React.FC<ReplyProps> = ({
	commentThread,
	expandChildThread,
	setCommentThread,
	childThreadId,
}) => {
	const [commentText, setCommentText] = useState('');
	const [opened, setOpened] = useState(false);

	const expandReply = useSpring({ width: opened ? '0%' : '100%' });
	const location = useLocation();

	const submitPost = async () => {
		if (commentText.length > 0) {
			let resp = await makeRequest('blogs/create_comment', 'post', {
				content: commentText,
				threadId: childThreadId,
				originLink: location.pathname,
			});
			if (resp.data) {
				!!commentThread &&
					setCommentThread([...commentThread, resp.data]);
			}
		}
		expandChildThread && expandChildThread(true);
		setOpened(false);
	};

	if (!opened) {
		return <ReplyBtn onClick={() => setOpened(true)}>Reply</ReplyBtn>;
	} else {
		return (
			<ReplyRow>
				<CancelButton onClick={() => setOpened(false)}>
					Cancel
				</CancelButton>

				<CommentInput
					style={expandReply}
					value={commentText}
					onChange={(e: React.SyntheticEvent) => {
						let target = e.target as HTMLInputElement;
						setCommentText(target.value);
					}}
					onEnter={(e: KeyboardEvent) => {
						if (e.key === 'Enter') submitPost();
					}}
				/>

				<SendButton onClick={() => submitPost()}>Send</SendButton>
			</ReplyRow>
		);
	}
};

export default ReplyButton;
