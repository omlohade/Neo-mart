const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerName: String,
    address: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    totalBill: Number,
    wishlistItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }] 
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;
