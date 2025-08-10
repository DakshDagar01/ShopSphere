import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"

const verifyJWT=asyncHandler(async(req,res,next)=>{
    const token=req.cookies?.AccessToken || req.header("Authorisation")?.replace("Bearer ","")
    if(!token){
        throw new ApiError(404,"Unauthorised Request")
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(401,"Invalid Access Token")
    }
    req.user=user
    next()
})
export {verifyJWT}