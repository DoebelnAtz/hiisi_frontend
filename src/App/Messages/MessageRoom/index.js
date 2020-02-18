import React, { useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useNav } from '../../../Hooks/index';
import { makeRequest } from '../../../Api/Api';
import '../messages.css';
import { calculateTimeSince, getLocal } from '../../../utils/utils';

import socketIOClient from 'socket.io-client';
import AddToChat from '../../Components/Buttons/AddToChat';
import { NotificationContext } from '../../../Context/NotificationContext';

const Messages = ({ match }) => {
	const [inputVal, setInputVal] = useState('');
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [connected, setConnected] = useState(false);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState({});
	const [activeUsers, setActiveUsers] = useState([]);
	const [socket, setSocket] = useState();
	const { state: notifications, update: setNotifications } = useContext(
		NotificationContext,
	);

	let scrollDown = useRef(null);
	let tid = match.params.tid;

	useNav('messages');
	useEffect(() => {
		let user = getLocal('token');
		let socket = socketIOClient(
			'http://localhost:5010',
			{
				transportOptions: {
					polling: {
						extraHeaders: {
							Authorization: 'Bearer ' + user.token,
							Room: 'Chat-room: ' + tid.toString(),
						},
					},
				},
			},
			match.params.tid,
		);
		socket.on('connect', () => {
			setConnected(true);
		});
		socket.on('joined-room', (user) => {
			setActiveUsers([...activeUsers, user.username]);
		});
		socket.on('left-room', (user) => {

		});
		socket.on('chat-message', (message) => {

			setNewMessage(message);
		});
		setSocket(socket);
		return () => {
			socket.disconnect();
		};
	}, [match.params.tid]);
	useEffect(() => {
		newMessage.username && appendMessage(newMessage);
	}, [JSON.stringify(newMessage)]);

	useEffect(() => {

		getMessages(tid);
		getUsersConnected(tid);
		setNotifications(
			notifications.filter(
				(notif) => notif.thread_id === match.params.tid,
			),
		);
	}, [match.params.tid]);

	// useEffect(() => {
	//     connectToRoom();
	// }, [socket?.connected]);

	const scrollToBottom = () => {
		scrollDown.current.scrollIntoView({ behavior: 'smooth' });
	};

	const appendMessage = (message) => {

		setMessages({ ...messages, messages: [...messages.messages, message] });
		setTimeout(() => scrollToBottom(), 10);
	};

	const getMessages = async (tid) => {
		let resp = await makeRequest('messages/threads/' + tid, 'GET');
		setMessages(resp.data);

		scrollDown.current.scrollIntoView();
	};

	const handleClick = async (event) => {
		event.preventDefault();
		if (inputVal.length) {
			socket.emit('send-message', {
				message: inputVal,
				username: getLocal('currentUser').username,
				time_sent: new Date().toISOString(),
				t_id: match.params.tid,
			});
		}
		setInputVal('');
	};

	const handleEnter = (event) => {
		if (event.key === 'Enter') {
			handleClick(event);
		}
	};

	const getUsersConnected = async (tid) => {
		let resp = await makeRequest('messages/threads/' + tid + '/users');
		if (resp.data) {
			setConnectedUsers(resp.data);
		}
	};

	const renderMessages = () => {
		if (messages.messages?.length) {
			return messages.messages.map((message) => {
				return (
					<div
						key={message.m_id}
						className={
							message.username ===
							getLocal('currentUser').username
								? 'sent'
								: 'received'
						}
					>
						<div className={'container-fluid'}>
							<div className={'row message_info'}>
								<img
									className={'message_img'}
									src={
										'https://cdn.intra.42.fr/users/small_' +
										message.username +
										(message.username === 'marvin'
											? '.png'
											: '.jpg')
									}
								/>
								<span className={'message_info_time'}>
									{calculateTimeSince(message.time_sent)}
								</span>
							</div>
							<div className={'row message_content'}>
								<span className={'message_text'}>
									{message.message}
								</span>
							</div>
						</div>
					</div>
				);
			});
		}
	};
	const renderConnectedUsers = () => {
		// TODO: the status dot only shows the logged in user as active; fix
		return connectedUsers.map((user) => {
			return (
				<div key={user.u_id}>
					<img
						className={'message_img'}
						src={
							'https://cdn.intra.42.fr/users/small_' +
							user.username +
							'.jpg'
						}
					/>
					<div
						className={
							'connected_' +
							(user.username ===
								getLocal('token').user.username ||
							activeUsers.includes(user.username)
								? 'active'
								: 'inactive') +
							'_dot'
						}
					/>
				</div>
			);
		});
	};

	return (
		<div className={'message_cont container p-0'}>
			<div className={'row_div '}>{renderConnectedUsers()}</div>
			<div className={'row_div '}>
				<AddToChat tid={match.params.tid} />
			</div>
			<span style={{ color: 'white' }}>{messages?.title}</span>
			<div className={'message_feed'}>
				{renderMessages()}
				<div ref={(e) => (scrollDown.current = e)}> </div>
			</div>
			<div className={''}>
				<textarea
					id={'chat_input'}
					onKeyDown={(e) => handleEnter(e)}
					value={inputVal}
					onChange={(e) => setInputVal(e.target.value)}
				/>
				<button id={'send_button'} onClick={(e) => handleClick(e)}>
					{connected ? 'send' : 'loading'}
				</button>
			</div>
		</div>
	);
};

export default withRouter(Messages);
