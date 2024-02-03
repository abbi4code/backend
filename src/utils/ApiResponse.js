//here we dont use extends because we are not using super here

class ApiResponse {

    constructor(statuscode, data, message = "success"){
        this.statuscode = statuscode
        this.data = data
        this.message = message
        //this is just the code that browser will show ytou when alll thisngs go well
        this.success = statuscode < 400
    }
}

export default ApiResponse