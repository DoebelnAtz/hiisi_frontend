import React, {
	useContext,
	useEffect,
	useRef,
	useState,
	Fragment,
} from 'react';
import { ThreadItem, CreateThreadRow, NotificationIcon } from './Styles';
import { makeRequest } from '../../../Api/Api';
import Input from '../../Components/Input';
import Button from '../../Components/Buttons/Button';
import { RouteComponentProps, withRouter } from 'react-router';
import { ThreadType } from '../Types';
import InputWithButton from '../../Components/Buttons/InputWithButton';
import { useDismiss, useRequest } from '../../../Hooks';
import { NotificationContext } from '../../../Context/NotificationContext';
import { Notification } from '../../../Types';
import { ChatContext } from '../../../Context/ChatContext';

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

	const renderFriends = () => {
		if (threads)
			return threads.map((thread: ThreadType) => {
				return (
					<ThreadItem
						className={'row message_thread_item'}
						key={thread.thread_id}
						onClick={() => setCurrentChat(thread.thread_id)}
					>
						<span>{thread.thread_name}</span>
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
