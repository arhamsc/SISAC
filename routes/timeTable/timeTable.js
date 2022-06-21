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
const { isFaculty } = require('../../middleWare/cafetaria/role_handlers');

router
    .route('/')
    .get(getAllSubjects)
    .post(uploader.single('syllabusDoc'), registerSubject);

router
    .route('/:subjectId')
    .get(getSubjectById)
    .patch(uploader.single('syllabusDoc'), patchSubject)
    .delete(deleteSubject);

router.route('/session/:sessionId').delete(deleteSession);

router
    .route('/faculty')
    .get(isFaculty, getAllFaculty)
    .post(isFaculty, createFaculty);

//TODO: Make sure only the admin/principal/hod can create or delete the faculty info
router
    .route('/faculty/:facultyId')
    .get(getFacultyById)
    .patch(updateFaculty)
    .delete(deleteFaculty);

router
    .route('/facultyassignment/:facultyAssignmentId')
    .delete(deleteFacultyAssignment);

module.exports = router;
