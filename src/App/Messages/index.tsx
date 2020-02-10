import React, { useState, Fragment, useRef } from 'react';
import ReactDOM from 'react-dom';

import { MessageModal } from './Style';
import MessageRoomList from './MessageRooms';
import { useDismiss } from '../../Hooks';

const MessageRoomModal: React.FC = () => {
	const [expandRoomList, setExpandRoomList] = useState<boolean>(false);
	const inside = useRef<HTMLDivElement>(null);
	useDismiss(inside, () => setExpandRoomList(false));
	return ReactDOM.createPortal(
		<div ref={inside} style={{ zIndex: 100 }}>
			{expandRoomList && <MessageRoomList />}
			<MessageModal onClick={() => setExpandRoomList(!expandRoomList)}>
				Chat
			</MessageModal>
		</div>,
		document.querySelector('#chat') as Element,
	);
};

export default MessageRoomModal;
