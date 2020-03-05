import React, {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useDismiss, useRequest } from '../../../Hooks';
import { getLocal } from '../../../Utils';

import socketIOClient from 'socket.io-client';
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
	setExpandRoomList: Dispatch<SetStateAction<boolean>>;
};

const MessageRoom: React.FC<RouteComponentProps<{}> &
	MessageRoomPropsTypes> = ({ match, tid, setExpandRoomList }) => {
	const [inputVal, setInputVal] = useState('');
	const [connectedUsers, ,] = useRequest<User[]>(
		`messages/threads/${tid.toString()}/users`,
		`GET`,
	);
	const [newMessage, setNewMessage] = useState<MessageType>();
	const [connected, setConnected] = useState<boolean>(false);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const [room, setRoom] = useRequest<RoomType>(
		`messages/threads/${tid.toString()}?page=1`,
		'GET',
	);
	const [activeUsers, setActiveUsers] = useRequest<{ u_id: number }[]>(
		`users/online`,
		'GET',
	);
	const [socket, setSocket] = useState<SocketType>();

	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);

	let scrollDown = useRef<HTMLDivElement>(null);
	let inside = useRef<HTMLDivElement>(null);

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
		setSocket(socket);
		return () => {
			socket && socket.disconnect();
		};
	}, []);
	useEffect(() => {
		if (socket) {
			socket.on('connect', () => {
				setConnected(true);
			});
			socket.on('joined-room', (user: User) => {
				addUser(user);
			});
			socket.on('left-room', (user: User) => {
				console.log(`${user.username} left the room`);
			});

			socket.on('chat-message', (message: MessageType) => {
				setNewMessage(message);
			});
			inputRef.current && inputRef.current.focus();
			scrollDown.current && scrollDown.current.scrollIntoView();
		}
	}, [!!room]);

	useEffect(() => {
		if (newMessage) {
			appendMessage(newMessage);
		}
	}, [newMessage]);

	const addUser = (user: User) => {
		let currentUser = getLocal('token')?.user;
		if (
			activeUsers &&
			currentUser.username !== user.username &&
			!activeUsers.find((usr) => usr.u_id === user.u_id)
		) {
			console.log(activeUsers, user.username);
			connectedUsers &&
				setActiveUsers([
					...connectedUsers.filter(
						(usr) => !activeUsers.find((u) => u.u_id !== usr.u_id),
					),
					{ u_id: user.u_id },
				]);
			console.log(activeUsers);
		}
	};

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
				activeUsers: activeUsers || [],
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
								(activeUsers &&
									activeUsers.find(
										(usr) => usr.u_id === user.u_id,
									)) ||
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
				<GoBackButton
					onClick={() => {
						setCurrentChat(0);
						setExpandRoomList(true);
					}}
				>
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
					ref={inputRef}
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
					{socket ? 'send' : 'loading'}
				</SendButton>
			</MessageInputSend>
		</MessageRoomDiv>
	);
};

export default withRouter(MessageRoom);
