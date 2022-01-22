const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availableMaterialSchema = new Schema({
    materialType: {
        type: String,
        enum: ["Stationary", "Food", "Reference", "Service"],
    },
    name: {
        type: String,
        required: [true, "Material name is required"],
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

const AvailableMaterial = mongoose.model(
    "AvailableMaterial",
    availableMaterialSchema
);

module.exports = AvailableMaterial;
