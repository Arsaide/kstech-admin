export interface AllProductResponseModel {
    products: OneProductResponseModel[];
    totalPages: number;
}

export interface OneProductResponseModel {
    id: string;
    name: string;
    imgArr: string[];
    colors: string;
    description: string;
    price: string;
    discount: string;
    inAvailability: string;
    category: string;
    subcategory: string;
    weight: string;
    height: string;
    deliveryMethod: string;
    turningMethod: string;
    paymentMethod: string;
}
