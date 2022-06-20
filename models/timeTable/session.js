const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    dateAndTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    semester: {
        type:Number,
        required:true,
    },
    section: {
        type: String,
        required:true,
    },
    createdOn: {
        type: Date,
        required: true,
    },
    editedOn: {
        type: Date,
        default: null,
    },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
