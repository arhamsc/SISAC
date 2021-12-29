const expressError = require('../error_handlers').ExpressError;
const User = require('../../models/user');

module.exports.isStudent = async(req,res,next) => {
    const role = await roleFinder(req);
    if(role === 'Student') {
        return next();
    } else {
       return res.json({message: "Not a Student", statusCode: 401})
    }
}

module.exports.isFaculty = async(req,res,next) => {
    const role = await roleFinder(req);
    if(role === 'Faculty') {
        return next();
    } else {
       return res.json({message: "Not a Faculty", statusCode: 401})
    }
}

module.exports.isStudentOrFaculty = async(req,res,next) => {
    const role = await roleFinder(req);
    if(role === 'Student' || role === 'Faculty') {
        return next();
    } else {
       return res.json({message: "Not a Student or Faculty", statusCode: 401})
    }
}

module.exports.isOther= async(req,res,next) => {
    const role = await roleFinder(req);
    if(role === 'Other') {
        return next();
    } else {
       return res.json({message: "Not a Other", statusCode: 401})
    }
}


const roleFinder = async(req) => {
    const token  = req.headers.secret_token;
    const user = await User.findOne({token});
    const role = user.role;
    return role;
}