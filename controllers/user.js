const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');

const expiryTime = 86400000;
const expiryDate = Date.now() + expiryTime;

module.exports.signup = async function (req, res, next) {
    res.json({
        user: req.user,
        message: res.message
    });
}

module.exports.login = function (req, res, next) {
    passport.authenticate('login', {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) return res.send(error);
                const foundUser = await User.findOne({
                    username: user.username
                });
                const body = {
                    _id: user._id,
                    username: user.username,
                    role: user.role
                };

                const token = jwt.sign({
                    user: body
                }, process.env.SECRET, {
                    expiresIn: expiryTime
                });
                await User.updateOne({
                    username: user.username
                }, {
                    token: token,
                    expiryDate: expiryDate
                });


                return res.json({
                    token,
                    id: user._id,
                    username: user.username,
                    name: user.name,
                    role: user.role,
                    expiresIn: expiryTime,
                    expiryDate: expiryDate,
                    message: "Logged in successfully"
                });




            });
        } catch (error) {
            console.log(error);
            return next(error);
        }
    })(req, res);
};