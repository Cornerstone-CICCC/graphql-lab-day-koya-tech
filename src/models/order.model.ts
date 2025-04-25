import mongoose, { Schema, Document } from 'mongoose';
import { ICustomer } from './customer.model';
import { IProduct } from './product.model';

// Define the Order interface
export interface IOrder extends Document {
  productId: mongoose.Types.ObjectId | IProduct;
  customerId: mongoose.Types.ObjectId | ICustomer;
}

// Define the Order schema
const OrderSchema: Schema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
});

// Create and export the Order model
const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;