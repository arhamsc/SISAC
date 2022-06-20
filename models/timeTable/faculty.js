const mongoose = require('mongoose');
const FacultyAssignment = require('./facultyAssignment');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    facultyAssignments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FacultyAssignment',
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

facultySchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await FacultyAssignment.deleteMany({
            _id: {
                $in: doc.facultyAssignments,
            },
        });
    }
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
