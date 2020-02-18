import React, {
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { makeRequest } from '../Api/Api';
import { CurrentNavContext } from '../Context/CurrentNavContext';
import { ErrorContext } from '../Context/ErrorContext';
import { NotificationContext } from '../Context/NotificationContext';
import { getLocal } from '../utils/utils';
import socketIOClient from 'socket.io-client';
import { MessageNotification } from '../Types';
import { SocketType } from '../Types';
import { log } from 'util';

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
	const [connected, setConnected] = useState(false);
	const [newNotification, setNewNotification] = useState<
		MessageNotification
	>();
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
		socket.on('notification', (notification: MessageNotification) => {
			setNewNotification(notification);
		});
		setSocket(socket);

		return () => {
			socket.disconnect();
		};
	}, [room]);
	// We cant append to notification inside the socket event function, because it
	// creates a copy of the notification state... Probablye not the most elegant way of doing this..
	useEffect(() => {
		if (newNotification) {
			setNotifications([
				newNotification as MessageNotification,
				...notifications,
			]);
		}
	}, [JSON.stringify(newNotification)]);

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
			close();
		}
	};
	const handleClick = (e: MouseEvent) => {
		let target = e.target as HTMLDivElement;
		if (refInside?.current?.contains(target)) return;
		else close();
	};
	useEffect(() => {
		document.addEventListener('keydown', (e) => {
			handleEsc(e);
		});
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
	type dataType = F;
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
