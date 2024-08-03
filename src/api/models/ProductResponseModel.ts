export interface AllProductResponseModel {
    products: OneProductTypes[];
    totalPages: number;
}

export interface OneProductResponseModel {
    product: OneProductTypes;
    // category: CategoryResponseModel;
    // subcategory: SubcategoryResponseModel;
}

export interface OneProductResponseModelForRender {
    product: OneProductForRenderTypes;
}

export interface OneProductTypes {
    id: string;
    name: string;
    imgArr: string[];
    oldImgArr: string[];
    colors: string[];
    description: string;
    price: string;
    discount: string;
    inAvailability: string;
    category: string;
    categoryName: string;
    subcategory: string;
    subcategoryName: string;
    weight: string;
    height: string;
    width: string;
    long: string;
    country: string;
    deliveryMethod: string[];
    turningMethod: string[];
    paymentMethod: string[];
    article: string;
}

export interface OneProductForRenderTypes {
    id: string;
    name: string;
    imgArr: string[];
    oldImgArr: string[];
    colors: string[];
    description: string;
    price: string;
    discount: string;
    inAvailability: string;
    category: string;
    subcategory: string;
    weight: string;
    height: string;
    width: string;
    long: string;
    deliveryMethod: string[];
    turningMethod: string;
    paymentMethod: string[];
    article: string;
}
