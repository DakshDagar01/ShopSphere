import mongoose from "mongoose";

const DBconnect=async ()=>{
    try {
       const connectionInstance=await mongoose.connect('mongodb://127.0.0.1:27017/Users') 
       console.log(`Mongo DB connected successfully !!, ${connectionInstance.connection.host}`)
    } 
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1)//Immediately terminates the Node.Js process
    }
}

export {DBconnect}