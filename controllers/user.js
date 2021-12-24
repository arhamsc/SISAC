const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.signup = async (req,res,next) => {
    res.json({
        user: req.user,
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
                const body = {_id: user._id, username: user.username};
                const token = jwt.sign({user: body}, process.env.SECRET, {expiresIn: '1d'});
                return res.json({token});
            });
        } catch(error) {
            console.log(error);
            return next(error);
        }
    })(req, res);
};

module.exports.refreshToken = async(req, res, next) => {

}
