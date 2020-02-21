import React, { useContext } from 'react';
import { Notification } from '../../../../Types';
import { NotificationListDiv, NotificationItem } from './Styles';
import { ChatContext } from '../../../../Context/ChatContext';
import { useHistory } from 'react-router-dom';
type NotificationListProps = {
	notifications: Notification[];
};

const NotificationList: React.FC<NotificationListProps> = ({
	notifications,
}) => {
	const history = useHistory();
	const { state: currentChat, update: setCurrentChat } = useContext(
		ChatContext,
	);
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
					<NotificationItem key={index}>
						{notif.type} {notif.message}
					</NotificationItem>
				);
			});
	};

	return <NotificationListDiv>{renderNotifications()}</NotificationListDiv>;
};

export default NotificationList;
