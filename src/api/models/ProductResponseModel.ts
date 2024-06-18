export interface AllProductResponseModel {
    products: OneProductResponseModel[];
    totalPages: number;
}

export interface OneProductResponseModel {
    id: string;
    name: string;
    colors: string;
    description: string;
    price: string;
    inAvailability: string;
    category: string;
    subcategory: string;
    weight: string;
    height: string;
    imgArr: string[];
}
