import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { User } from './types';

export const fetchUsers = createAsyncThunk<User[]>('user/fetchUsers', async () => {
	const { data } = await axios.get<User[]>('/users');
	return data;
});
