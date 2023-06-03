import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import project from './project/slice';
import auth from './auth/slice';
import user from './user/slice';
import category from './category/slice';
import filter from './filter/slice';

export const store = configureStore({
	reducer: {
		project,
		auth,
		user,
		category,
		filter,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
