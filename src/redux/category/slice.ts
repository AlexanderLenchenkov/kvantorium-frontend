import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../types';
import { fetchCategories } from './asyncActions';
import { CategorySliceState } from './types';

const initialState: CategorySliceState = {
	items: [],
	status: Status.LOADING,
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchCategories.pending, (state) => {
			state.status = Status.LOADING;
		});
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchCategories.rejected, (state) => {
			state.items = [];
			state.status = Status.ERROR;
		});
	},
});

// export const { setItems } = categorySlice.actions;
export default categorySlice.reducer;
