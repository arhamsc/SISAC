const mongoose = require('mongoose');
const Session = require('./session');
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
    //TODO: Present with a list of available faculties to add them to the request
    facultiesIncharge: [
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
    branch: {
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
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Session',
            required: true,
        },
    ],
    createdOn: {
        type: Date,
        required: true,
    },
    editedOn: {
        type: Date,
        default: null,
    },
});

subjectSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Session.deleteMany({
            _id: {
                $in: doc.sessions,
            },
        });
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
