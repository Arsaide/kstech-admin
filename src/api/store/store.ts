import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService.ts';
import { IUser } from '../../types/IUser.types.ts';

export default class Store {
    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: IUser) {
        this.user = user;
    }

    user = {};

    async login(name: string, password: string) {
        try {
            const response = await toast.promise(
                AuthService.login(name, password),
                {
                    pending: 'Logged-in...',
                    success: 'Log-in success!',
                    error: 'Failed to log-in, please try again...',
                },
            );

            this.setUser(response.data.user);

            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async checkUser() {
        try {
            const token = localStorage.getItem('token');
            return await AuthService.checkUser(token);
        } catch (e: any) {
            throw e;
        }
    }
}
