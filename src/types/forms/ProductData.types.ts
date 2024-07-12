export interface ColorTypes {
    id: string;
    color: string;
}

export interface ProductDataTypes<T = ColorTypes[]> {
    id: string;
    name: string;
    imgArr: File[];
    oldImgArr: string[];
    colors: T;
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
}
