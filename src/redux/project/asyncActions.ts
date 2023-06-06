import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

import { Project, ProjectFields, SearchProjectParams } from './types';

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

export const fetchAddProject = createAsyncThunk<Project, ProjectFields>(
	'project/fetchAddProject',
	async (fields) => {
		const { data } = await axios.post<Project>(`/projects`, fields);
		return data;
	},
);
