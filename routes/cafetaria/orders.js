const express = require('express');
const router = express.Router();

const orderControllers = require('../../controllers/cafetaria/orders');

const roleMiddleware = require('../../middleWare/cafetaria/role_handlers');

router.route('/')
    .get(roleMiddleware.isStudentOrFaculty, orderControllers.getOrders)
    .post(roleMiddleware.isStudentOrFaculty, orderControllers.newOrder);

router.route('/restaurant')
    .get(roleMiddleware.isOther, orderControllers.getAllOrders)

router.route('/restaurant/:orderId')
    .delete(roleMiddleware.isOther, orderControllers.clearOrders);


router.route('/:orderId')
    .get(roleMiddleware.isStudentOrFaculty, orderControllers.fetchOneOrder);



module.exports = router;