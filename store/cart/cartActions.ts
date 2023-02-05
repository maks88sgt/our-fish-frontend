import { createAction } from '@reduxjs/toolkit';
import { ProductDTO } from '../../types/types';

export const addProductToCart = createAction(
    `cart/addProductToCart`,
    (product: ProductDTO) => ({
        payload: { product },
    }),
);

export const increaseProductQuantity = createAction(
    `cart/increaseProductQuantity`,
    (product: ProductDTO) => ({
        payload: { product },
    }),
);

export const decreaseProductQuantity = createAction(
    `cart/decreaseProductQuantity`,
    (product: ProductDTO) => ({
        payload: { product },
    }),
);
