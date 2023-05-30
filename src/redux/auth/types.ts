import { Status } from '../types';
import { User } from '../user/types';

export type AuthParams = {
	login: string;
	password: string;
};

export interface AuthSliceState {
	data: User | null;
	status: Status;
}
