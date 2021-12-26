const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');

const expiryTime = 86400000;

module.exports.signup = async function (req,res,next) {
    const { role, username } =req.body;
    const user = await User.findOne({username});
    user.role = role;
    await user.save();
    res.json({
        user: req.user,
        role: req.user.role
    });
}

module.exports.login = function (req, res, next) {
    passport.authenticate('login', {session: false}, async(err, user, info) => {
        try {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
            req.login(user, {session: false}, async (error) => {
                if (error) return res.send(error);
                const foundUser = await User.findOne({username: user.username});
                const role = foundUser.role;
                const body = {_id: user._id, username: user.username, role: user.role};
                const token = jwt.sign({user: body}, process.env.SECRET, {expiresIn: expiryTime});
                return res.json({token, id: foundUser._id, username: foundUser.username, role: role, expiresIn: expiryTime, expiryDate: Date.now()});
            });
        } catch(error) {
            console.log(error);
            return next(error);
        }
    })(req, res);
};

module.exports.refreshToken = async(req, res, next) => {

}
