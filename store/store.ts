import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';

const reducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
