import {IUser} from "../../types/IUser.types";


export interface AuthResponseModel {
    user: IUser;
    token: string;
}
