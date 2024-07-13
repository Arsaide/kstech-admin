import { AxiosResponse } from 'axios';
import $api from '../request';
import {
    AllProductResponseModel,
    OneProductResponseModel,
} from '../models/ProductResponseModel';
import { ColorTypes, TurningTypes } from '../../types/forms/ProductData.types';

export default class ProductsService {
    static async getProductsList(
        page: number,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(`/products/get?page=${page}`);
    }

    static async searchProducts(
        page: number,
        query: string,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(
            `/products/search?page=${page}&query=${query}`,
        );
    }

    static async getOneProductForEdit(
        id: string | undefined,
    ): Promise<AxiosResponse<OneProductResponseModel>> {
        return $api.get(`/products/getone?id=${id}`);
    }

    static async createProduct(
        name: string,
        images: File[],
        colors: ColorTypes[],
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
        turningMethod: TurningTypes[],
        paymentMethod: string[],
        token: string | null,
    ) {
        const formData = new FormData();
        if (images && images.length > 0) {
            images.forEach(img => {
                formData.append('img[]', img);
            });
        }
        formData.append('name', name);
        if (colors && colors.length > 0) {
            colors.forEach(color => {
                formData.append('colors', color.color);
            });
        }
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('inAvailability', inAvailability);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('weight', weight);
        formData.append('height', height);
        formData.append('width', width);
        formData.append('long', long);
        if (deliveryMethod && deliveryMethod.length > 0) {
            deliveryMethod.forEach(item => {
                formData.append('deliveryMethod', item);
            });
        }
        if (paymentMethod && paymentMethod.length > 0) {
            paymentMethod.forEach(item => {
                formData.append('paymentMethod', item);
            });
        }
        if (turningMethod && turningMethod.length > 0) {
            turningMethod.forEach(item => {
                formData.append('turningMethod', item.turning);
            });
        }
        if (token) {
            formData.append('token', token);
        }
        return $api.post('/products/create', formData);
    }

    static async editProduct(
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
        turningMethod: string[],
        paymentMethod: string[],
        token: string | null,
    ) {
        const formData = new FormData();
        if (id) formData.append('id', id);
        if (oldImgArr && oldImgArr.length > 0) {
            oldImgArr.forEach(img => {
                formData.append('oldImg', img);
            });
        }
        if (images && images.length > 0) {
            images.forEach(img => {
                formData.append('img[]', img);
            });
        }
        formData.append('name', name);
        if (colors && colors.length > 0) {
            colors.forEach(color => {
                formData.append('colors', color);
            });
        }
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discount', discount);
        formData.append('inAvailability', inAvailability);
        if (deliveryMethod && deliveryMethod.length > 0) {
            deliveryMethod.forEach(item => {
                formData.append('deliveryMethod', item);
            });
        }
        if (paymentMethod && paymentMethod.length > 0) {
            paymentMethod.forEach(item => {
                formData.append('paymentMethod', item);
            });
        }
        if (turningMethod) {
            turningMethod.forEach(item => {
                formData.append('turningMethod', item);
            });
        }
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('weight', weight);
        formData.append('height', height);
        formData.append('width', width);
        formData.append('long', long);
        if (token) {
            formData.append('token', token);
        }
        return $api.post('/products/change', formData);
    }
}
