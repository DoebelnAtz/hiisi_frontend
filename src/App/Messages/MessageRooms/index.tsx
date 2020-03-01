import React, { useContext, useState, Fragment } from 'react';
import {
	ThreadItem,
	CreateThreadRow,
	NotificationIcon,
	DeleteButton,
} from './Styles';
import { makeRequest } from '../../../Api';
import { RouteComponentProps, withRouter } from 'react-router';
import { ThreadType } from '../Types';
import InputWithButton from '../../Components/Buttons/InputWithButton';
import { useRequest } from '../../../Hooks';
import { NotificationContext } from '../../../Context/NotificationContext';
import { ChatContext } from '../../../Context/ChatContext';
import DeleteImg from '../../../Assets/x.png';
type MessageRoomProps = {
	close?: () => void;
};

const MessageRoomList: React.FC<RouteComponentProps & MessageRoomProps> = ({
	history,
}) => {
	const [inputVal, setInputVal] = useState('');
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
	const { state: notifications, update: setNotifications } = useContext(
		NotificationContext,
	);

	const [threads, setThreads, isLoading] = useRequest<ThreadType[]>(
		'messages/threads',
		'get',
	);

	const createThread = async () => {
		let resp = await makeRequest('messages/threads/create_thread', 'post', {
			threadName: inputVal,
		});
		threads && setThreads([...threads, resp.data]);
		setInputVal('');
	};

	const handleChatClick = (thread: ThreadType) => {
		setCurrentChat(thread.thread_id);
		setNotifications(
			notifications.filter(
				(notif) => Number(notif.link) !== thread.thread_id,
			),
		);
	};

	const handleDelete = async (targetId: number, e: React.SyntheticEvent) => {
		e.stopPropagation();
		let resp = await makeRequest(
			'messages/threads/delete_thread',
			'delete',
			{
				targetId: targetId,
			},
		);
		if (resp.data) {
			setThreads(
				threads?.filter((thread) => thread.thread_id !== targetId),
			);
		}
	};

	const renderFriends = () => {
		if (threads)
			return threads.map((thread: ThreadType) => {
				return (
					<ThreadItem
						className={'row message_thread_item'}
						key={thread.thread_id}
						onClick={() => handleChatClick(thread)}
					>
						<span>{thread.thread_name}</span>
						{!!notifications.find(
							(notif) => Number(notif.link) === thread.thread_id,
						) && <NotificationIcon />}
						{!thread.project_thread && (
							<DeleteButton
								onClick={(e: React.SyntheticEvent) =>
									handleDelete(thread.thread_id, e)
								}
							>
								<img src={DeleteImg} alt={'delete thread'} />
							</DeleteButton>
						)}
					</ThreadItem>
				);
			});
	};

	return (
		<Fragment>
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
		</Fragment>
	);
};

export default withRouter(MessageRoomList);
