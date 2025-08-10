import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CartSlice=createApi({
    reducerPath:'CartList',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4444/api/v1/users/',
        credentials:'include'
    }),
    endpoints:(builder)=>({
        addToCart:builder.mutation({
            query: ({ title, price }) => ({
                url: "/addToCart",
                method: 'POST',
                body: { title, price },
            })
        }),
        removeFromCart:builder.mutation({
            query:({title})=>({
                url:'/removeFromCart',
                method:'DELETE',
                body:{title}
            })
        }),
        getCart:builder.query({
            query:()=>`/get-cart`
        })
    })
})

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation
}=CartSlice