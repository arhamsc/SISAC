if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//main imports
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');

//unnamed requires
require('./middleWare/auth/auth');

//model imports
const User = require('./models/user');

//route imports 
const userRoute = require('./routes/user');
const testRoute = require('./routes/testUser');

//const variables
const port = process.env.PORT || 3000;
const dbUrl = 'mongodb://localhost:27017/SISAC';

//mongoose database setup
async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log("Mongo Connection Open");
    }
    catch(e) {
        console.log("Mongo Connection Failed");
        console.log(e);
    }
}
main();

//use methods
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', userRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), testRoute);

app.use('/home', (req, res) => {
    res.send("This is working");
});

//error handlers
app.use(function(err, req, res, next) {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = "Oh no Something Went Wrong"; 
    res.status(statusCode).json({ err });
});


app.listen(port, () => {
    console.log(`Listening on PORT ${port}.`)
});