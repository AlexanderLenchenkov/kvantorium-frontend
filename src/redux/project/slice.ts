import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Project, ProjectSliceState } from './types';
import { Status } from '../types';
import { fetchProjects, fetchRemoveProject } from './asyncActions';

const initialState: ProjectSliceState = {
	projects: {
		items: [],
		status: Status.LOADING,
	},
};

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Project[]>) {
			state.projects.items = action.payload;
			state.projects.items = [];
		},
	},
	extraReducers(builder) {
		// fetchProjects
		builder.addCase(fetchProjects.pending, (state) => {
			state.projects.status = Status.LOADING;
		});
		builder.addCase(fetchProjects.fulfilled, (state, action) => {
			state.projects.items = action.payload;
			state.projects.status = Status.SUCCESS;
		});
		builder.addCase(fetchProjects.rejected, (state) => {
			state.projects.items = [];
			state.projects.status = Status.ERROR;
		});

		// fetchProjects
		builder.addCase(fetchRemoveProject.pending, (state, action) => {
			state.projects.items = state.projects.items.filter(
				(obj: Project) => obj._id !== action.meta.arg,
			);
		});
	},
});

export const { setItems } = projectSlice.actions;
export default projectSlice.reducer;
