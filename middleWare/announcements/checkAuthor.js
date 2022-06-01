const { ExpressError } = require('../error_handlers');
const User = require('../../models/user');
const Announcement = require('../../models/announcements/announcement');

module.exports.checkAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = req;
        const foundUser = await User.findById(user._id);
        const foundAnnouncement = await Announcement.findById(id);
        if (!foundUser) {
            next(new ExpressError('User not found', 400));
        }
        if (!foundAnnouncement) {
            next(new ExpressError("Announcement doesn't exist", 400));
        }
        if (foundUser._id.toString() !== foundAnnouncement.byUser.toString()) {
            next(new ExpressError('You are not the author!', 404));
        }
        next();
    } catch (error) {
        next(new ExpressError('Server Error'));
    }
};
