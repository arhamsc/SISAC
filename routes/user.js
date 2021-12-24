const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user');

router.post('/signup', passport.authenticate('signup', {session: false}), userController.signup);

router.post('/login',  userController.login);

router.get('/logout', userController.logout);
module.exports = router;