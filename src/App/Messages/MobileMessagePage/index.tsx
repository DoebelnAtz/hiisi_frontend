import React, { useContext } from 'react';
import MessageRoom from '../MessageRoom';
import { ChatContext } from '../../../Context/ChatContext';
import AddUserToRoom from '../AddUserToRoom';
import MessageRoomList from '../MessageRooms';
import { MobileMessagesPageContainer } from './Styles';

const MobileMessagePage: React.FC = () => {
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

	return (
		<MobileMessagesPageContainer>
			{handleChatState()}
		</MobileMessagesPageContainer>
	);
};

export default MobileMessagePage;
