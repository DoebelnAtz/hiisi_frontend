import React, { Dispatch, SetStateAction, useContext } from 'react';
import { ChatContext } from '../../../Context/ChatContext';
import { ChatWindowDiv } from './Styles';
import MessageRoomList from '../MessageRooms';
import MessageRoom from '../MessageRoom/index';
import AddUserToRoom from '../AddUserToRoom';

type ChatWindowProps = {
	setExpandRoomList: Dispatch<SetStateAction<boolean>>;
};

const ChatWindow: React.FC<ChatWindowProps> = ({ setExpandRoomList }) => {
	const { state: currentChat } = useContext(
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
					return (
						<MessageRoom
							setExpandRoomList={setExpandRoomList}
							tid={currentChat}
						/>
					);
				}
		}
	};

	return <ChatWindowDiv>{handleChatState()}</ChatWindowDiv>;
};

export default ChatWindow;
