const Announcement = require('../../models/announcements/announcement');
const { ExpressError } = require('../../middleWare/error_handlers');
const { cloudinary } = require('../../cloudinary');

/* Method also contains logic to find all the announcements by a particular user. */
module.exports.getAllAnnouncements = async (req, res, next) => {
    try {
        const { query, user } = req;
        const { announcementByUser } = query;
        const { _id: userId } = user;
        if (!announcementByUser || announcementByUser === null) {
            const announcements = await Announcement.find({});
            res.json(announcements);
            return;
        }
        const announcementsByUser = await Announcement.find({ byUser: userId });
        res.json(announcementsByUser);
    } catch (error) {
        next(new ExpressError('Failed to fetch announcements', 500));
    }
};

module.exports.getAnnouncementById = async (req, res, next) => {
    try {
        const { params } = req;
        const { id } = params;
        const announcement = await Announcement.findById(id);
        if (!announcement)
            return next(new ExpressError('Announcement Not Found!', 404));
        res.json(announcement);
    } catch (error) {
        next(new ExpressError());
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
        const { body, params, file } = req;
        const { announcement } = body;
        const { id } = params;
        const editedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            { ...announcement },
            { new: true },
        );
        if (file) {
            await cloudinary.uploader.destroy(
                editedAnnouncement.posterFileName,
            );
            editedAnnouncement.posterUrl = file.path;
            editedAnnouncement.posterFileName = file.filename;
        }
        editedAnnouncement.edited = true;
        editedAnnouncement.modifiedOn = new Date().toISOString();
        await editedAnnouncement.save();
        res.json({ editedAnnouncement, message: 'Edited Successfully' });
    } catch (error) {
        next(new ExpressError('Failed to edit!!'));
    }
};

module.exports.deleteAnnouncement = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            next(new ExpressError('Announcement not found', 404));
        }
        await cloudinary.uploader.destroy(deletedAnnouncement.posterFileName);
        res.json({ deletedAnnouncement, message: 'Deleted successfully.' });
    } catch (error) {
        next(new ExpressError());
    }
};
