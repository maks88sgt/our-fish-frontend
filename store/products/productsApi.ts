import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/products/',
    }),
    endpoints: (build) => ({
        getAllProductsBySeller: build.query<
            { message: string },
            { seller: string | null }
        >({
            query: ({ seller }) => ({
                url: `?seller=${seller}`,
            }),
        }),
    }),
});

export const { useGetAllProductsBySellerQuery } = productsApi;
