import React, { Fragment, useState } from 'react';

import NotificationList from './NotificationList';
import { NotificationIcon } from './Styles';
import NotificationImg from '../../../Assets/Notif.png';
const Notifications: React.FC = () => {
	const [expandNotifications, setExpandNotifications] = useState(false);

	return (
		<NotificationIcon
			onClick={(e: React.SyntheticEvent) => {
				e.preventDefault();
				e.stopPropagation();
				setExpandNotifications(!expandNotifications);
			}}
		>
			<img src={NotificationImg} alt={'notifications'} />
			{expandNotifications && (
				<NotificationList
					setExpandNotifications={setExpandNotifications}
				/>
			)}
		</NotificationIcon>
	);
};

export default Notifications;
