const jwt = require("jsonwebtoken");
const passport = require("passport");
const { ExpressError } = require("../middleWare/error_handlers");

const User = require("../models/user");

const expiryTime = 86400000;
const expiryDate = Date.now() + expiryTime;

module.exports = { expiryDate };

//const expressError = module.exports('../middleWare/error_handlers.js');

module.exports.signup = function (req, res) {
  res.json({
    user: req.user,
    message: res.message,
  });
};

module.exports.login = function (req, res, next) {
  passport.authenticate(
    "login",
    {
      session: false,
      failWithError: true,
    },
    (error, user, info) => {
      try {
        if (error || !user) {
          next(new ExpressError(info.message, 404));
        }
        req.login(
          user,
          {
            session: false,
          },
          async (err) => {
            if (err) return res.send(err);
            const body = {
              _id: user._id,
              username: user.username,
              role: user.role,
            };
            const token = jwt.sign(
              {
                user: body,
              },
              process.env.SECRET,
              {
                expiresIn: expiryTime,
              }
            );

            let refreshToken = '';
            user.refreshToken !== null || ""
              ? (refreshToken = user.refreshToken)
              : refreshToken = jwt.sign({ user: body }, process.env.REFRESH_SECRET);
            await User.updateOne(
              {
                username: user.username,
              },
              {
                token,
                refreshToken,
                expiryDate,
              }
            );

            return res.json({
              token,
              refreshToken,
              id: user._id,
              username: user.username,
              name: user.name,
              role: user.role,
              expiresIn: expiryTime,
              expiryDate: expiryDate,
              message: info.message,
            });
          }
        );
      } catch (err) {

        return next(err);
      }
    }
  )(req, res);
};

module.exports.refreshTokenGeneration = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const user = await User.findOne({ refreshToken });
    if (user.length === 0) return next(new ExpressError("User not found", 404));
    let token = '';
    if (user.expiryDate > Date.now()) {
      token = user.token;
    } else {
      const opts = {
        _id: user._id,
        username: user.username,
        role: user.role,
      };
      token = jwt.sign({ user: opts }, process.env.SECRET, {
        expiresIn: expiryTime,
      });
      const newExpiryDate = Date.now() + expiryTime;
      await User.findOneAndUpdate(
        { refreshToken },
        { token: token, expiryDate: newExpiryDate }
      );
    }
    return res.json({
      token,
      refreshToken,
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      expiresIn: expiryTime,
      expiryDate: expiryDate,
    });
  } catch (_) {
    next(new ExpressError("Failed to generate refresh token"));
  }
};
