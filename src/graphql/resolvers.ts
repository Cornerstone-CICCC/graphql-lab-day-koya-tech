import {
    createCustomer,
    deleteCustomer,
    getCustomerById,
    getCustomers,
    updateCustomer,
} from "../controllers/customer.controller";
import {
    createOrder,
    deleteOrder,
    getOrders,
    getOrdersByProductId,
    updateOrder,
} from "../controllers/order.controller";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    getProductsByCustomerId,
    updateProduct,
} from "../controllers/product.controller";
import { ICustomer } from "../models/customer.model";
import { IOrder } from "../models/order.model";
import { IProduct } from "../models/product.model";

// Finish the resolvers
export const resolvers = {
    Query: {
        products: async (): Promise<IProduct[]> => {
            try {
                const products = await getProducts();
                return products;
            } catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products");
            }
        },
        customers: async (): Promise<ICustomer[]> => {
            try {
                const customers = await getCustomers();
                return customers;
            } catch (error) {
                console.error("Error fetching customers:", error);
                throw new Error("Failed to fetch customers");
            }
        },
        orders: async (): Promise<IOrder[]> => {
            try {
                const orders = await getOrders();
                return orders;
            } catch (error) {
                console.error("Error fetching orders:", error);
                throw new Error("Failed to fetch orders");
            }
        },
        getProductById: async (id: string): Promise<IProduct | null> => {
            try {
                return await getProductById(id);
            } catch (error) {
                console.error("Error fetching product:", error);
                throw new Error("Failed to fetch product");
            }
        },
        getCustomerById: async (id: string): Promise<ICustomer | null> => {
            try {
                return await getCustomerById(id);
            } catch (error) {
                console.error("Error fetching customer:", error);
                throw new Error("Failed to fetch customer");
            }
        },
    },
    Product: {
        customers: async (parent: IProduct): Promise<(ICustomer | null)[]> => {
            try {
                const orders = await getOrdersByProductId(parent._id as string);
                const customers = await Promise.all(
                    orders.map(async (order) => {
                        const customer = await getCustomerById(
                            order.customerId as unknown as string
                        );
                        return customer;
                    })
                );
                return customers;
            } catch (error) {
                console.error("Error fetching customers for product:", error);
                throw new Error("Failed to fetch customers for product");
            }
        },
    },
    Customer: {
        products: async (parent: ICustomer): Promise<IProduct[]> => {
            try {
                return await getProductsByCustomerId(parent._id as string);
            } catch (error) {
                console.error("Error fetching products for customer:", error);
                throw new Error("Failed to fetch products for customer");
            }
        },
    },
    Order: {
        product: async (parent: IOrder): Promise<IProduct | null> => {
            try {
                return await getProductById(
                    parent.productId as unknown as string
                );
            } catch (error) {
                console.error("Error fetching product for order:", error);
                throw new Error("Failed to fetch product for order");
            }
        },
        customer: async (parent: IOrder): Promise<ICustomer | null> => {
            try {
                return await getCustomerById(
                    parent.customerId as unknown as string
                );
            } catch (error) {
                console.error("Error fetching customer for order:", error);
                throw new Error("Failed to fetch customer for order");
            }
        },
    },
    Mutation: {
        addProduct: async (
            _: any,
            {
                productName,
                productPrice,
            }: {
                productName: string;
                productPrice: number;
            }
        ): Promise<IProduct> => {
            try {
                return await createProduct(productName, productPrice);
            } catch (error) {
                console.error("Error creating product:", error);
                throw new Error("Failed to create product");
            }
        },
        editProduct: async (
            _: any,
            {
                id,
                productName,
                productPrice,
            }: {
                id: string;
                productName: string;
                productPrice: number;
            }
        ): Promise<IProduct | null> => {
            try {
                return await updateProduct(id, productName, productPrice);
            } catch (error) {
                console.error("Error updating product:", error);
                throw new Error("Failed to update product");
            }
        },
        removeProduct: async (_: any, id: string): Promise<boolean> => {
            try {
                return await deleteProduct(id);
            } catch (error) {
                console.error("Error deleting product:", error);
                throw new Error("Failed to delete product");
            }
        },

        addCustomer: async (
            _: any,
            {
                firstName,
                lastName,
                email,
            }: {
                firstName: string;
                lastName: string;
                email: string;
            }
        ): Promise<ICustomer> => {
            try {
                return await createCustomer(firstName, lastName, email);
            } catch (error) {
                console.error("Error creating customer:", error);
                throw new Error("Failed to create customer");
            }
        },
        editCustomer: async (
            _: any,
            {
                id,
                firstName,
                lastName,
                email,
            }: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
            }
        ): Promise<ICustomer | null> => {
            try {
                return await updateCustomer(id, firstName, lastName, email);
            } catch (error) {
                console.error("Error updating customer:", error);
                throw new Error("Failed to update customer");
            }
        },
        removeCustomer: async (_: any, id: string): Promise<boolean> => {
            try {
                return await deleteCustomer(id);
            } catch (error) {
                console.error("Error deleting customer:", error);
                throw new Error("Failed to delete customer");
            }
        },

        addOrder: async (
            _: any,
            {
                productId,
                customerId,
            }: {
                productId: string;
                customerId: string;
            }
        ) => {
            try {
                return await createOrder(productId, customerId);
            } catch (error) {
                console.error("Error creating order:", error);
                throw new Error("Failed to create order");
            }
        },

        editOrder: async (
            _: any,
            {
                id,
                productId,
                customerId,
            }: {
                id: string;
                productId: string;
                customerId: string;
            }
        ) => {
            try {
                return await updateOrder(id, productId, customerId);
            } catch (error) {
                console.error("Error updating order:", error);
                throw new Error("Failed to update order");
            }
        },
        removeOrder: async (_: any, id: string) => {
            try {
                return await deleteOrder(id);
            } catch (error) {
                console.error("Error deleting order:", error);
                throw new Error("Failed to delete order");
            }
        },
    },
};
