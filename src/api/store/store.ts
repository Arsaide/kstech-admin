import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import AuthService from '../services/AuthService';
import { IUser } from '../../types/IUser.types';
import ProductsService from '../services/ProductsService';
import CategoriesService from '../services/CategoriesService';
import { ColorTypes } from '../../types/forms/ProductData.types';

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
                    pending: 'Вхід...',
                    success: 'Успішно вхід до адмін.панелі!',
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
            return await ProductsService.getOneProductForEdit(id);
        } catch (e: any) {
            throw e;
        }
    }

    async createProduct(
        name: string,
        images: File[],
        color: ColorTypes[],
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
        id: string | undefined,
        name: string,
        images: File[],
        oldImgArr: string[],
        colors: string[],
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
                    colors,
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

    async getOneCategory(id: string | null) {
        try {
            return toast.promise(CategoriesService.getOneCategory(id), {
                pending: 'Отримання категорії...',
                success: 'Категорії отримано успішно!',
            });
        } catch (e: any) {
            throw e;
        }
    }

    async createCategory(
        category: string,
        mainImg: File | null,
        iconImg: File | null,
    ) {
        try {
            const token = localStorage.getItem('token');
            return toast.promise(
                CategoriesService.createCategory(
                    token,
                    category,
                    mainImg,
                    iconImg,
                ),
                {
                    pending: 'Створення категорії...',
                    success: 'Категорія створена успішно!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async addSubcategory(
        id: string | undefined,
        subcategory: string,
        mainImg: File | null,
        iconImg: File | null,
    ) {
        try {
            const token = localStorage.getItem('token');
            return toast.promise(
                CategoriesService.addSubcategory(
                    token,
                    id,
                    subcategory,
                    mainImg,
                    iconImg,
                ),
                {
                    pending: 'Створення підкатегорії...',
                    success: 'Підкатегорія створена успішно!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async editCategory(
        id: string | null,
        mainImg: File | null,
        iconImg: File | null,
        newName: string | null,
    ) {
        try {
            const token = localStorage.getItem('token');
            return toast.promise(
                CategoriesService.editCategory(
                    token,
                    id,
                    mainImg,
                    iconImg,
                    newName,
                ),
                {
                    pending: 'Редагування підкатегорії...',
                    success: 'Підкатегорія створена успішно!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async editSubcategory(
        id: string | null,
        mainImg: File | null,
        iconImg: File | null,
        newName: string | null,
    ) {
        try {
            const token = localStorage.getItem('token');
            return toast.promise(
                CategoriesService.editSubcategory(
                    token,
                    id,
                    mainImg,
                    iconImg,
                    newName,
                ),
                {
                    pending: 'Редагування підкатегорії...',
                    success: 'Підкатегорія створена успішно!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }

    async deleteCategory(id: string | null) {
        try {
            const token = localStorage.getItem('token');
            return toast.promise(CategoriesService.deleteCategory(token, id), {
                pending: 'Видалення категорії...',
                success: 'Категорія видалена!',
            });
        } catch (e: any) {
            throw e;
        }
    }

    async deleteSubcategory(name: string | null) {
        try {
            const token = localStorage.getItem('token');
            return toast.promise(
                CategoriesService.deleteSubcategory(token, name),
                {
                    pending: 'Видалення підкатегорії...',
                    success: 'Підкатегорія видалена!',
                },
            );
        } catch (e: any) {
            throw e;
        }
    }
}
