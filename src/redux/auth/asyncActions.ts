import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { AuthParams } from './types';
import { User } from '../user/types';

export const fetchAuth = createAsyncThunk<User, AuthParams>('auth/fetchAuth', async (params) => {
	const { data } = await axios.post<User>('/admin/login', params);
	return data;
});

export const fetchAuthMe = createAsyncThunk<User>('auth/fetchAuthMe', async () => {
	const { data } = await axios.post<User>('/admin/me');
	return data;
});
