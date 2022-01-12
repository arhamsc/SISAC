const { ExpressError } = require("../error_handlers");
const User = require("../../models/user");

module.exports.isStudent = async (req, res, next) => {
  try {
    const role = await roleFinder(req, res, next);
    if (role == null) {
      next(new ExpressError("Error in authenticating", 401));
    }
    if (role === "Student") {
      return next();
    } else {
      return res.json({
        message: "Not a Student",
        statusCode: 401,
      });
    }
  } catch (error) {
    next(new ExpressError("Error Auth", 401));
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
      return res.json({
        message: "Not a Faculty",
        statusCode: 401,
      });
    }
  } catch (error) {
    next(new ExpressError("Error Auth", 401));
  }
};

module.exports.isStudentOrFaculty = async (req, res, next) => {
  try {
    const role = await roleFinder(req, res, next);
    if (role === "Student" || role === "Faculty") {
      return next();
    } else {
      return res.json({
        message: "Not a Student or Faculty",
        statusCode: 401,
      });
    }
  } catch (error) {
    next(new ExpressError("Error Auth", 401));
  }
};

module.exports.isOther = async (req, res, next) => {
  try {
    const role = await roleFinder(req, res, next);
    if (role === "Other") {
      return next();
    } else {
      return res.json({
        message: "Not a Other",
        statusCode: 401,
      });
    }
  } catch (error) {
    next(new ExpressError("Error Auth", 401));
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
