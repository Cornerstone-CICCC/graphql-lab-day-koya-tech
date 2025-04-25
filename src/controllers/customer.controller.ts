import Customer, { ICustomer } from "../models/customer.model";
import { Request, Response } from "express";

// Get all customers
export const getCustomers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error });
    }
};

// Get a customer by ID
export const getCustomerById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: "Error fetching customer", error });
    }
};

// Create a new customer
export const createCustomer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { firstName, lastName, email } = req.body;
        const newCustomer: ICustomer = new Customer({
            firstName,
            lastName,
            email,
        });
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: "Error creating customer", error });
    }
};

// Update a customer by ID
export const updateCustomer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { firstName, lastName, email },
            { new: true }
        );
        if (!updatedCustomer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({ message: "Error updating customer", error });
    }
};

// Delete a customer by ID
export const deleteCustomer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error });
    }
};
