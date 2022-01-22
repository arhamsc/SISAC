const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendedItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
    },
    count: Number,
});

const RecommendedItem = mongoose.model(
    "RecommendedItem",
    recommendedItemSchema
);

module.exports = RecommendedItem;
