const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    byUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdOn: {
        type: Date,
        required: true,
    },
    posterUrl: {
        type: String,
        default: null,
    },
    posterFileName: {
        type: String,
        default: null,
        name: null,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    links: [
        {
            type: String,
            default: [],
        },
    ],
    level: {
        type: String,
        enum: [
            'College',
            'Department',
            'Year',
            'Class',
            'Assignment',
            'Placements',
            'Faculty',
            'Staff',
        ],
        required: true,
    },
    department: {
        type: String,
        default: '',
    },
    edited: {
        type: Boolean,
        default: false,
    },
    modifiedOn: {
        type: Date,
        default: null,
    },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
