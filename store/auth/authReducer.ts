import { createSlice } from '@reduxjs/toolkit';
import { setUserData } from './authActions';

export type AvailableRoles = 'ROLE_USER' | 'ROLE_MODERATOR' | 'ROLE_ADMIN';

type InitialStateType = {
    username: string | null;
    accessToken: string | null;
    roles: null | AvailableRoles[];
};

const initialState = {
    username: null,
    accessToken: null,
    roles: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setUserData, (state, action) => {
            state = action.payload;
        });
    },
});
