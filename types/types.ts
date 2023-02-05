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
