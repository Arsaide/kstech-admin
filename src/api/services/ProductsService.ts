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
        discounts: string,
        inAvailability: string,
        category: string,
        subcategory: string,
        weight: string,
        height: string,
        deliveryMethod: string,
        turningMethod: string,
        paymentMethod: string,
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
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discounts', discounts);
        formData.append('inAvailability', inAvailability);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('weight', weight);
        formData.append('height', height);
        formData.append('deliveryMethod', deliveryMethod);
        formData.append('turningMethod', turningMethod);
        formData.append('paymentMethod', paymentMethod);
        if (token) {
            formData.append('token', token);
        }
        return $api.post('/products/create', formData);
    }
}
