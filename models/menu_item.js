const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Rating = require('./rating');

const menuItemSchema = new Schema({
    name: {
        type: String,
        required:[true, "Dish name is required"],
    },
    description: {
        type: String,
        required: [true, 'Dish description is required'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    ratings: [{
        type: Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    price: {
        type: Number,
        min: 1,
        required: [true, 'Price is required'],
    },
    imageUrl: {
        type: String,
       required: [true, 'Image is required'],
    },
    imageFileName: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
});

menuItemSchema.post('findOneAndDelete', async function(doc) {
    if(doc) {
        await Rating.deleteMany({
            _id: {
                $in: doc.ratings
            }
        })
    }
})

const MenuItemModel = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItemModel;