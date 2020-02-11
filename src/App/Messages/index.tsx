import React, { useState, Fragment, useRef, useContext } from 'react';
import ReactDOM from 'react-dom';

import { MessageModal } from './Style';
import MessageRoomList from './MessageRooms';
import { useDismiss } from '../../Hooks';
import { MessageNotification } from '../../Types';
import { NotificationIcon } from './MessageRooms/Styles';
import { NotificationContext } from '../../Context/NotificationContext';

const MessageRoomModal: React.FC = () => {
	const [expandRoomList, setExpandRoomList] = useState<boolean>(false);
	const inside = useRef<HTMLDivElement>(null);
	const { state: notifications, update: setNotifications } = useContext(
		NotificationContext,
	);

	useDismiss(inside, () => setExpandRoomList(false));
	return ReactDOM.createPortal(
		<div ref={inside} style={{ zIndex: 100 }}>
			{expandRoomList && <MessageRoomList />}
			<MessageModal onClick={() => setExpandRoomList(!expandRoomList)}>
				Chat
				{!!notifications.length && <NotificationIcon />}
			</MessageModal>
		</div>,
		document.querySelector('#chat') as Element,
	);
};

export default MessageRoomModal;
