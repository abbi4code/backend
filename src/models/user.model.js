import  mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        //index is used to optimised the search 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,    
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true   
    },
    avatar: {
        type: String,
        required: true,
    },
    coverimage: {
        type: String,
    },
    //as the watch history contains multiple videos thatwhy having array
    watchhistory: [
        {
            //as this is linked to video to get all info about each video so we gonna link it to that with ref
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password: {
        type: String,
        //with every true you can add a msg 
        required: [true , "Password is required"]
    },
    refreshtoken: {
        type: String
    }

},{timestamps: true})


//these are hooks ie pre (which is used to do somehitng just before saving something)
/*these hooks takes callback function in a new way
"next" is compulsary 
async is used as all this takes sometime to happen*/
userschema.pre("save", async function (next) {
   /*Also we dont want that each time for somerhing change this password got change 
   so we will set when this should all happen
   
   ismodified will check for any modification if happen*/

    //actually next is our password that we take as parameter and returning after encrypting 
    if(!this.isModified("password")) return next();
    //encrypting password and below lines you have memorize
    this.password = await bcrypt.hash(this.password, 10)
    next()
} )


/*methods is also one of middleware which help us create our own function */
// ispasswordcorrect is our own created method
// so it will take your password as parameter and check it with excrypted one
userschema.methods.isPasswordcorrect = async function (password){
    //this.password is encryped one
    //this return will us in true/false
    return await bcrypt.compare(password, this.password)
}


userschema.methods.generateaccesstoken = function (){
    /*jwt.sign will let us to create those tokens 
    this needs payload,accesstoken env, expires in , privacy key*/
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}
userschema.methods.generaterefreshtoken = function (){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}

export const User = mongoose.model("User" , userschema)