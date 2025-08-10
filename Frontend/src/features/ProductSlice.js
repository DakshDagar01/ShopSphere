import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productList=createApi({
    reducerPath:'ProductList',
    baseQuery:fetchBaseQuery({baseUrl:'https://fakestoreapi.com/products/'}),
    endpoints:(builder)=>({
        getAll:builder.query({
            query: ()=>''
        }),
        getProducts:builder.query({
            query:(category)=>`category/${category}`
        })
    })
})

export const {
    useGetAllQuery,
    useGetProductsQuery
}=productList