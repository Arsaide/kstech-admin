export interface CategoryResponseModel {
    id: string;
    category: string;
    iconImg: string;
    mainImg: string;
}

export interface EditCategoryResponseModel {
    id: string;
    newName: string;
    img: string | File | null;
    token: string | undefined;
}

export interface GetOneCategoryResponseModel {
    category: CategoryResponseModel;
    subcategory: SubcategoryResponseModel[];
}

export interface CreateCategoryResponseModel {
    id: string;
    category: string;
    img: string;
    subcategory: string[];
}

export interface CreateSubcategoryResponseModel {
    id: string;
    category: string;
    img: string;
    subcategory: string;
}

export interface SubcategoryResponseModel {
    id: string;
    category: string;
    iconImg: string;
    mainImg: string;
    subcategory: string;
}
