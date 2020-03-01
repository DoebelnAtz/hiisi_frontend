import React, { useContext } from 'react';
import { Notification } from '../../../../Types';
import {
	NotificationListDiv,
	NotificationItem,
	NotificationListDropDown,
} from './Styles';
import { ChatContext } from '../../../../Context/ChatContext';
import { useHistory } from 'react-router-dom';
import { useRequest } from '../../../../Hooks';
import { getLocal } from '../../../../Utils';
type NotificationListProps = {
	notifications?: Notification[];
};

const NotificationList: React.FC<NotificationListProps> = () => {
	const history = useHistory();
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
	const [notifications, setNotifications, isLoading] = useRequest<
		Notification[]
	>(`notifications/users/${getLocal('token').user.u_id}`, 'get');
	const handleNotificationClick = async (notif: Notification) => {
		switch (notif.type) {
			case 'message':
				setCurrentChat(Number(notif.link));
				break;
			default:
				history.push(`${notif.link}`);
		}
	};

	const renderNotifications = () => {
		if (notifications)
			return notifications.map((notif: Notification, index) => {
				return (
					<NotificationItem
						onClick={() => handleNotificationClick(notif)}
						key={index}
					>
						{notif.message}
					</NotificationItem>
				);
			});
	};

	return (
		<NotificationListDropDown>
			<NotificationListDiv>{renderNotifications()}</NotificationListDiv>
		</NotificationListDropDown>
	);
};

export default NotificationList;
