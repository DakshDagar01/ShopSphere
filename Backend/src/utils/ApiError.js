class ApiError extends Error{//a custor error class which inbuilts js error class
    constructor(
        statusCode,
        message="Something went wrong!!",    
        errors=[],
    )
    {
        super(message)//This calls the parent Error constructor and sets the .message property to what you passed in.
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false
        this.errors=errors//If there are multiple errors (e.g., validation errors on multiple fields), this array can hold all of them

    }
}
export default ApiError