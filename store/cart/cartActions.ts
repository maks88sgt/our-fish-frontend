import { createAction } from '@reduxjs/toolkit';
import { ProductDTO } from '../../types/types';

export const addProductToCart = createAction(
    `cart/addProductToCart`,
    (product: ProductDTO) => ({
        payload: { product },
    }),
);

export const clearCart = createAction(`cart/clearCart`);

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

export const setSavedCart = createAction(
    `cart/setSavedCart`,
    (products: (ProductDTO & { quantity: number })[], cartId) => ({
        payload: { products, cartId },
    }),
);
