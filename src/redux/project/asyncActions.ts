import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

import { Project } from './types';

export const fetchProjects = createAsyncThunk<Project[]>('project/fetchProjects', async () => {
	const { data } = await axios.get<Project[]>('/projects');
	return data;
});

export const fetchRemoveProject = createAsyncThunk(
	'project/fetchRemoveProject',
	async (id: string) => {
		axios.delete(`/projects/${id}`);
	},
);
