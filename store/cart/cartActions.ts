import { createAction } from '@reduxjs/toolkit';
import { ProductDTO } from '../../types/types';

export const addProductToCart = createAction(
    `cart/addProductToCart`,
    (product: ProductDTO) => ({
        payload: { product },
    }),
);
