const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        customerId: { type: String, required: true },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
        },
        delivery_status: { type: String, required: true, default: 'pending' },
        payment_status: { type: String, required: true },
        total: { type: Number, required: true },
    }, { timestamps: true }
);

module.exports = mongoose.model('Orders', OrdersSchema);
