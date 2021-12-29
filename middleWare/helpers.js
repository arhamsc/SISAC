const passport = require('passport');
const Rating = require('../models/cafetaria/rating');


module.exports.jwt_auth = passport.authenticate('jwt', {session: false});

//below method will take the ratings and group and find average from the Ratings Model and then merge it with the menuItem Model "rating"
module.exports.calculateAvgRating = async() => {
    const result = await Rating.aggregate([
        {
            $group: {
                _id: "$menuId",
                rating: {$avg: "$rating"}
            }
        },
        {
            $merge: {
                into: "menuitems",
                on: "_id",
                whenMatched: "merge",
                whenNotMatched: "insert"
            }
        }
    ]);
}