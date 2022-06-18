const { Subject } = require('../../models/timeTable');
const { cloudinary } = require('../../cloudinary');
const { ExpressError } = require('../../middleWare/error_handlers');
const helpers = require('../../middleWare/helpers.js');

module.exports.getAllSubjects = async (req, res, next) => {
    try {
        const Subjects = await Subject.find({});
        res.json(helpers.objectResponseWIthIdKey(Subjects));
    } catch (error) {
        next(new ExpressError());
    }
};
