import axios from 'axios';
import { getLocal } from '../Utils';

export const makeRequest = async (url: string, method: any, data: any = {}) => {
	let resp;
	resp = await axios({
		url: `http://localhost:5000/api/${url}`,
		method: method,
		data: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization:
				'Bearer ' +
				(localStorage.getItem('token') ? getLocal('token').token : ''),
		},
	});
	return resp;
};
