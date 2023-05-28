import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Category } from './types';

export const fetchCategories = createAsyncThunk<Category[]>(
	'category/fetchCategories',
	async () => {
		const { data } = await axios.get<Category[]>('/categories');
		return data;
	},
);
