import { createSlice } from '@reduxjs/toolkit';
import { setUserData } from './authActions';

export enum AvailableRoles {
    user = 'user',
    admin = 'admin',
    moderator = 'moderator',
}

type InitialStateType = {
    username: string | null;
    accessToken: string | null;
    roles: null | AvailableRoles[];
    seller: string | null;
};

const initialState: InitialStateType = {
    username: null,
    accessToken: null,
    roles: null,
    seller: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setUserData, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.username = action.payload.username;
            state.roles = action.payload.roles;
            state.seller = action.payload.seller;
        });
    },
});
