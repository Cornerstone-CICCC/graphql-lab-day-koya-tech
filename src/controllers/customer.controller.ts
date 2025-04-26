import Customer, { ICustomer } from "../models/customer.model";

// Get all customers
export const getCustomers = async (): Promise<ICustomer[]> => {
    try {
        return await Customer.find();
    } catch (error) {
        throw new Error("Error fetching customers");
    }
};

// Get a customer by ID
export const getCustomerById = async (
    id: string
): Promise<ICustomer | null> => {
    try {
        return await Customer.findById(id);
    } catch (error) {
        throw new Error("Error fetching customer");
    }
};

// Create a new customer
export const createCustomer = async (
    firstName: string,
    lastName: string,
    email: string
): Promise<ICustomer> => {
    try {
        const newCustomer: ICustomer = new Customer({
            firstName,
            lastName,
            email,
        });
        return await newCustomer.save();
    } catch (error) {
        throw new Error("Error creating customer");
    }
};

// Update a customer by ID
export const updateCustomer = async (
    id: string,
    firstName: string,
    lastName: string,
    email: string
): Promise<ICustomer | null> => {
    try {
        return await Customer.findByIdAndUpdate(
            id,
            { firstName, lastName, email },
            { new: true }
        );
    } catch (error) {
        throw new Error("Error updating customer");
    }
};

// Delete a customer by ID
export const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        return !!deletedCustomer;
    } catch (error) {
        throw new Error("Error deleting customer");
    }
};
