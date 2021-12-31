class ExpressError extends Error {
    constructor(message, statusCode){
        super();
        this.message = message;
        this.statusCode = statusCode;
        }   
}

const catchAsync = () => {
    return (req, res, next) => {
        func(req, res, next).catch(next);//ant erros caaught is passed onto next
    }
}

module.exports = {ExpressError, catchAsync};