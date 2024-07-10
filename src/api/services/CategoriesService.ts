import { AxiosResponse } from 'axios';
import $api from '../request';
import {
    CategoryResponseModel,
    EditCategoryResponseModel,
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
        if (iconImg) formData.append('iconImg', iconImg);
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
        if (iconImg) formData.append('iconImg', iconImg);
        if (token) formData.append('token', token);
        formData.append('subcategory', subcategory);

        return $api.post<SubcategoryResponseModel>(
            `/category/addsubcategory`,
            formData,
        );
    }

    static async editCategory(
        token: string | null,
        id: string | null,
        mainImg: File | null,
        iconImg: File | null,
        newName: string | null,
    ): Promise<AxiosResponse<EditCategoryResponseModel>> {
        const formData = new FormData();

        if (id) formData.append('id', id);
        if (token) formData.append('token', token);
        if (mainImg) formData.append('mainImg', mainImg);
        if (iconImg) formData.append('iconImg', iconImg);
        if (newName) formData.append('newName', newName);

        return $api.post<EditCategoryResponseModel>(
            `/category/changecategory`,
            formData,
        );
    }

    static async editSubcategory(
        token: string | null,
        id: string | null,
        mainImg: File | null,
        iconImg: File | null,
        newName: string | null,
    ): Promise<AxiosResponse<EditCategoryResponseModel>> {
        const formData = new FormData();

        if (id) formData.append('id', id);
        if (token) formData.append('token', token);
        if (mainImg) formData.append('mainImg', mainImg);
        if (iconImg) formData.append('iconImg', iconImg);
        if (newName) formData.append('newName', newName);

        return $api.post<EditCategoryResponseModel>(
            `/category/changesubcategory`,
            formData,
        );
    }

    static async deleteCategory(token: string | null, id: string | null) {
        return $api.post('/category/deletecategory', { token, id });
    }

    static async deleteSubcategory(
        token: string | null,
        subcategory: string | null,
    ) {
        return $api.post('/category/deletesubcategory', { token, subcategory });
    }
}
