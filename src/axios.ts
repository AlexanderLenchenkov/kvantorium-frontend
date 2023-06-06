import axios from 'axios';

// export const mainURL = 'https://kvantorium-backend.onrender.com';
export const mainURL = 'http://localhost:4444';

const instance = axios.create({
	baseURL: `${mainURL}/api`,
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = window.localStorage.getItem('token');
	return config;
});

export default instance;
