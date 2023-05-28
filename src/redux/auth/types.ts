import { Status } from '../types';

export type AuthParams = {
	login: string;
	password: string;
};

export interface AuthSliceState {
	data: string | null;
	status: Status;
}
