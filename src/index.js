import dotenv from 'dotenv'
import connectDB from './db/index.js'
import app from "./app.js"
dotenv.config({
    //attaching the path where 
    path: './.env'
})

//as we use async and await we get some promises
connectDB()
.then(()=>{
    //so this will take data from db and display on server
    app.listen(process.env.PORT || 8000)
})
.catch((err)=>{
    console.log(err)
})

























//<==========1 st approach =========>


// import express from 'express'

// const app = express()

// ( async ()=>{
//     try {
//         //if all went right do this, we have to pass string in ti 
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         //below is a part of express in such senario where app not working
//         app.on("error", ()=>{
//             console.log("ERR: ", error)
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`app is listening on port ${process.env.PORT}`)
//         })
//     } catch (error){
//         console.error("error: ", error)
//     }
// })()