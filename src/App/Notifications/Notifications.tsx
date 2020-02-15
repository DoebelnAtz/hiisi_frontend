import React from 'react';
import { useNav } from '../../Hooks';

const Notifications: React.FC = () => {
	useNav('notifications');

	return <div>Notifications page</div>;
};

export default Notifications;
