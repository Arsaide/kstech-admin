import { AxiosResponse } from 'axios';
import $api from '../request';
import {AuthResponseModel} from "../models/AuthResponseModel";


export default class AuthService {
    static async login(
        name: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponseModel>> {
        return $api.post<AuthResponseModel>('/auth/login', { name, password });
    }

    static async checkUser(
        token: string | null,
    ): Promise<AxiosResponse<AuthResponseModel>> {
        return $api.get(`/auth/checkuser?token=${token}`);
    }
}
