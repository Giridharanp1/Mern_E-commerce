import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: String,
    password: String,
    name: String,
    cart: [{
        productId: Number,
        quantity: Number,
        name: String,
        price: Number
    }]
}, { timestamps: true })

const User = model("User", userSchema);
export default User;