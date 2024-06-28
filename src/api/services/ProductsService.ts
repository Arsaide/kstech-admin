import { AxiosResponse } from 'axios';
import $api from '../request';
import {
    AllProductResponseModel,
    OneProductResponseModel,
} from '../models/ProductResponseModel';

export default class ProductsService {
    static async getProductsList(
        page: number,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get<AllProductResponseModel>(`/products/get?page=${page}`);
    }

    static async getOneProduct(
        id: string | undefined,
    ): Promise<AxiosResponse<OneProductResponseModel>> {
        return $api.get(`/products/getone?id=${id}`);
    }

    static async createProduct(
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
        token: string | null,
    ) {
        const formData = new FormData();
        if (images && images.length > 0) {
            images.forEach(img => {
                formData.append('img[]', img);
            });
        }
        formData.append('name', name);
        formData.append('colors', color);
        formData.append('description', JSON.stringify(description));
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
        formData.append('turningMethod', turningMethod);
        if (token) {
            formData.append('token', token);
        }
        return $api.post('/products/create', formData);
    }

    static async editProduct(
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
        token: string | null,
    ) {
        const formData = new FormData();
        formData.append('id', id);
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
        formData.append('colors', color);
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
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('weight', weight);
        formData.append('height', height);
        formData.append('width', width);
        formData.append('long', long);
        formData.append('turningMethod', turningMethod);
        if (token) {
            formData.append('token', token);
        }
        return $api.post('/products/change', formData);
    }
}
