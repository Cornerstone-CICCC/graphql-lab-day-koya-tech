import mongoose, { Schema, Document } from 'mongoose';

// Define the Product interface
export interface IProduct extends Document {
  productName: string;
  productPrice: number;
}

// Define the Product schema
const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
});

// Create and export the Product model
const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;