import { Status } from '../types';

export type User = {
	_id: string;
	lastName: string;
	firstName: string;
	patronymic: string;
	isAdmin: boolean;
	token?: string;
};

export interface UserSliceState {
	items: User[];
	status: Status;
}
