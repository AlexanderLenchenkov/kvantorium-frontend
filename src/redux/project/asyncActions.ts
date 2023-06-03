import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

import { Project, SearchProjectParams } from './types';

export const fetchProjects = createAsyncThunk<Project[], SearchProjectParams>(
	'project/fetchProjects',
	async (params) => {
		const { name, category } = params;
		const { data } = await axios.get<Project[]>(`/projects?${name}${category}`);
		return data;
	},
);

export const fetchRemoveProject = createAsyncThunk(
	'project/fetchRemoveProject',
	async (id: string) => {
		axios.delete(`/projects/${id}`);
	},
);
