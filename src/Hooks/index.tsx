import React, {
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { makeRequest } from '../Api';
import { CurrentNavContext } from '../Context/CurrentNavContext';
import { ChatContext } from '../Context/ChatContext';
import { ErrorContext } from '../Context/ErrorContext';
import { NotificationContext } from '../Context/NotificationContext';
import { getLocal } from '../Utils';
import socketIOClient from 'socket.io-client';
import { Notification } from '../Types';
import { SocketType } from '../Types';

export const useNav = (current: string) => {
	const { update } = useContext(CurrentNavContext);
	useEffect(() => {
		update(current);
	}, [current]);
};

export const useNotifications = (room: string) => {
	const { state: notifications, update: setNotifications } = useContext(
		NotificationContext,
	);
	const { state: currentChat } = useContext(ChatContext);
	const [connected, setConnected] = useState(false);
	const [newNotif, setNewNotif] = useState<Notification>();
	const [socket, setSocket] = useState<SocketType>();
	useEffect(() => {
		let user = getLocal('token');
		if (!user) {
			localStorage.clear();
			window.location.replace('/login');
		}
		let socket: SocketType = socketIOClient('http://localhost:5010', {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: 'Bearer ' + user.token,
						Room: room,
					},
				},
			},
		});
		socket.on('connect', () => {
			setConnected(true);
		});
		socket.on('notification', (notification: Notification) => {
			setNewNotif(notification);
		});
		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, [room]);

	// not sure why i cant call appendNotification() inside on notification...
	useEffect(() => {
		newNotif && appendNotification(newNotif);
	}, [JSON.stringify(newNotif)]);

	const appendNotification = (notif: Notification) => {
		if (Number(notif.link) !== currentChat)
			setNotifications([notif, ...notifications]);
		console.log(notif, notifications);
	};

	return [notifications, connected];
};

export const useDismiss = (
	refInside: RefObject<HTMLDivElement | null>,
	close: () => void,
) => {
	const handleEsc = (e: KeyboardEvent) => {
		if (e.key !== 'Escape') return;
		else {
			e.preventDefault();
			// esc by default stops the page from refreshing,
			// this is not a problem but causes a small delay when pressing.
			// default prevented for performance
			close();
		}
	};
	const handleClick = (e: MouseEvent) => {
		let target = e.target as HTMLDivElement;
		if (refInside?.current?.contains(target)) return;
		else close();
	};
	useEffect(() => {
		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);
};

export function useRequest<F>(
	url: string,
	method: string,
	body = {},
	conditional = true,
) {
	const [data, setData] = useState<F>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { update: setError } = useContext(ErrorContext);
	let resp;
	useEffect(() => {
		async function request() {
			try {
				setIsLoading(true);
				resp = await makeRequest(url, method, body);
				setData(resp.data);
			} catch (e) {
				if (!e.response) {
					window.location.replace('/505');
				} else if (e.response.status === 401) {
					localStorage.clear();
					window.location.replace('/login');
				} else {
					setError(e.response.status.toString());
				}
			} finally {
				setIsLoading(false);
			}
		}
		if (conditional) request();
	}, [url, method]);
	return [data, setData, isLoading] as const;
}
