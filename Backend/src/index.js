import { DBconnect } from "./db/index.js";
import {app} from "./app.js"
import dotenv from "dotenv"
dotenv.config({ path: '../.env' });

const PORT=4444

DBconnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running on Port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB connection Failed",err) 
})