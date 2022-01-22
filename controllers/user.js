const jwt = require("jsonwebtoken");
const passport = require("passport");
const { ExpressError } = require("../middleWare/error_handlers");

const User = require("../models/user");

const expiryTime = 86400000;
const expiryDate = Date.now() + expiryTime;

//const expressError = module.exports('../middleWare/error_handlers.js');

module.exports.signup = async function (req, res) {
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
        async (error, user, info) => {
            try {
                if (error || !user) {
                    //console.log(err);
                    throw new ExpressError(info.message, 404);
                }
                req.login(
                    user,
                    {
                        session: false,
                    },
                    async (error) => {
                        if (error) return res.send(error);
                        const foundUser = await User.findOne({
                            username: user.username,
                        });
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
                        await User.updateOne(
                            {
                                username: user.username,
                            },
                            {
                                token: token,
                                expiryDate: expiryDate,
                            }
                        );
                        return res.json({
                            token,
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
            } catch (error) {
                console.log(error);
                return next(error);
            }
        }
    )(req, res);
};
