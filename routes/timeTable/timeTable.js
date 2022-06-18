const router = require('express').Router();
const { getAllSubjects } = require('../../controllers/timeTable/timeTable');

router.route('/').get(getAllSubjects);

module.exports = router;
