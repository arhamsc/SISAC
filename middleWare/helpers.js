const passport = require('passport');

module.exports.jwt_auth = passport.authenticate('jwt', {session: false});