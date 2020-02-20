import React, { useContext, Fragment } from 'react';
import { ChatContext } from '../../../Context/ChatContext';
import MessageRoomList from '../MessageRooms';
import MessageRoom from '../MessageRoom/index';
import { ChatWindowDiv } from './Styles';
const ChatWindow = () => {
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
	const handleChatState = () => {
		switch (currentChat) {
			case 0:
				return <MessageRoomList />;
			default:
				return <MessageRoom tid={currentChat} />;
		}
	};

	return <ChatWindowDiv>{handleChatState()}</ChatWindowDiv>;
};

export default ChatWindow;
