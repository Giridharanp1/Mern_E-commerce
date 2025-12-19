import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId: String,
    items: [{
        productId: Number,
        name: String,
        price: Number,
        quantity: Number
    }],
    total: Number,
    shippingAddress: {
        address: String,
        city: String,
        zipCode: String
    },
    paymentInfo: {
        cardNumber: String,
        expiryDate: String
    },
    status: { type: String, default: 'pending' }
}, { timestamps: true })

const Order = model("Order", orderSchema);
export default Order;