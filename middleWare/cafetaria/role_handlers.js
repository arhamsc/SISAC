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
        if (role === null) {
            next(new ExpressError("Error in authenticating", 401));
        }
        return role === "Student"
            ? next()
            : res.json({
                  message: "Not a Student",
                  statusCode: 401,
              });
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

module.exports.isFaculty = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        if (role === null) {
            next(new ExpressError("Error in authenticating", 401));
        }
        return role === "Faculty"
            ? next()
            : res.json({
                  message: "Not a Faculty",
                  statusCode: 401,
              });
    } catch (error) {
        next(new ExpressError("Authentication Error", 401));
    }
};

module.exports.isStudentOrFaculty = async (req, res, next) => {
    try {
        const role = await roleFinder(req, res, next);
        return role === "Student" || role === "Faculty"
            ? next()
            : res.json({
                  message: "Not a Student or Faculty",
                  statusCode: 401,
              });
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
        return role === "Other"
            ? next()
            : res.json({
                  message: "Not a Other",
                  statusCode: 401,
              });
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
