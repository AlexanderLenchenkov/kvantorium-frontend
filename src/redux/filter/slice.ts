import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
	name: '',
	categoryId: 'all',
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setName(state, action: PayloadAction<string>) {
			state.name = action.payload;
		},
		setCategoryId(state, action: PayloadAction<string>) {
			state.categoryId = action.payload || 'all';
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.name = action.payload.name;
				state.categoryId = action.payload.categoryId || 'all';
			} else {
				state.categoryId = 'all';
			}
		},
	},
});

export const { setCategoryId, setName, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
