import { createSlice } from "@reduxjs/toolkit";
const initialState={
    showSignIn:false
}

export const SignInSlice=createSlice({
    name:'signIn',
    initialState,
    reducers:{
        setSignIn:(state,action)=>{
            state.showSignIn=action.payload
        }
    }
})
export const {setSignIn}=SignInSlice.actions
export default SignInSlice.reducer