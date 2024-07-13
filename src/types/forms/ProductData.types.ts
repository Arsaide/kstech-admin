export interface ColorTypes {
    id: string;
    color: string;
}

export interface TurningTypes {
    id: string;
    turning: string;
}

export interface ProductDataTypes<C = ColorTypes[], T = TurningTypes[]> {
    id: string;
    name: string;
    imgArr: File[];
    oldImgArr: string[];
    colors: C;
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
    turningMethod: T;
    paymentMethod: string[];
}
