const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    facultyIncharge: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
    type: {
        type: String,
        enum: ['Lecture', 'Lab', 'Tutorial', 'Other'],
        required: true,
    },
    acronym: {
        type: String,
        required: true,
    },
    syllabusDocUrl: {
        type: String,
    },
    syllabusDocFileName: {
        type: String,
    },
    syllabusDocOriginalName: {
        type: String,
    },
    session: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Session',
            required: true,
        },
    ],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
