import { RootState } from '../store';

export const selectProjects = (state: RootState) => state.project.projects;
