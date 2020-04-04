import React, { Dispatch, SetStateAction, useContext, useRef } from 'react';
import { Notification } from '../../../../Types';
import {
	NotificationListDiv,
	NotificationItem,
	NotificationListDropDown,
} from './Styles';
import { ChatContext } from '../../../../Context/ChatContext';
import { useHistory } from 'react-router-dom';
import {  useRequest } from '../../../../Hooks';
import { getLocal, formatDate } from '../../../../Utils';
type NotificationListProps = {
	notifications?: Notification[];
	setExpandNotifications: Dispatch<SetStateAction<boolean>>;
};

const NotificationList: React.FC<NotificationListProps> = ({
	setExpandNotifications,
}) => {
	const history = useHistory();
	const { update: setCurrentChat } = useContext(
		ChatContext,
	);
	const [notifications, , ] = useRequest<
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
	const inside = useRef<HTMLDivElement>(null);

	//useDismiss(inside, () => setExpandNotifications(false));
	const renderNotifications = () => {
		if (notifications)
			return notifications.map((notif: Notification, index) => {
				return (
					<NotificationItem
						onClick={() => handleNotificationClick(notif)}
						key={index}
					>
						<span> {notif.message}</span>
						<span>{formatDate(notif.date)}</span>
					</NotificationItem>
				);
			});
	};

	return (
		<NotificationListDropDown>
			<NotificationListDiv ref={inside}>
				{renderNotifications()}
			</NotificationListDiv>
		</NotificationListDropDown>
	);
};

export default NotificationList;
