import React, {
	useState,
	Fragment,
	useRef,
	useContext,
	useEffect,
} from 'react';
import ReactDOM from 'react-dom';

import { MessageModal, MessageImg } from './Style';
import MessageRoomList from './MessageRooms';
import { useDismiss } from '../../Hooks';
import MessageIcon from '../../Assets/Messages2.png';
import { MessageNotification } from '../../Types';
import { NotificationIcon } from './MessageRooms/Styles';
import { NotificationContext } from '../../Context/NotificationContext';
import { ChatContext } from '../../Context/ChatContext';
import ChatWindow from './ChatWindow';

const MessageRoomModal: React.FC = () => {
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
	const [expandRoomList, setExpandRoomList] = useState<boolean>(
		!!currentChat,
	);

	const inside = useRef<HTMLDivElement>(null);
	const { state: notifications, update: setNotifications } = useContext(
		NotificationContext,
	);

	useDismiss(inside, () => {
		if (!currentChat) setExpandRoomList(false);
	});

	return ReactDOM.createPortal(
		<div ref={inside} style={{ zIndex: 100 }}>
			{(expandRoomList || !!currentChat) && <ChatWindow />}
			<MessageModal
				onClick={() => {
					setExpandRoomList(!expandRoomList);
					setCurrentChat(0);
				}}
			>
				<MessageImg src={MessageIcon} alt={'chat'} />
				<span>Chat</span>
				{!!notifications.length && <NotificationIcon />}
			</MessageModal>
		</div>,
		document.querySelector('#chat') as Element,
	);
};

export default MessageRoomModal;
