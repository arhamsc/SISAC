class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

const catchAsync = func => {
    return (req, res, next, ) => {
        func(req, res, next).catch((error) => {return next(error.message)});
    }
}

module.exports = { ExpressError, catchAsync };
