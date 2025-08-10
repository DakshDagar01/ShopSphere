import {configureStore} from'@reduxjs/toolkit'
import { productList } from '../features/ProductSlice'
import { SignInSlice } from '../features/SignInSlice'
import { CartSlice } from '../features/Cartslice'
import { AuthSlice } from '../features/AuthSlice'

export const store=configureStore({
    reducer:{
        signIn:SignInSlice.reducer,
        [CartSlice.reducerPath]:CartSlice.reducer,
        [productList.reducerPath]:productList.reducer,
        [AuthSlice.reducerPath]:AuthSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
    .concat(productList.middleware)
    .concat(CartSlice.middleware)
    .concat(AuthSlice.middleware)
})                                                                                 