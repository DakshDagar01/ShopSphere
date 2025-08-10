import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import User from "../models/userModel.js"
import ApiResponse from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken=async(userId)=>{
    try {
        //find user with this id
        //generate tokens
        const user=await User.findById(userId)
        const accessToken=await user.generateAccessToken()
        const refreshToken=await user.generateRefreshToken()

        user.RefreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } 
    catch (error) {
        console.log(error)
        throw new ApiError(500,"Something Went Wrong while generating Tokens")
    }
}
const registerUser=asyncHandler(async(req,res)=>{
    const {email,username,password}=req.body

    if([email,username,password].some(field => field?.trim()==="")){
        throw new ApiError(400,"All fields are required")
    }
    const pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!pattern.test(email)){
        console.log("Invalid Email Format")
    }

    const existingUser=await User.findOne({
        $or:[{email},{username}]
    })
    if(existingUser){
        throw new ApiError(409,"User Already exists")
    }

    const user=await User.create({
        email,
        password,
        username:username.toLowerCase(),
    })
    const CreatedUser=await User.findById(user._id).select(
        "-password -RefreshToken"
    )
    if(!CreatedUser){
        throw new ApiError(500,"Something Went Wrong while registering User")
    }
    return res.status(201).json( 
        new ApiResponse(200,CreatedUser,"User Registered")
    )
})
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email){
        throw new ApiError(404,"Email is required")
    }
    const user=await User.findOne({email})
    if(!user){
        throw new ApiError(400,"User doesnot exist")
    }
    const match=await user.isPasswordCorrect(password)

    if(!match){
        throw new ApiError(400,"Invalid Password")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .cookie("AccessToken",accessToken,options)
    .cookie("RefreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in successfully"
        )
    )
})
const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .clearCookie("AccessToken",options)
    .clearCookie("RefreshToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "User Logged Out Successfully"  
        )
    )
})
const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies?.RefreshToken || req.body?.RefreshToken
    if(!incomingRefreshToken){
        throw new ApiError(400,"unauthorized request")
    }
    const decodedToken=jwt.verify(incomingRefreshToken,process.env.Refresh_TOKEN_SECRET)
    const user=await User.findOne({_id:decodedToken?._id})
    if(!user){
        throw new ApiError(401,"Invalid Refresh Token")
    }
    if(incomingRefreshToken!==user?.RefreshToken){
        throw new ApiError(401,"Refresh Token expired")
    }
    const options={
        httpOnly:true,
        secure:true
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
    return res.status(200)
    .cookie("AccessToken",accessToken,options)
    .cookie("RefreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {accessToken,RefreshToken:refreshToken},
            "New access token generated successfully"
        )
    )
})
const isLoggedIn=asyncHandler(async(req,res)=>{
    res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "User is logged in"
        )
    )
})
const addToCart=asyncHandler(async(req,res)=>{
    const {price,title}=req.body
    if(!price || !title){
        throw new ApiError(400,"Nothing to Add in Cart")
    }
    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $push: {
                cart: { title, price }
            }
        },
        {
            new:true
        }
    )
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Item added to cart successfully"
        )
    )
})
const removeFromCart=asyncHandler(async(req,res)=>{
    const title=req.body.title
    if(!title){
        throw new ApiError(400,"Nothing to remove from Cart")
    }
    const user=await User.findByIdAndUpdate(req.user._id)
    let cart=[];
    for (let i = 0; i < user.cart.length; i++) {
        if(user.cart[i].title!==title){
            cart.push(user.cart[i])
        }
    }
    user.cart=cart;
    await user.save()

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Item removed successfully"
        )
    )
})
const getCart=asyncHandler(async(req,res)=>{
    const user=req.user
    if(!user){
        throw new ApiError(400,"User doesnot exist")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            user.cart,
            "Fetched the cart successfully"
        )
    )
})
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    addToCart,
    removeFromCart,
    getCart,
    isLoggedIn
}