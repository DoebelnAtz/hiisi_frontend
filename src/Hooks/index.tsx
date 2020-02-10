import React, {
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from 'react';
import { makeRequest } from '../App/Api/Api';
import { CurrentNavContext } from '../Context/CurrentNavContext';
import { ErrorContext } from '../Context/ErrorContext';

export const useNav = (current: string) => {
	const { update } = useContext(CurrentNavContext);
	useEffect(() => {
		update(current);
	}, [current]);
};

export const useDismiss = (
	refInside: RefObject<HTMLDivElement | null>,
	close: () => void,
) => {
	const handleEsc = (e: KeyboardEvent) => {
		if (e.key !== 'Escape') return;
		else close();
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

export function useRequest<F>(url: string, method: string, body = {}) {
	type dataType = F;
	const [data, setData] = useState<F>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { update: setError } = useContext(ErrorContext); // NOT sure how to type this in TS

	let resp;
	useEffect(() => {
		async function request() {
			try {
				setIsLoading(true);
				resp = await makeRequest(url, method, body);
				setData(resp.data);
			} catch (e) {
				if (e.response.status === 401) {
					localStorage.clear();
					window.location.replace('/login')
				}
				setError(JSON.stringify(e.response.status));
			} finally {
				setIsLoading(false);
			}
		}
		request();
	}, [url, method]);
	return [data, setData, isLoading] as const;
}
