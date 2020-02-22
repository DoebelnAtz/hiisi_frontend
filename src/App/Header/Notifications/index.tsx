import React, { Fragment, useState } from 'react';

import NotificationList from './NotificationList';
import { NotificationIcon } from './Styles';

const Notifications: React.FC = () => {
	const [expandNotifications, setExpandNotifications] = useState(false);

	return (
		<Fragment>
			<NotificationIcon
				onClick={() => setExpandNotifications(!expandNotifications)}
			>
				{expandNotifications && <NotificationList />}
			</NotificationIcon>
		</Fragment>
	);
};

export default Notifications;
