import Order, { IOrder } from "../models/order.model";

// Get all orders
export const getOrders = async (): Promise<IOrder[]> => {
    try {
        return await Order.find().populate("productId").populate("customerId");
    } catch (error) {
        throw new Error("Error fetching orders");
    }
};

// Create a new order
export const createOrder = async (
    productId: string,
    customerId: string
): Promise<IOrder> => {
    try {
        const newOrder: IOrder = new Order({ productId, customerId });
        return await newOrder.save();
    } catch (error) {
        throw new Error("Error creating order");
    }
};

// Update an order by ID
export const updateOrder = async (
    id: string,
    productId: string,
    customerId: string
): Promise<IOrder | null> => {
    try {
        return await Order.findByIdAndUpdate(
            id,
            { productId, customerId },
            { new: true }
        )
            .populate("productId")
            .populate("customerId");
    } catch (error) {
        throw new Error("Error updating order");
    }
};

// Delete an order by ID
export const deleteOrder = async (id: string): Promise<boolean> => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        return !!deletedOrder;
    } catch (error) {
        throw new Error("Error deleting order");
    }
};

// Get orders by productId
export const getOrdersByProductId = async (
    productId: string
): Promise<IOrder[]> => {
    try {
        return await Order.find({ productId }).populate("customerId");
    } catch (error) {
        throw new Error("Error fetching orders by productId");
    }
};
