import { createSlice } from '@reduxjs/toolkit';
import { addProductToCart } from './cartActions';
import { ProductDTO } from '../../types/types';

type InitialStateType = {
    products: ProductDTO[];
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
            state.products = [action.payload.product, ...state.products];
        });
    },
});
