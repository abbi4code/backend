
//as you taking function as a parameter you need to return both functions 

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }

}
export default asyncHandler



/* const asyncHandler = (func) => async(req,res,next)=>{
     try {
        // now you have to use await for the given function
        await func(req,res,next)
        
     } catch (error) {
        //this is also a way but this is more industrial way for doing this
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
     }
} */