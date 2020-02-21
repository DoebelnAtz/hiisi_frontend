import React, { Fragment, useState } from 'react';
import { useNav, useRequest } from '../../../Hooks';
import { getLocal } from '../../../utils/utils';
import { Notification } from '../../../Types';
import NotificationList from './NotificationList';
import { NotificationIcon } from './Styles';

const Notifications: React.FC = () => {
	const [expandNotifications, setExpandNotifications] = useState(false);
	const [notifications, setNotifications, isLoading] = useRequest<
		Notification[]
	>(`notifications/users/${getLocal('token').user.u_id}`, 'get');

	return (
		<Fragment>
			<NotificationIcon
				onClick={() => setExpandNotifications(!expandNotifications)}
			>
				{expandNotifications && notifications && (
					<NotificationList notifications={notifications} />
				)}
			</NotificationIcon>
		</Fragment>
	);
};

export default Notifications;
