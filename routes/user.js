const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user');

router.post('/signup', passport.authenticate('signup', {session: false}), userController.signup);

router.post('/login',  userController.login);


module.exports = router;