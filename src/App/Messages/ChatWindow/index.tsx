import React, { useContext } from 'react';
import { ChatContext } from '../../../Context/ChatContext';
import { ChatWindowDiv } from './Styles';
import MessageRoomList from '../MessageRooms';
import MessageRoom from '../MessageRoom/index';
import AddUserToRoom from '../AddUserToRoom';

const ChatWindow = () => {
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
	const handleChatState = () => {
		switch (currentChat) {
			case 0:
				return <MessageRoomList />;
			default:
				if (currentChat < 0) {
					return <AddUserToRoom />;
				} else {
					return <MessageRoom tid={currentChat} />;
				}
		}
	};

	return <ChatWindowDiv>{handleChatState()}</ChatWindowDiv>;
};

export default ChatWindow;
