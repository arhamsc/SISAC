const router = require('express').Router();
const uploader = require('../../cloudinary/multerInitialization').uploaderFunc(
    'timetable',
);
const {
    getAllSubjects,
    createFaculty,
    getAllFaculty,
    deleteFaculty,
    registerSubject,
    deleteSubject,
    getSubjectById,
    patchSubject,
    deleteSession,
    getFacultyById,
    updateFaculty,
    deleteFacultyAssignment,
} = require('../../controllers/timeTable/timeTable');
const { isModerateRole } = require('../../middleWare/role_guards');

router
    .route('/')
    .get(getAllSubjects)
    .post(isModerateRole, uploader.single('syllabusDoc'), registerSubject);

router
    .route('/:subjectId')
    .get(getSubjectById)
    .patch(isModerateRole, uploader.single('syllabusDoc'), patchSubject)
    .delete(isModerateRole, deleteSubject);

router.route('/session/:sessionId').delete(isModerateRole, deleteSession);

router
    .route('/faculty')
    .get(isModerateRole, getAllFaculty)
    .post(isModerateRole, createFaculty);

//TODO: Make sure only the admin/principal/hod can create or delete the faculty info
router
    .route('/faculty/:facultyId')
    .get(getFacultyById)
    .patch(isModerateRole, updateFaculty)
    .delete(isModerateRole, deleteFaculty);

router
    .route('/facultyassignment/:facultyAssignmentId')
    .delete(isModerateRole, deleteFacultyAssignment);

module.exports = router;
