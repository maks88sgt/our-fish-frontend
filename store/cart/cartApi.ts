import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductDTO } from '../../types/types';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/cart/',
    }),
    endpoints: (build) => ({
        createCart: build.mutation<
            {
                products: (ProductDTO & { quantity: number })[];
                _id: string;
                status: string;
            },
            { products: (ProductDTO & { quantity: number })[] }
        >({
            query: ({ products }) => ({
                url: `/`,
                body: {
                    products,
                },
                method: 'POST',
            }),
        }),
    }),
});

export const { useCreateCartMutation } = cartApi;
