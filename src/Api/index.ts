import axios from 'axios';
import { getLocal, setLocal } from '../Utils';

export const makeRequest = async (url: string, method: any, data: any = {}) => {
	let resp;
	try {
		resp = await axios({
		url: `http://localhost:5000/api/${url}`,
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
		if (e.response.status === 401) {
			console.log(e);
			let refreshAttempt = await axios({
				url: `http://localhost:5000/api/auth/refresh_token`,
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
				console.log('refreshed token')
			}
		}
		resp = await axios({
				url: `http://localhost:5000/api/${url}`,
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