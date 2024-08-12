const BaseError = require('./base.error');
const {StatusCodes} = require('http-status-codes');

class NotFound extends BaseError{
    constructor(resourceName,resourceValue){
        super("NotFound",StatusCodes.NOT_FOUND,`The Requested Resource: ${resourceName} with value ${resourceValue} not found`,{
            resourceName,
            resourceValue
        });
    }
}

module.exports = NotFound;