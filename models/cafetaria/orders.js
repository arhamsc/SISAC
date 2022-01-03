const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    orderItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
    },
    quantity: Number,
    price: Number
})



const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            orderItem: {
                type: Schema.Types.ObjectId,
                ref: 'MenuItem',
            },
            quantity: Number,
            price: Number
        }
    ],
    amount: Number,
    paymentStatus: {
        type: String,
        enum: ['Completed', 'Pending'],
    },
    transactionId: String,
    createdOn: Date,
})

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;