/* eslint-disable no-undef */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// main imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// helper imports
const { jwt_auth } = require('./middleWare/helpers');

// unnamed requires
require('./middleWare/auth/auth');

// route imports
// const adminRoutes = require('./routes/admin/firebase_fcm');
const userRoute = require('./routes/admin/user');
const testRoute = require('./routes/testUser');
const cafetariaRoute = require('./routes/cafetaria/cafetaria');
const orderRoute = require('./routes/cafetaria/orders');
const stationaryRoute = require('./routes/stationary/stationary');
const announcementRoutes = require('./routes/announcements/announcements');
const { roleFinder } = require('./middleWare/roleFinder');

// const variables
const port = process.env.PORT || 3000;
// const dbUrl = process.env.DB_URL;
const dbUrl = 'mongodb://localhost:27017/SISAC';

// mongoose database setup
async function main() {
    try {
        await mongoose.connect(dbUrl);
        console.log('Mongo Connection Open');
    } catch (e) {
        console.log('Mongo Connection Failed');
        console.log(e);
    }
}
main();

// use methods
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route uses from other files
app.use('/', userRoute);
// app.use('/', adminRoutes);
app.use(jwt_auth, roleFinder);
app.use('/user', testRoute);
app.use('/cafetaria/orders', orderRoute);
app.use('/cafetaria', cafetariaRoute);
app.use('/stationary', stationaryRoute);
app.use('/announcement', announcementRoutes);

app.use('/home', (req, res) => {
    res.send('This is working');
});

// error handlers Middleware
app.use(function (error, req, res, next) {
    const { statusCode = 500 } = error;
    if (!error.message) error.message = 'Oh no Something Went Wrong';
    res.status(statusCode).json({ error });
    next();
});

app.listen(port, () => {
    console.log(`Listening on PORT ${port}.`);
});
