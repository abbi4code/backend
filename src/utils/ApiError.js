class ApiError extends Error{
    constructor(
        statusCode,
        message= "something went wrong",
        errors = [],
        stack = ""
    ){
        /*actually uppper we define things and below we use those things 
        also this all things you ghave to learn or memorise */
        //here we override the constructor
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
       

        //ignore the below code as of now
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }


    }
}

export default ApiError