const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//for user registration
passport.use('signup', new localStrategy({usernameField: 'username', passwordField: 'password'},
    async (username, password, done) => {      
        try {
            
            const user = await User.findOne({username: username});
            if (user) {
                return done(null, { message: 'User Exists' });
            }
            const userNew = await new User({username: username, password: password});
            await userNew.save();
            return done(null, userNew, {message: "Successfully Signed up"});       
        } catch(err) {
            console.log(err);
            done(err);
        }
    }
));

//for user login
passport.use('login', new localStrategy({usernameField: 'username', passwordField: 'password'},
async (username, password, done) => {
    try {
        const user = await User.findOne({username: username});
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = await user.isValidPassword;
        
        if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
        }
        return done(null, user, { message: 'Logged in Successfully' });
    } catch(err) {
        console.log(error);
        done(err);
    }
}));


//validating jwt

passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.SECRET,
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
            console.log(error);
          done(error);
        }
      }
    )
);
