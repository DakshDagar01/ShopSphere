import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AuthSlice=createApi({
    reducerPath:'Auth',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:4444/api/v1/users/',
        credentials:'include'

    }),
    endpoints:(builder)=>({
        register:builder.mutation({
            query:({email,username,password})=>({
                url:"/register",
                method:'POST',
                body:{email,username,password}
            })
        }),
        login:builder.mutation({
            query:({email,password})=>({
                url:'/login',
                method:'POST',
                body:{email,password}
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:'/logout',
                method:"POST",
            })
        }),
        isLoggedIn:builder.query({
            query:()=>'/isLoggedIn'
        })
    })
})

export const {
 useLoginMutation,
 useLogoutMutation,
 useRegisterMutation,
 useIsLoggedInQuery
}=AuthSlice