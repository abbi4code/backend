import  asyncHandler  from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import uploadoncloudinary from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"

//here we dont need to type  { return res.status(200).json } because here we are not
//taking function as a parameter 
// we know asynchandler will take req as parameter
const registerUser = asyncHandler(async (req, res) => {
       /*
       get user details from front end
       validation - not empty
       cheack if user already exist or not : by username and email
       cheack for img , avatar as they are compulsary
       upload them to cloudinary 
       craete user obj - in db
       remove password and reafresh token field from response
       check for user creation'
       return response */

       // by req.body you will get all the datas

    const {fullname, email, username, password} = req.body
    console.log("email: ", email)

    //cheaking for empty
    //In JavaScript, the trim() method is a built-in string method that removes whitespace (spaces, tabs, and newline characters) from both ends of a string   
    //In JavaScript, the .some() method is a built-in array method that checks whether at least one element in the array satisfies a specified condition.
    
    //this will cheack and return true if anyone is empty
    if( [fullname, username, password , email].some((field)=> field?.trim()===""))
    {
        throw new ApiError(400,"text required")
    }

    //checking if already presesnt or not
    
    
    const existeduser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existeduser){
        throw new ApiError(409, "user with email or username already existed")
    }

    //like express give us req.body now multer provide us with req.files
    /* this expression is commonly used to retrieve the file path of an uploaded avatar image. If any part of the chain 
    is undefined or null, the entire expression will result in undefined */
    // const avatarlocalpath = req.files?avatar[0]?.path:undefined;
    // const coverimagelocalpath = req.files?coverimage[0]?.path:undefined;
    const avatarlocalpath = req.files ? req.files.avatar[0]?.path : undefined;
const coverimagelocalpath = req.files ? req.files.coverimage[0]?.path : undefined;

    if(!avatarlocalpath){
        throw new ApiError(400, "avatar not uploaded ")
    }

    //adding await because uploading take time and we dont want code to go further without imguploadation
    //as uploadoncloudinary take some file address as parameter we provide i t parameter

    const avatar = await uploadoncloudinary(avatarlocalpath)
    const coverimage = await uploadoncloudinary(coverimagelocalpath)

    //checking if avatar upload rightyl
    if(!avatar){
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullname,
        //storing the url of avatar path where its uploaded
        avatar: avatar.url,
        //as we arent checking for coverimg if its uploaded or not so we need to add osme or methods
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    //checking if user created or not
    //in select all things are already selected thats by we giving what we dont want 
    //in this createduser this will all info except for password and refreshtoekn
    //remove password and reafresh token field from response
    const createduser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!createduser){
        throw new ApiError(500, "something went wrong while registering the user")
    }

    // returning the response
    return res.status(201).json(
        new ApiResponse(200, createduser,"user registered successfully")
    )

})


export default registerUser;