import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// setting how much data you want express to handle
//this data come from form
app.use(express.json({limit: "16kb"}))
//handling data from url
app.use(express.urlencoded({extended: true , limit: "16kb"}))
//handling public img
app.use(express.static("public"))
//its just to use to handle cookies
app.use(cookieParser())


//routes
import userRouter from './routes/user.routes.js'


//routes declaration
//its just standart practice /api/v1
app.use("/api/v1/users", userRouter)

//http://localhost:8000/api/v1/users/register

export default app;