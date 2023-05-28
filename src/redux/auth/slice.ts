import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types';
import { AuthSliceState } from './types';
import { fetchAuth, fetchAuthMe } from './asyncActions';

const initialState: AuthSliceState = {
	data: null,
	status: Status.LOADING,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.data = null;
		},
	},
	extraReducers(builder) {
		// fetchAuth
		builder.addCase(fetchAuth.pending, (state) => {
			state.data = null;
			state.status = Status.LOADING;
		});
		builder.addCase(fetchAuth.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchAuth.rejected, (state) => {
			state.data = null;
			state.status = Status.ERROR;
		});

		// fetchAuthMe
		builder.addCase(fetchAuthMe.pending, (state) => {
			state.data = null;
			state.status = Status.LOADING;
		});
		builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
			state.data = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchAuthMe.rejected, (state) => {
			state.data = null;
			state.status = Status.ERROR;
		});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
