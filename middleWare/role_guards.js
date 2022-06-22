const { ExpressError } = require('./error_handlers');

const announcementGuards = require('./announcements/announcementGuard');
const roleHandlers = require('./role_handlers');

module.exports.isNotStudent = announcementGuards.isNotStudent;
module.exports.isPrincipal = announcementGuards.isPrincipal;
module.exports.isHOD = announcementGuards.isHOD;
module.exports.isFaculty = announcementGuards.isFaculty;
module.exports.isPO = announcementGuards.isPO;
module.exports.isCR = announcementGuards.isCR;
module.exports.isDean = announcementGuards.isDean;
module.exports.isAdmin = roleHandlers.isAdmin;
module.exports.isStudent = roleHandlers.isStudent;
module.exports.isStudentOrFaculty = roleHandlers.isStudentOrFaculty;
module.exports.isStationary = roleHandlers.isStationary;
module.exports.isOther = roleHandlers.isOther;

module.exports.isNotPO = async (req, res, next) => {
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        return role !== 'PO'
            ? next()
            : next(new ExpressError('Not Allowed to POs', 400));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};

//Moderate roles will contain -
// 1. Principal
// 2. HOD
// 3. Dean
// 4. Faculty
// 5. Admin
module.exports.isModerateRole = async (req, res, next) => {
    //Placement Officer
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        const roleValue =
            role === 'Principal' ||
            role === 'HOD' ||
            role === 'Dean' ||
            role === 'Faculty' ||
            role === 'Admin';
        return roleValue
            ? next()
            : next(new ExpressError('Not Allowed to', 400));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};
