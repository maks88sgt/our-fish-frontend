import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { authSlice } from './auth/authReducer';
import { productsApi } from './products/productsApi';

const reducer = combineReducers({
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            authApi.middleware,
            productsApi.middleware,
        ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
