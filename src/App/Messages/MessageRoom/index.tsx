import React, { useContext, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useDismiss, useNav, useRequest } from '../../../Hooks';
import { getLocal } from '../../../Utils';

import socketIOClient from 'socket.io-client';
import { NotificationContext } from '../../../Context/NotificationContext';
import {
	ConnectedDot,
	ConnectedUser,
	MessageFeedDiv,
	MessageRoomDiv,
	MessageRoomName,
	SendButton,
	GoBackButton,
	MessageNavigation,
	MessageInputTextArea,
	MessageInputSend,
	AddUserToChatBtn,
	ChatRoomUsers,
} from './Styles';
import { ChatContext } from '../../../Context/ChatContext';
import { SocketType, User } from '../../../Types';
import { MessageType, RoomType } from '../Types';
import MessageFeed from './MessageFeed';

type MessageRoomPropsTypes = {
	tid: number;
};

const MessageRoom: React.FC<RouteComponentProps<{}> &
	MessageRoomPropsTypes> = ({ match, tid }) => {
	const [inputVal, setInputVal] = useState('');
	const [connectedUsers, ,] = useRequest<User[]>(
		`messages/threads/${tid.toString()}/users`,
		`GET`,
	);
	const [connected, setConnected] = useState<boolean>(false);
	const [page, setPage] = useState(1);
	const [room, setRoom, isLoading] = useRequest<RoomType>(
		`messages/threads/${tid.toString()}?page=${page}`,
		'GET',
	);
	const [newMessage, setNewMessage] = useState<MessageType>();
	const [activeUsers, setActiveUsers] = useState<string[]>([]);
	const [socket, setSocket] = useState<SocketType>();
	const { state: notifications, update: setNotifications } = useContext(
		NotificationContext,
	);
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);

	let scrollDown = useRef<HTMLDivElement>(null);
	let inside = useRef<HTMLDivElement>(null);

	useDismiss(inside, () => setCurrentChat(0));

	useNav('messages');
	useEffect(() => {
		let user = getLocal('token');
		let socket = socketIOClient('http://localhost:5010', {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: 'Bearer ' + user.token,
						Room: 'Chat-room: ' + tid.toString(),
					},
				},
			},
		});
		socket.on('connect', () => {
			setConnected(true);
		});
		socket.on('joined-room', (user: User) => {
			setActiveUsers([...activeUsers, user.username]);
		});
		socket.on('left-room', (user: string) => {});

		socket.on('chat-message', (message: MessageType) => {
			setNewMessage(message);
		});
		setSocket(socket);
		scrollDown.current && scrollDown.current.scrollIntoView();
		return () => {
			socket.disconnect();
		};
	}, [room]);

	useEffect(() => {
		newMessage && newMessage.username && appendMessage(newMessage);
	}, [JSON.stringify(newMessage)]);

	const scrollToBottom = () => {
		if (scrollDown.current)
			scrollDown?.current.scrollIntoView({ behavior: 'smooth' });
	};

	const appendMessage = (message: MessageType) => {
		room && setRoom({ ...room, messages: [...room.messages, message] });
		setTimeout(() => scrollToBottom(), 10);
	};

	const handleClick = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (inputVal.length && socket) {
			socket.emit('send-message', {
				message: inputVal,
				username: getLocal('currentUser').username,
				time_sent: new Date().toISOString(),
				t_id: tid,
			});
		}
		setInputVal('');
	};

	const handleKeyDown = async (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			await handleClick(e);
		} else {
			let target = e.target as HTMLTextAreaElement;
			target.style.height = 'inherit';
			target.style.height = `${target.scrollHeight}px`;
			target.style.height = `${Math.min(target.scrollHeight, 100)}px`;
		}
	};

	const renderConnectedUsers = () => {
		if (connectedUsers)
			return connectedUsers.map((user: User) => {
				return (
					<ConnectedUser key={user.u_id}>
						<img src={user.profile_pic} />
						<ConnectedDot
							active={
								user.username ===
								getLocal('token').user.username
							}
						/>
					</ConnectedUser>
				);
			});
	};

	return (
		<MessageRoomDiv ref={inside}>
			<MessageNavigation>
				<GoBackButton onClick={() => setCurrentChat(0)}>
					Back
				</GoBackButton>
				<AddUserToChatBtn onClick={() => setCurrentChat(-currentChat)}>
					Add user
				</AddUserToChatBtn>
			</MessageNavigation>
			<ChatRoomUsers>{renderConnectedUsers()}</ChatRoomUsers>
			<MessageRoomName>{room?.title}</MessageRoomName>
			<MessageFeedDiv>
				{room && (
					<MessageFeed messages={room?.messages} page={2} tid={tid} />
				)}
				<div ref={scrollDown}> </div>
			</MessageFeedDiv>
			<MessageInputSend>
				<MessageInputTextArea
					onKeyDown={(e: React.KeyboardEvent<Element>) =>
						handleKeyDown(e)
					}
					value={inputVal}
					onChange={(e: { target: { value: string } }) =>
						setInputVal(e.target.value)
					}
				/>
				<SendButton
					onClick={(e: React.SyntheticEvent) => handleClick(e)}
				>
					{connected ? 'send' : 'loading'}
				</SendButton>
			</MessageInputSend>
		</MessageRoomDiv>
	);
};

export default withRouter(MessageRoom);
