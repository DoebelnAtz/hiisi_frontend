import axios from 'axios';
import { getLocal, setLocal } from '../Utils';


const backendUrl = process.env.NODE_ENV === 'production' ? 'https://api-dot-hiisi-297910.ew.r.appspot.com' : 'http://localhost:5000';

export const makeRequest = async (url: string, method: any, data: any = {}) => {
	let resp;

	try {
		resp = await axios({
		url: `${backendUrl}/api/${url}`,
		method: method,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer ' +
				(localStorage.getItem('token') ? getLocal('token').token : ''),
			'x-refresh-token': getLocal('token')?.refreshToken
		},
	});
	} catch (e) {
		if (!e.response) {
			//window.location.replace('/505');
		}
		else if (e.response.status === 401) {

			let refreshAttempt = await axios({
				url: `${backendUrl}/api/auth/refresh_token`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						(localStorage.getItem('token') ? getLocal('token').token : ''),
					'x-refresh-token': getLocal('token')?.refreshToken,
				},
			});
			if (refreshAttempt.data) {
				setLocal('token',
					refreshAttempt.data
				);

			}
		}
		else {
			throw e;
		}
		resp = await axios({
				url: `${backendUrl}/api/${url}`,
				method: method,
				data: data,
				headers: {
					'Content-Type': 'application/json',
					Authorization:
						'Bearer ' +
						(localStorage.getItem('token') ? getLocal('token').token : ''),
					'x-refresh-token': getLocal('token')?.refreshToken
				},
			});
	}
	return resp;
};