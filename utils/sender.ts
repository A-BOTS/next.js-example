/**
 * external libs
 */
import axios, { AxiosRequestConfig } from 'axios';

interface Config {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	url: string;
	headers: object;
	data?: string;
}

export const sender = (url: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: object): any => {
	const headers = {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json;charset=UTF-8',
		// Connection: 'keep-alive',
	};

	const config: Config = {
		method: method || 'GET',
		url: `${url}`,
		headers: headers,
	};

	if (data && Object.keys(data).length) config.data = JSON.stringify(data);

	return axios(config as AxiosRequestConfig)
		.then((response) => ({ res: 'success', data: response.data }))
		.catch((error) => ({ res: 'error', data: error?.response || { data: 'Error' } }));
};
