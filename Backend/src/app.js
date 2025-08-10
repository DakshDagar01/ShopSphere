import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import ApiError from './utils/ApiError.js'
const app=express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json())//parse incoming Request Object as a JSON Object
app.use(express.urlencoded())//can only parse incoming Request Object if strings or arrays
app.use(cookieParser())

import userRouter from "./routes/userRouter.js"
app.use("/api/v1/users",userRouter)
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      data: err.data,
      errors: err.errors
    })
  }

  console.error(err) // log it in development
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    data: null,
    errors: []
  })
})
export {app}