import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { AuthParams } from './types';

export const fetchAuth = createAsyncThunk<string, AuthParams>('auth/fetchAuth', async (params) => {
	const { data } = await axios.post<string>('/admin/login', params);
	return data;
});

export const fetchAuthMe = createAsyncThunk<string>('auth/fetchAuthMe', async () => {
	const { data } = await axios.post<string>('/admin/me');
	return data;
});
