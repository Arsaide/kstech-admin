import { IUser } from '../../types/IUser.types.ts';

export interface AuthResponseModel {
    user: IUser;
    token: string;
}
