import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartDTO, ProductDTO } from '../../types/types';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/cart/',
    }),
    endpoints: (build) => ({
        createCart: build.mutation<
            Partial<CartDTO>,
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
        updateCart: build.mutation<CartDTO, Omit<CartDTO, 'status'>>({
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
        getCartsForSeller: build.query<
            CartDTO[],
            { seller: string; accessToken: string }
        >({
            query: ({ seller, accessToken }) => ({
                url: `/seller/${seller}`,
                method: 'GET',
                headers: { 'x-access-token': accessToken },
            }),
        }),
    }),
});

export const {
    useCreateCartMutation,
    useUpdateCartMutation,
    useGetCartsForSellerQuery,
} = cartApi;
