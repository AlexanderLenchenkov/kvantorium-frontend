import { Category } from '../category/types';
import { Status } from '../types';
import { User } from '../user/types';

export type Project = {
	_id: string;
	name: string;
	description: string;
	category: Category;
	tags: string[];
	viewsCount: number;
	dateStart: Date;
	dateEnd: Date;
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

export type SearchProjectParams = {
	name: string;
	category: string;
};

export type ProjectFields = {
	_id?: string;
	name: string;
	description: string;
	tags?: string;
	imageUrl?: string;
	category: string;
	dateStart?: Date;
	dateEnd?: Date;
	teacher: string;
	students: string[];
	projectUrl?: string;
};
