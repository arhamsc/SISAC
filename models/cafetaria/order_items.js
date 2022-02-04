const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  orderedItem: {
    type: Schema.Types.ObjectId,
    ref: "MenuItem",
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
