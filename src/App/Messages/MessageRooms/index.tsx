import React, { useEffect, useRef, useState } from 'react';
import { RoomList, ThreadItem, CreateThreadRow } from './Styles';
import { makeRequest } from '../../Api/Api';
import Input from '../../Components/Input';
import Button from '../../Components/Buttons/Button';
import { RouteComponentProps, withRouter } from 'react-router';
import { ThreadType } from '../Types';
import InputWithButton from '../../Components/Buttons/InputWithButton';
import { useDismiss } from '../../../Hooks';

type MessageRoomProps = {
	close?: () => void;
};

const MessageRoomList: React.FC<RouteComponentProps & MessageRoomProps> = ({
	history,
	close,
}) => {
	const [threads, setThreads] = useState<ThreadType[]>([]);
	const [inputVal, setInputVal] = useState('');

	const getThreads = async () => {
		let resp = await makeRequest('messages/threads');
		setThreads(resp.data);
	};

	const createThread = async () => {
		let resp = await makeRequest('messages/threads/create_thread', 'post', {
			threadName: inputVal,
		});
		setThreads([...threads, resp.data]);
		setInputVal('');
	};

	useEffect(() => {
		getThreads();
	}, []);

	const renderFriends = () => {
		return threads.map((thread) => {
			return (
				<ThreadItem
					className={'row message_thread_item'}
					key={thread.thread_id}
					onClick={() =>
						history.push('/messages/' + thread.thread_id)
					}
				>
					<span>{thread.thread_name}</span>
				</ThreadItem>
			);
		});
	};

	return (
		<RoomList>
			<CreateThreadRow>
				<InputWithButton
					value={inputVal}
					onChange={(e: React.SyntheticEvent) => {
						let target = e.target as HTMLInputElement;
						setInputVal(target.value);
					}}
					placeholder={'create thread'}
					onClick={createThread}
				>
					Create
				</InputWithButton>
			</CreateThreadRow>
			{renderFriends()}
		</RoomList>
	);
};

export default withRouter(MessageRoomList);
