import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AvailableRoles } from './authReducer';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/auth/',
    }),
    endpoints: (build) => ({
        signUp: build.mutation<
            { message: string },
            { username: string; password: string; email: string }
        >({
            query: ({ username, password, email }) => ({
                url: `signup`,
                body: {
                    username,
                    password,
                    email,
                    roles: [AvailableRoles.moderator],
                },
                method: 'POST',
            }),
        }),
        signIn: build.mutation<
            {
                accessToken: string;
                username: string;
                roles: AvailableRoles[];
                seller: string;
            },
            { username: string; password: string }
        >({
            query: ({ username, password }) => ({
                url: `signin`,
                body: {
                    username,
                    password,
                },
                method: 'POST',
            }),
        }),
    }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
