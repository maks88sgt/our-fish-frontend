import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { authSlice } from './auth/authReducer';
import { productsApi } from './products/productsApi';
import { cartSlice } from './cart/cartReducer';
import { cartApi } from './cart/cartApi';

const reducer = combineReducers({
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            productsApi.middleware,
            cartApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
