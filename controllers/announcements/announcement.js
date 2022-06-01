const Announcement = require('../../models/announcements/announcement');
const { ExpressError } = require('../../middleWare/error_handlers');
const { cloudinary } = require('../../cloudinary');

module.exports.getAllAnnouncements = async (req, res, next) => {
    try {
        const announcements = await Announcement.find({});
        res.json(announcements);
    } catch (error) {
        next(new ExpressError('Failed to fetch announcements', 500));
    }
};

module.exports.makeAnnouncement = async (req, res, next) => {
    try {
        const { user, body, file } = req;
        const { announcement } = body;
        const newAnnouncement = await new Announcement(announcement);
        newAnnouncement.byUser = user._id;
        newAnnouncement.createdOn = new Date().toISOString();
        if (file) {
            newAnnouncement.posterUrl = file.path;
            newAnnouncement.posterFileName = file.filename;
        }
        await newAnnouncement.save();
        res.json({ message: 'Announcement made!' });
    } catch (error) {
        next(new ExpressError('Failed to make announcement', 500));
    }
};

module.exports.editAnnouncement = async (req, res, next) => {
    try {
        const {body, params, file } = req;
        const { announcement } = body;
        const { id } = params;
        const editedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            { ...announcement },
            { new: true },
        );
        if (file) {
            cloudinary.uploader.destroy(editedAnnouncement.posterFileName);
            editedAnnouncement.posterUrl = file.path;
            editedAnnouncement.posterFileName = file.filename;
        }
        await editedAnnouncement.save();
        res.json({ editedAnnouncement, message: 'Edited Successfully' });
    } catch (error) {
        next(new ExpressError('Failed to edit!!'));
    }
};
