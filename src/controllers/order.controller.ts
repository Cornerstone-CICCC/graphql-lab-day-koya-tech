import Order, { IOrder } from "../models/order.model";
import { Request, Response } from "express";

// Get all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find()
            .populate("productId")
            .populate("customerId");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
};

// Create a new order
export const createOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { productId, customerId } = req.body;
        const newOrder: IOrder = new Order({ productId, customerId });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};

// Update an order by ID
export const updateOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { productId, customerId } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { productId, customerId },
            { new: true }
        )
            .populate("productId")
            .populate("customerId");
        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Error updating order", error });
    }
};

// Delete an order by ID
export const deleteOrder = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting order", error });
    }
};
