import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductDTO } from '../../types/types';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/products/',
    }),
    tagTypes: ['Products'],
    endpoints: (build) => ({
        getAllProductsBySeller: build.query<
            ProductDTO[],
            { seller: string | null; accessToken: string | null }
        >({
            query: ({ seller, accessToken }) => ({
                url: `/seller/${seller}`,
                headers: { 'x-access-token': accessToken ?? '' },
            }),
            providesTags: () => [
                {
                    type: 'Products',
                },
            ],
        }),
        getAllPublishedProducts: build.query<{ message: string }, void>({
            query: () => ({
                url: `/published`,
            }),
            providesTags: () => [
                {
                    type: 'Products',
                },
            ],
        }),
        createProduct: build.mutation<
            { message: string },
            Partial<ProductDTO> & { accessToken: string }
        >({
            query: ({
                name,
                price,
                units,
                category,
                properties,
                seller,
                description,
                published,
                accessToken,
            }) => ({
                url: `/`,
                body: {
                    name,
                    price,
                    units,
                    category,
                    properties,
                    seller,
                    description,
                    published,
                },
                method: 'POST',
                headers: { 'x-access-token': accessToken },
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: build.mutation<
            { message: string },
            Partial<ProductDTO> & { accessToken: string }
        >({
            query: ({
                _id,
                name,
                price,
                units,
                category,
                properties,
                seller,
                description,
                published,
                accessToken,
            }) => ({
                url: `/${_id}`,
                body: {
                    name,
                    price,
                    units,
                    category,
                    properties,
                    seller,
                    description,
                    published,
                },
                method: 'PUT',
                headers: { 'x-access-token': accessToken },
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: build.mutation<
            { message: string },
            { id: string } & { accessToken: string }
        >({
            query: ({ id, accessToken }) => ({
                url: `/${id}`,
                method: 'DELETE',
                headers: { 'x-access-token': accessToken },
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetAllProductsBySellerQuery,
    useCreateProductMutation,
    useGetAllPublishedProductsQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = productsApi;
