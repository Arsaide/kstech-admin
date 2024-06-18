import { AxiosResponse } from 'axios';
import $api from '../request';
import {
    AllProductResponseModel,
    OneProductResponseModel,
} from '../models/ProductResponseModel.ts';

export default class ProductsService {
    static async getProductsList(
        page: number,
    ): Promise<AxiosResponse<AllProductResponseModel>> {
        return $api.get(`/products/get?page=${page}`);
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
        inAvailability: string,
        category: string,
        subcategory: string,
        weight: string,
        height: string,
        token: string | null,
    ) {
        const formData = new FormData();
        if (images && images.length > 0) {
            images.forEach(img => {
                formData.append('images[]', img);
            });
        }
        formData.append('name', name);
        formData.append('color', color);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('inAvailability', inAvailability);
        formData.append('category', category);
        formData.append('subcategory', subcategory);
        formData.append('weight', weight);
        formData.append('height', height);
        if (token) {
            formData.append('token', token);
        }
        return $api.post('/products/create', formData);
    }
}
