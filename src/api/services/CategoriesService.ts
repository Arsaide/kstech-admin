import { AxiosResponse } from 'axios';
import $api from '../request';
import {
    CategoryResponseModel,
    SubcategoryResponseModel,
} from '../models/CategoriesResponseModel';

export default class CategoriesService {
    static async getAllCategories(): Promise<
        AxiosResponse<CategoryResponseModel[]>
    > {
        return $api.get<CategoryResponseModel[]>(`/category/getcategories`);
    }

    static async getOneCategory(
        id: string,
    ): Promise<AxiosResponse<CategoryResponseModel>> {
        return $api.get(`/category/getonecategory?id=${id}`);
    }

    static async createCategory(
        token: string | null,
        category: string,
    ): Promise<AxiosResponse<CategoryResponseModel>> {
        return $api.post<CategoryResponseModel>(`/category/createcategory`, {
            token,
            category,
        });
    }

    static async addSubcategory(
        id: string | undefined,
        subcategory: string,
    ): Promise<AxiosResponse<SubcategoryResponseModel>> {
        return $api.post<SubcategoryResponseModel>(`/category/addsubcategory`, {
            id,
            subcategory,
        });
    }
}
