import { createSlice } from '@reduxjs/toolkit';
import {
    addProductToCart,
    decreaseProductQuantity,
    increaseProductQuantity,
} from './cartActions';
import { ProductDTO } from '../../types/types';

type InitialStateType = {
    products: (ProductDTO & { quantity: number })[];
};

const initialState: InitialStateType = {
    products: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addProductToCart, (state, action) => {
            state.products = [
                { ...action.payload.product, quantity: 1 },
                ...state.products,
            ];
        });
        builder.addCase(increaseProductQuantity, (state, action) => {
            const index = state.products.findIndex(
                (it) => it._id === action.payload.product._id,
            );
            state.products[index] = {
                ...state.products[index],
                quantity: state.products[index].quantity + 1,
            };
        });
        builder.addCase(decreaseProductQuantity, (state, action) => {
            const index = state.products.findIndex(
                (it) => it._id === action.payload.product._id,
            );
            if (state.products[index].quantity - 1 === 0) {
                state.products = [
                    ...state.products.slice(0, index),
                    ...state.products.slice(index + 1),
                ];
                return;
            }
            state.products[index] = {
                ...state.products[index],
                quantity: state.products[index].quantity - 1,
            };
        });
    },
});
