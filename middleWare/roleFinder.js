const { ExpressError } = require('./error_handlers');
const User = require('../models/user');

module.exports.roleFinder = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await User.findOne({
            token,
        });
        if (!user) {
            next(new ExpressError('Error in authenticating', 401));
        }
        req.senderRole = user.role;
        next();
    } catch (error) {
        next(new ExpressError());
    }
};
