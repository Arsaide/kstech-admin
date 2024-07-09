import { AxiosResponse } from 'axios';
import $api from '../request';
import {
    CategoryResponseModel,
    GetOneCategoryResponseModel,
    SubcategoryResponseModel,
} from '../models/CategoriesResponseModel';

export default class CategoriesService {
    static async getAllCategories(): Promise<
        AxiosResponse<CategoryResponseModel[]>
    > {
        return $api.get<CategoryResponseModel[]>(`/category/getcategories`);
    }

    static async getOneCategory(
        id: string | null,
    ): Promise<AxiosResponse<GetOneCategoryResponseModel>> {
        return $api.get(`/category/getonecategory?id=${id}`);
    }

    static async createCategory(
        token: string | null,
        category: string,
        mainImg: File | null,
        iconImg: File | null,
    ): Promise<AxiosResponse<CategoryResponseModel>> {
        const formData = new FormData();

        if (mainImg) formData.append('mainImg', mainImg);
        if (iconImg) formData.append('iconimg', iconImg);
        formData.append('category', category);
        if (token) formData.append('token', token);

        return $api.post<CategoryResponseModel>(
            `/category/createcategory`,
            formData,
        );
    }

    static async addSubcategory(
        token: string | null,
        id: string | undefined,
        subcategory: string,
        mainImg: File | null,
        iconImg: File | null,
    ): Promise<AxiosResponse<SubcategoryResponseModel>> {
        const formData = new FormData();

        if (id) formData.append('id', id);
        if (mainImg) formData.append('mainImg', mainImg);
        if (iconImg) formData.append('iconimg', iconImg);
        if (token) formData.append('token', token);
        formData.append('subcategory', subcategory);

        return $api.post<SubcategoryResponseModel>(
            `/category/addsubcategory`,
            formData,
        );
    }
}
