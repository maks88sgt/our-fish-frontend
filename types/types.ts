export type ProductDTO = {
    _id: string;
    name: string;
    price: number;
    units: Units;
    image?: string | null;
    category: Categories;
    properties: string[];
    seller: string;
    description: string;
    published: boolean;
};

export type CartDTO = {
    _id?: string;
    cartId: string;
    products: (ProductDTO & { quantity: number })[];
    comment: string;
    contactInfo: {
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        city: string;
        street: string;
        house: string;
        entrance: string;
        apartment: string;
    };
    status: string;
};

export enum Units {
    kg = 'kg',
    pack = 'pack',
    piece = 'piece',
}

export enum Categories {
    frozen = 'frozen',
    cooled = 'cooled',
    dried = 'dried',
    smoked = 'smoked',
}
