import { Status } from '../types';

export type Category = {
	_id: string;
	imageUrl: string;
	name: string;
	description: string;
};

export interface CategorySliceState {
	items: Category[];
	status: Status;
}
