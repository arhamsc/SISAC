const express = require('express');
const router= express.Router()

const stationaryController = require('../../controllers/stationary/stationary');

router.route('/availability')
    .get(stationaryController.getAvailability)

router.route('/availability/:itemId')
.patch(stationaryController.updateAvailability)


module.exports = router;