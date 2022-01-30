const { ExpressError } = require("../error_handlers");
const User = require("../../models/user");

module.exports.isAdmin = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        if (role === "Admin") {
            return next();
        } else {
            next(new ExpressError("Not Admin", 404));
        }
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

module.exports.isStudent = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        if (role == null) {
            next(new ExpressError("Error in authenticating", 401));
        }
        if (role === "Student") {
            return next();
        } else {
            next(new ExpressError("Not Student User", 401));
        }
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

module.exports.isFaculty = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        if (role == null) {
            next(new ExpressError("Error in authenticating", 401));
        }
        if (role === "Faculty") {
            return next();
        } else {
            next(new ExpressError("Not Faculty User", 401));
        }
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

module.exports.isStudentOrFaculty = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        if (role === "Student" || role === "Faculty") {
            return next();
        } else {
            next(new ExpressError("Not Student or Faculty User", 401));
        }
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

module.exports.isStationary = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        if (role === "Stationary") {
            return next();
        } else {
            next(new ExpressError("Not Stationary User", 401));
        }
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

module.exports.isOther = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        if (role === "Other") {
            return next();
        } else {
            next(new ExpressError("Not Restaurant User", 401));
        }
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

const roleFinder = async (req, res, next) => {
    const token = req.headers.secret_token;
    const user = await User.findOne({
        token,
    });
    if (user) {
        return user.role;
    } else {
        next(new ExpressError("Error in authenticating", 401));
    }
};
