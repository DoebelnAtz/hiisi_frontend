import React from 'react';
import { Notification } from '../../../../Types';
import { NotificationListDiv, NotificationItem } from './Styles';

type NotificationListProps = {
	notifications: Notification[];
};

const NotificationList: React.FC<NotificationListProps> = ({
	notifications,
}) => {
	const renderNotifications = () => {
		if (notifications)
			return notifications.map((notif: Notification) => {
				return (
					<NotificationItem>
						{notif.type} {notif.message}
					</NotificationItem>
				);
			});
	};

	return <NotificationListDiv>{renderNotifications()}</NotificationListDiv>;
};

export default NotificationList;
