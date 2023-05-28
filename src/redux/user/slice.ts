import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types';
import { User, UserSliceState } from './types';
import { fetchUsers } from './asyncActions';

const initialState: UserSliceState = {
	items: [],
	status: Status.LOADING,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<User[]>) {
			state.items = action.payload;
			state.items = [];
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchUsers.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchUsers.rejected, (state) => {
			state.items = [];
			state.status = Status.ERROR;
		});
	},
});

export const { setItems } = userSlice.actions;
export default userSlice.reducer;
