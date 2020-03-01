import React, { Fragment, useState } from 'react';

import NotificationList from './NotificationList';
import { NotificationIcon } from './Styles';
import NotificationImg from '../../../Assets/Notif.png';
const Notifications: React.FC = () => {
	const [expandNotifications, setExpandNotifications] = useState(false);

	return (
		<NotificationIcon
			onClick={() => setExpandNotifications(!expandNotifications)}
		>
			<img src={NotificationImg} alt={'notifications'} />
			{expandNotifications && <NotificationList />}
		</NotificationIcon>
	);
};

export default Notifications;
