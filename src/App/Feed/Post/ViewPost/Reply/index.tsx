import React, { Fragment, useState } from 'react';

import { makeRequest } from '../../../../Api/Api';
import Button from '../../../../Components/Buttons/Button';
import Input from '../../../../Components/Input';
import { ReplyProps } from '../../../Types';

import { CommentInput, ReplyRow, CancelButton, SendButton } from './Styles';
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

	const submitPost = async () => {
		if (commentText.length > 0) {
			let resp = await makeRequest('blogs/create_comment', 'post', {
				content: commentText,
				threadId: childThreadId,
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
		return (
			<Button
				customStyle={{ height: '34px' }}
				onClick={() => setOpened(true)}
			>
				Reply
			</Button>
		);
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
