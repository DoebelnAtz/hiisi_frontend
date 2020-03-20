import React, {
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { makeRequest } from '../Api';
import { CurrentNavContext } from '../Context/CurrentNavContext';
import { ChatContext } from '../Context/ChatContext';
import { ErrorContext } from '../Context/ErrorContext';
import { NotificationContext } from '../Context/NotificationContext';
import { getLocal } from '../Utils';
import socketIOClient from 'socket.io-client';
import { Notification } from '../Types';
import { SocketType } from '../Types';
import { WidthContext } from '../Context/WidthContext';

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
	const history = useHistory();
	useEffect(() => {
		let user = getLocal('token');
		if (!user) {
			localStorage.clear();
			window.location.replace(`/login?next=${history.location.pathname}`);
		}
		let socket: SocketType = socketIOClient('https://hivemind-42.com', {
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
	};

	return [notifications, connected];
};

export const useWidth = () => {
	const { state: width, update: setWidth } = useContext(WidthContext);
	//const [width, setWidth] = useState(window.innerWidth);
	const handleResize = (e: UIEvent) => {
		let target = e.target as Window;
		setWidth(target.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
	// return value for width and a boolean for convenient isMobile check
	return [width, width <= 600];
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
	const resp = useRef<any>(null);
	const history = useHistory();
	useEffect(() => {
		async function request() {
			try {
				setIsLoading(true);
				resp.current = await makeRequest(url, method, body);
				setData(resp.current.data);
			} catch (e) {
				if (!e.response) {
					//window.location.replace('/505');
				} else if (e.response.status === 401) {
					localStorage.clear();
					console.log('unauth');
					history.push(`/login?next=${history.location.pathname}`);
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
