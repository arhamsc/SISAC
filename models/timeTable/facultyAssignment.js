const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultyAssignmentSchema = new Schema({
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
    },
    assignedSemester: {
        type: Number,
        required: true,
    },

    assignedDepartment: {
        type: String,
        required: true,
    },
    assignedSection: {
        type: String,
        required: true,
    },
    assignmentType: {
        type: String,
        required: true,
        enum: ['Lab', 'Tutorial', 'Lecture', 'Class Teacher', 'Other'],
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

const FacultyAssignment = mongoose.model(
    'FacultyAssignment',
    facultyAssignmentSchema,
);

module.exports = FacultyAssignment;
