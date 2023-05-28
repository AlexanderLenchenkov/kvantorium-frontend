import { Status } from '../types';
import { User } from '../user/types';

export type Project = {
	_id: string;
	name: string;
	description: number;
	category: string;
	tags: string[];
	viewsCount: number;
	dateStart: string;
	dateEnd: string;
	imageUrl: string;
	projectUrl: string;
	teacher: User;
	students: User[];
};

export interface ProjectSliceState {
	projects: {
		items: Project[];
		status: Status;
	};
}
