const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookMaterialSchema = new Schema({
    name: {
        type: String,
        required: [true, "Book name is required"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
    },
    edition: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    imageUrl: {
        type: String,
        required: [true, "Image is required"],
    },
    imageFileName: {
        type: String,
    },
});

const BookMaterial = mongoose.model("BookMaterial", bookMaterialSchema);

module.exports = BookMaterial;
