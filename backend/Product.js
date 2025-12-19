import { Schema, model } from "mongoose";

const productSchema = new Schema({
    id: Number,
    name: String,
    price: Number,
    image: String,
    category: String,
    description: String,
    stock: { type: Number, default: 100 }
}, { timestamps: true })

const Product = model("Product", productSchema);
export default Product;