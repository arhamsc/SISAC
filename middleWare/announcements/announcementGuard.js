const { ExpressError } = require('../error_handlers');

module.exports.isNotStudent = async (req, res, next) => {
    //for anyone other than student to post announcement
    try {
        const role = req.senderRole; //is supposed to be added by the middleware
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        console.log(role);
        return role !== 'Student'
            ? next()
            : next(new ExpressError("A Student can't make announcements", 404));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};

module.exports.isPrincipal = async (req, res, next) => {
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        return role === 'Principal'
            ? next()
            : next(new ExpressError('Not Principal', 404));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};

module.exports.isHOD = async (req, res, next) => {
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        return role === 'HOD' ? next() : next(new ExpressError('Not HOD', 404));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};

module.exports.isFaculty = async (req, res, next) => {
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        return role === 'Faculty'
            ? next()
            : next(new ExpressError('Not Faculty', 404));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};

module.exports.isPO = async (req, res, next) => {
    //Placement Officer
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        return role === 'PO' ? next() : next(new ExpressError('Not PO', 404));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};

module.exports.isCR = async (req, res, next) => {
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        return role === 'CR' ? next() : next(new ExpressError('Not CR', 404));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};

module.exports.isDean = async (req, res, next) => {
    try {
        const role = req.senderRole;
        if (role === null) {
            next(new ExpressError('Error in authenticating', 401));
        }
        return role === 'CR' ? next() : next(new ExpressError('Not CR', 404));
    } catch (error) {
        next(new ExpressError('Authentication Error', 401));
    }
};
