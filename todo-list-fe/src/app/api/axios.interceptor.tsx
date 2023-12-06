import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001/api',
	timeout: 3 * 1000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
		'Access-Control-Allow-Methods': '*',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		if (
			config.url!.indexOf('/auth/signup') >= 0 ||
			config.url!.indexOf('/auth/signin') >= 0 ||
			config.url!.indexOf('/auth/refresh') >= 0
		) {
			return config;
		}

		const accessToken = localStorage.getItem('Authorization') || '';
		if (accessToken) {
			config.headers['Authorization'] = 'Bearer ' + accessToken;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	async (response: any) => {
		return response;
	},
	async (error) => {
		if (error) {
			const refreshToken = localStorage.getItem('RefreshToken') ?? '';
			const accessToken = localStorage.getItem('AccessToken') ?? '';
			const email = localStorage.getItem('email') ?? '';

			if (!accessToken && !refreshToken && !email) {
				window.localStorage.clear();
				window.location.href = '/auth/login';
			}

			const originalRequest = error.config;
			const response = error.response.data;

			if (
				response.statusCode === 401 &&
				response.message === 'jwt expired'
			) {
				try {
					console.log('::: Token expired');

					const refreshTokenLocal: string =
						localStorage.getItem('RefreshToken') || '';

					const result = await axiosGet('/auth/refresh', {
						Authorization: 'Bearer ' + refreshTokenLocal,
					});

					const {
						tokens: { accessToken, refreshToken },
					} = result;

					console.log('::: Đã làm mới access token thành công');
					localStorage.setItem('Authorization', accessToken);
					localStorage.setItem('RefreshToken', refreshToken);

					originalRequest.headers[
						'Authorization'
					] = `Bearer ${accessToken}`;

					return axios(originalRequest);
				} catch (error) {
					console.log(error);
				}
			}
		}

		return Promise.reject(error);
	},
);

export async function axiosGet(url: string, headers = {}) {
	return (
		await axiosInstance.get(url, {
			headers,
		})
	).data;
}

export async function axiosPatch(url: string, payload = {}) {
	return (await axiosInstance.patch(url, payload)).data;
}

export async function axiosPost(url: string, payload = {}) {
	return (await axiosInstance.post(url, payload)).data;
}

export async function axiosDelete(url: string, payload = {}) {
	return (await axiosInstance.delete(url, payload)).data;
}

export default axiosInstance;
