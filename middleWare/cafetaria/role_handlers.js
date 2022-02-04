const { ExpressError } = require("../error_handlers");
const User = require("../../models/user");

const roleFinder = async (req, res, next) => {
  const token = req.headers.secret_token;
  const user = await User.findOne({
    token,
  });
  if (!user) {
    next(new ExpressError("Error in authenticating", 401));
    
  } 
    return user.role;
 
};

module.exports.isAdmin = async (req, res, next) => {
  try {
    const role = await roleFinder(req, res, next);
    if (role === null) {
      next(new ExpressError("Error in authenticating", 401));
    }
    return role === "Admin" ? next() : next(new ExpressError("Not Admin", 404));
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
      : next(new ExpressError("Not a Student", 404));
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
      : next(new ExpressError("Not a Faculty", 404));
  } catch (error) {
    next(new ExpressError("Authentication Error", 401));
  }
};

module.exports.isStudentOrFaculty = async (req, res, next) => {
  try {
    const role = await roleFinder(req, res, next);
    return role === "Student" || role === "Faculty"
      ? next()
      : next(new ExpressError("Not a Student/Faculty", 404));
  } catch (error) {
    next(new ExpressError("Authentication Error", 401));
  }
};

module.exports.isStationary = async (req, res, next) => {
  try {
    const role = await roleFinder(req, res, next);
    return role === "Stationary" ?
       next() :
   
      next(new ExpressError("Not Stationary User", 401));
    
  } catch (error) {
    next(new ExpressError("Authentication Error", 401));
  }
};

module.exports.isOther = async (req, res, next) => {
  try {
    const role = await roleFinder(req, res, next);
    return role === "Other"
      ? next()
      : next(new ExpressError("Not an Other", 404));
  } catch (error) {
    next(new ExpressError("Authentication Error", 401));
  }
};
