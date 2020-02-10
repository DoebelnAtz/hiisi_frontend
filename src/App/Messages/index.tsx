import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { MessageModal } from './Style';
import MessageRoomList from './MessageRooms';

const MessageRoomModal: React.FC = () => {
	const [expandRoomList, setExpandRoomList] = useState<boolean>(true);
	return ReactDOM.createPortal(
		<Fragment>
			{expandRoomList && <MessageRoomList />}
			<MessageModal onClick={() => setExpandRoomList(!expandRoomList)}>
				Chat
			</MessageModal>
		</Fragment>,
		document.querySelector('#chat') as Element,
	);
};

export default MessageRoomModal;
