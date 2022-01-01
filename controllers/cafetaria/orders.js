const Order = require('../../models/cafetaria/orders');
const User = require('../../models/user');

//retrieve orders for a specific user
module.exports.getOrders = async (req, res) => {
    try {
        const token = req.headers.secret_token;
        const user = await User.findOne({token});
        const orders = await Order.find({
            user: user
        });
        if(orders.length === 0) {
           return  res.json({message: "There are no orders placed"})
        }
        res.json({
            ...orders
            
        });
    } catch (error) {
        res.json({
            error,
            message: "Failed to fetch orders"
        });
    }
}


//*send the body in orderItem[id] and total order as order[]
/* 
Sample Postman request:
orderItem[][_id]:61cc818c6206ad88a23ecb2f
orderItem[][quantity]:3
orderItem[][price]:33
orderItem[1][_id]:61cc3c0b267ba6bba93c4d4a
orderItem[1][quantity]:5
orderItem[1][price]:100
order[amount]:1000
order[paymentStatus]:Completed
order[transactionId]:2343
order[createdOn]:2020-12-10
*/
module.exports.newOrder = async (req, res) => {
    try {
        const orderItems = req.body.orderItem;
        const order = req.body.order;
        const token = req.headers.secret_token;
        const foundUser = await User.findOne({
            token: token
        }, 'username name');
        const menuItemIds = orderItems.map((ele) => ele);
        const newOrder = await new Order({
            user: foundUser,
            amount: order.amount,
            paymentStatus: order.paymentStatus,
            transactionId: order.transactionId,
            createdOn: order.createdOn
        });
        newOrder.orderItems.push(...menuItemIds)
        await newOrder.save();
        res.send({
            newOrder
        });
    } catch (e) {
        res.json({error: e});
    }
}

//fetch a particular order by order Id
module.exports.fetchOneOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if(!order) {
            return res.json({message:"Order Not found"})
        }
        res.json({...order})
    } catch(e) {
        res.json({error: e, message: "Could not get the order"})
    }
}

/**** Restaurant Routes****/
module.exports.getAllOrders = async (req,res) => {
    try {
        const orders = await Order.find({});
        res.json({...orders})
    } catch(error) {
        res.json({error});
    }
}

module.exports.clearOrders = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findByIdAndDelete(orderId);
        res.json({message: "Order Deleted"});
    } catch(error) {
        res.json({error});
    }
}