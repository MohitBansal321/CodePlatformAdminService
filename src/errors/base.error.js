class BaseError extends Error {
    constructor(name,statusCode,description,details) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.details = details;
        // Error.captureStackTrace(this);
        // console.log(this.stack);
    }
}

module.exports=BaseError;