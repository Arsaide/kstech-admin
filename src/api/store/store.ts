import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService';
import { IUser } from '../../types/IUser.types';
import ProductsService from '../services/ProductsService';
import CategoriesService from '../services/CategoriesService';

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
            localStorage.setItem('token', response.data.token);
            return response;
        } catch (e: any) {
            throw e;
        }
    }

    async checkUser(token: string | null) {
        try {
            return await AuthService.checkUser(token);
        } catch (e: any) {
            throw e;
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            this.setUser({} as IUser);
        } catch (e: any) {
            throw e;
        }
    }

    async getProductsList(page: number) {
        try {
            return await ProductsService.getProductsList(page);
        } catch (e: any) {
            throw e;
        }
    }

    async getOneProduct(id: string | undefined) {
        try {
            return await ProductsService.getOneProduct(id);
        } catch (e: any) {
            throw e;
        }
    }

    async createProduct(
        name: string,
        images: File[],
        color: string,
        description: string,
        price: string,
        discount: string,
        inAvailability: string,
        category: string,
        subcategory: string,
        weight: string,
        height: string,
        width: string,
        long: string,
        deliveryMethod: string[],
        turningMethod: string,
        paymentMethod: string[],
    ) {
        try {
            const token = localStorage.getItem('token');

            return await toast.promise(
                ProductsService.createProduct(
                    name,
                    images,
                    color,
                    description,
                    price,
                    discount,
                    inAvailability,
                    category,
                    subcategory,
                    weight,
                    height,
                    width,
                    long,
                    deliveryMethod,
                    turningMethod,
                    paymentMethod,
                    token,
                ),
                {
                    pending: 'Створення товару...',
                    success: 'Створення усіпішне!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async editProduct(
        id: string,
        name: string,
        images: File[],
        oldImgArr: string[],
        color: string,
        description: string,
        price: string,
        discount: string,
        inAvailability: string,
        category: string,
        subcategory: string,
        weight: string,
        height: string,
        width: string,
        long: string,
        deliveryMethod: string[],
        turningMethod: string,
        paymentMethod: string[],
    ) {
        try {
            const token = localStorage.getItem('token');

            return await toast.promise(
                ProductsService.editProduct(
                    id,
                    name,
                    images,
                    oldImgArr,
                    color,
                    description,
                    price,
                    discount,
                    inAvailability,
                    category,
                    subcategory,
                    weight,
                    height,
                    width,
                    long,
                    deliveryMethod,
                    turningMethod,
                    paymentMethod,
                    token,
                ),
                {
                    pending: 'Редагування товару...',
                    success: 'Редагування виконано!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async getAllCategories() {
        try {
            return CategoriesService.getAllCategories();
        } catch (e: any) {
            throw e;
        }
    }

    async getOneCategory(id: string) {
        try {
            return toast.promise(CategoriesService.getOneCategory(id), {
                pending: 'Отримання категорії',
                success: 'Категорії отримано успішно!',
            });
        } catch (e: any) {
            throw e;
        }
    }

    async createCategory(category: string) {
        try {
            const token = localStorage.getItem('token');
            return toast.promise(
                CategoriesService.createCategory(token, category),
                {
                    pending: 'Створення категорії',
                    success: 'Категорія створена успішно!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async addSubcategory(id: string | undefined, subcategory: string) {
        try {
            return CategoriesService.addSubcategory(id, subcategory);
        } catch (e: any) {
            throw e;
        }
    }
}
