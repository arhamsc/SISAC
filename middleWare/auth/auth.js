const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const roleEnums = ["Admin", "Student", "Faculty", "Stationary", "Other"];

//for user registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (user) {
          return done({ message: "User Exists" });
        }
        if (!roleEnums.includes(req.body.role)) {
          return done({ message: "Invalid Role" });
        }
        const userNew = await new User({
          username: username,
          password: password,
          role: req.body.role,
          name: req.body.name,
        });
        await userNew.save();
        return done(null, userNew, {
          message: "Successfully Signed up",
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//for user login
passport.use(
  "login",
  new localStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, {
            message: "Wrong Username or Password",
          });
        }
        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//validating jwt
const opts = {};
opts.secretOrKey = process.env.SECRET;
opts.jwtFromRequest = ExtractJWT.fromHeader("secret_token");
passport.use(
  new JWTstrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.user._id);
      if (user.expiryDate < Date.now()) {
        return done(null, false);
      }
      return done(null, jwt_payload.user);
    } catch (error) {
      return done(null, false, { message: error.message });
    }
  })
);
