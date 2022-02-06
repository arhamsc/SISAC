const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItem = require('./order_items');

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'OrderItem',
    },
  ],
  amount: Number,
  paymentStatus: {
    type: String,
    enum: ['Completed', 'Pending', 'Failed'],
  },
  orderStatus: {
    type: String,
    enum: ['Completed', 'Preparing', 'Cancelled'],
    default: 'Preparing',
  },
  transactionId: String,
  createdOn: Date,
});

orderSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await OrderItem.deleteMany({
      _id: {
        $in: doc.orderItems,
      },
    });
  }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
