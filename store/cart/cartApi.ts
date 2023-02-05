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
        updateCart: build.mutation<
            {
                products: (ProductDTO & { quantity: number })[];
                _id: string;
                status: string;
            },
            {
                cartId: string;
                products: (ProductDTO & { quantity: number })[];
                comment: string;
                contactInfo: {
                    name: string;
                    email: string;
                    phone: string;
                };
                shippingAddress: {
                    city: string;
                    street: string;
                    house: string;
                    entrance: string;
                    apartment: string;
                };
            }
        >({
            query: ({
                products,
                comment,
                contactInfo,
                shippingAddress,
                cartId,
            }) => ({
                url: `/${cartId}`,
                body: {
                    products,
                    comment,
                    contactInfo,
                    shippingAddress,
                    status: 'Purchased',
                },
                method: 'put',
            }),
        }),
    }),
});

export const { useCreateCartMutation, useUpdateCartMutation } = cartApi;
