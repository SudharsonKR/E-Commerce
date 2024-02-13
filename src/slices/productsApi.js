import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from './api'

// Create an API service

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: `${url}`}),
    endpoints: (builder)=>({
        getAllProducts: builder.query({
            query: ()=>`products`,
        })
    })
})

export const {useGetAllProductsQuery} = productsApi