const passport = require("passport");
const Rating = require("../models/cafetaria/rating");
const OrderItem = require("../models/cafetaria/order_items");
const RecommendedItem = require("../models/cafetaria/recommended_item");

module.exports.jwt_auth = passport.authenticate("jwt", {
    session: false,
    failWithError: true,
});

//below method will take the ratings and group and find average from the Ratings Model and then merge it with the menuItem Model "rating"
module.exports.calculateAvgRating = async () => {
    await Rating.aggregate([
        {
            $group: {
                _id: "$menuId",
                rating: { $avg: "$rating" },
            },
        },
        {
            $merge: {
                into: "menuitems",
                on: "_id",
                whenMatched: "merge",
                whenNotMatched: "insert",
            },
        },
    ]);
};

module.exports.calculateRecommendation = async () => {
    const result = await OrderItem.aggregate([
        {
            $group: {
                _id: "$orderedItem",
                count: { $sum: 1 },
            },
        },
    ]);
    let max = [];
    for (let i in result) {
        const maxCount = Math.max(...result.map((o) => o.count), 0);
        if (result[i].count === maxCount) {
            max.push(result[i]);
        }
    }
    const insertingMax = max.map(({ _id: item, ...rest }) => ({
        item,
        ...rest,
    }));
    //console.log(insertingMax);
    await RecommendedItem.deleteMany({});
    const recoms = await RecommendedItem.insertMany([...insertingMax]);
    return recoms;
};
