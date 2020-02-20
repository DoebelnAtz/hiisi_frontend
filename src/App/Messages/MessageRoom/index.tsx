import React, { useContext, useEffect, useRef, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useNav } from '../../../Hooks';
import { makeRequest } from '../../../Api/Api';
import '../messages.css';
import { calculateTimeSince, getLocal } from '../../../utils/utils';

import socketIOClient from 'socket.io-client';
import AddToChat from '../../Components/Buttons/AddToChat';
import { NotificationContext } from '../../../Context/NotificationContext';
import { RowDiv } from '../../../Styles/LayoutStyles';
import {
	ConnectedDot,
	ConnectedUser,
	Message,
	MessageContent,
	MessageDate,
	MessageFeedDiv,
	MessageInfo,
	MessageRoomDiv,
	MessageRoomName,
	MessageImg,
	SendButton,
	GoBackButton,
	MessageNavigation,
} from './Styles';
import { ChatContext } from '../../../Context/ChatContext';
import { MessageNotification, SocketType, User } from '../../../Types';
import { MessageType, RoomType } from '../Types';

type MessageRoomPropsTypes = {
	tid: number;
};

const MessageRoom: React.FC<RouteComponentProps<{}> &
	MessageRoomPropsTypes> = ({ match, tid }) => {
	const [inputVal, setInputVal] = useState('');
	const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
	const [connected, setConnected] = useState<boolean>(false);
	const [room, setRoom] = useState<RoomType>();
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
		return () => {
			socket.disconnect();
		};
	}, [tid]);
	useEffect(() => {
		newMessage && newMessage.username && appendMessage(newMessage);
	}, [JSON.stringify(newMessage)]);

	useEffect(() => {
		getMessages(tid);
		getUsersConnected(tid);
		setNotifications(
			notifications.filter(
				(notif: MessageNotification) => notif.thread_id === tid,
			),
		);
	}, [tid]);

	const scrollToBottom = () => {
		if (scrollDown.current)
			scrollDown?.current.scrollIntoView({ behavior: 'smooth' });
	};

	const appendMessage = (message: MessageType) => {
		room && setRoom({ ...room, messages: [...room.messages, message] });
		setTimeout(() => scrollToBottom(), 10);
	};

	const getMessages = async (tid: number) => {
		let resp = await makeRequest(
			'messages/threads/' + tid.toString(),
			'GET',
		);
		setRoom(resp.data);

		scrollDown.current && scrollDown.current.scrollIntoView();
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

	const handleEnter = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			handleClick(event);
		}
	};

	const getUsersConnected = async (tid: number) => {
		let resp = await makeRequest(
			`messages/threads/${tid.toString()}/users`,
		);
		if (resp.data) {
			setConnectedUsers(resp.data);
		}
	};

	const renderMessages = () => {
		if (room && room.messages?.length) {
			return room.messages.map((message) => {
				return (
					<Message
						key={message.m_id}
						sender={
							message.username ===
							getLocal('currentUser').username
						}
					>
						<MessageInfo>
							<MessageImg
								src={
									'https://cdn.intra.42.fr/users/small_' +
									message.username +
									(message.username === 'marvin'
										? '.png'
										: '.jpg')
								}
							/>
							<MessageDate>
								{calculateTimeSince(message.time_sent)}
							</MessageDate>
						</MessageInfo>

						<MessageContent>
							<span className={'message_text'}>
								{message.message}
							</span>
						</MessageContent>
					</Message>
				);
			});
		}
	};
	const renderConnectedUsers = () => {
		// TODO: the status dot only shows the logged in user as active; fix
		return connectedUsers.map((user: User) => {
			return (
				<ConnectedUser key={user.u_id}>
					<img src={user.profile_pic} />
					<ConnectedDot
						active={
							user.username === getLocal('token').user.username
						}
					/>
				</ConnectedUser>
			);
		});
	};

	return (
		<MessageRoomDiv>
			<MessageNavigation>
				<GoBackButton onClick={() => setCurrentChat(0)}>
					Back
				</GoBackButton>
			</MessageNavigation>
			<RowDiv>{renderConnectedUsers()}</RowDiv>
			<RowDiv className={'row_div '}>
				<AddToChat tid={tid} />
			</RowDiv>
			<MessageRoomName>{room?.title}</MessageRoomName>
			<MessageFeedDiv>
				{renderMessages()}
				<div ref={scrollDown}> </div>
			</MessageFeedDiv>
			<textarea
				id={'chat_input'}
				onKeyDown={(e) => handleEnter(e)}
				value={inputVal}
				onChange={(e) => setInputVal(e.target.value)}
			/>
			<SendButton onClick={(e: React.SyntheticEvent) => handleClick(e)}>
				{connected ? 'send' : 'loading'}
			</SendButton>
		</MessageRoomDiv>
	);
};

export default withRouter(MessageRoom);
