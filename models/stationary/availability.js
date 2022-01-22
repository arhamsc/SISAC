const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
    materialType: {
        type: String,
        enum: ["BlueBook", "Record"],
        required: [true, "Material type required"],
    },
    isAvailable: {
        type: Boolean,
        required: [true, "Availability status is required"],
    },
});

const Availability = mongoose.model("Availability", availabilitySchema);

module.exports = Availability;
