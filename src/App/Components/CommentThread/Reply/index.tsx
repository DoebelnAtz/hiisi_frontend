import React, {
	Dispatch,
	Fragment,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { makeRequest } from '../../../../Api';
import { CommentType } from '../../../MainPageRoutes/Forum/Types';

import {
	CommentInput,
	ReplyRow,
	CancelButton,
	SendButton,
	ReplyBtn,
} from './Styles';
import { useSpring } from 'react-spring';

type ReplyProps = {
	commentThread: CommentType[] | undefined;
	expandChildThread?: Dispatch<SetStateAction<boolean>>;
	setCommentThread: Dispatch<SetStateAction<CommentType[] | undefined>>;
	childThreadId: number;
	OPAuthorId: number;
};

const ReplyButton: React.FC<ReplyProps> = ({
	commentThread,
	expandChildThread,
	setCommentThread,
	childThreadId,
	OPAuthorId,
}) => {
	const [commentText, setCommentText] = useState('');
	const [opened, setOpened] = useState(false);
	const expandReply = useSpring({ width: opened ? '0%' : '100%' });
	const location = useLocation();
	const inputRef = useRef<HTMLInputElement>(null);

	const submitPost = async () => {
		if (commentText.length > 0) {
			let resp = await makeRequest('blogs/create_comment', 'post', {
				content: commentText,
				threadId: childThreadId,
				originLink: location.pathname,
				OPAuthorId: OPAuthorId,
			});
			if (resp.data) {
				setCommentText('');
				!!commentThread &&
					setCommentThread([...commentThread, resp.data]);
			}
		}
		expandChildThread && expandChildThread(true);
		setOpened(false);
	};
	useEffect(() => {
		inputRef.current && inputRef.current.focus();
	}, [opened]);

	if (!opened) {
		return (
			<ReplyBtn
				onClick={() => {
					setOpened(true);
				}}
			>
				Reply
			</ReplyBtn>
		);
	} else {
		return (
			<ReplyRow>
				<CancelButton
					onClick={() => {
						setOpened(false);
					}}
				>
					Cancel
				</CancelButton>
				<CommentInput
					style={expandReply}
					value={commentText}
					ref={inputRef}
					onChange={(e: React.SyntheticEvent) => {
						let target = e.target as HTMLInputElement;
						setCommentText(target.value);
					}}
					onKeyDown={(e: KeyboardEvent) => {
						if (e.key === 'Enter') submitPost();
					}}
				/>

				<SendButton onClick={() => submitPost()}>Send</SendButton>
			</ReplyRow>
		);
	}
};

export default ReplyButton;
