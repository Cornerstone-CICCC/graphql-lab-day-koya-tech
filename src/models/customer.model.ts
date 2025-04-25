import mongoose, { Schema, Document } from 'mongoose';

// Define the Customer interface
export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

// Define the Customer schema
const CustomerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create and export the Customer model
const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
export default Customer;