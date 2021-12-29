const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ratingSchema = new Schema ({
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem' 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
    },
});

const ratingModel = mongoose.model('Rating', ratingSchema);

module.exports = ratingModel;