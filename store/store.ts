import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { authSlice } from './auth/authReducer';

const reducer = combineReducers({
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
