"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const customer_controller_1 = require("../controllers/customer.controller");
const order_controller_1 = require("../controllers/order.controller");
const product_controller_1 = require("../controllers/product.controller");
// Finish the resolvers
exports.resolvers = {
    Query: {
        products: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const products = yield (0, product_controller_1.getProducts)();
                return products;
            }
            catch (error) {
                console.error("Error fetching products:", error);
                throw new Error("Failed to fetch products");
            }
        }),
        customers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const customers = yield (0, customer_controller_1.getCustomers)();
                return customers;
            }
            catch (error) {
                console.error("Error fetching customers:", error);
                throw new Error("Failed to fetch customers");
            }
        }),
        orders: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const orders = yield (0, order_controller_1.getOrders)();
                return orders;
            }
            catch (error) {
                console.error("Error fetching orders:", error);
                throw new Error("Failed to fetch orders");
            }
        }),
        getProductById: (id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, product_controller_1.getProductById)(id);
            }
            catch (error) {
                console.error("Error fetching product:", error);
                throw new Error("Failed to fetch product");
            }
        }),
        getCustomerById: (id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, customer_controller_1.getCustomerById)(id);
            }
            catch (error) {
                console.error("Error fetching customer:", error);
                throw new Error("Failed to fetch customer");
            }
        }),
    },
    Product: {
        customers: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const orders = yield (0, order_controller_1.getOrdersByProductId)(parent._id);
                const customers = yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
                    const customer = yield (0, customer_controller_1.getCustomerById)(order.customerId);
                    return customer;
                })));
                return customers;
            }
            catch (error) {
                console.error("Error fetching customers for product:", error);
                throw new Error("Failed to fetch customers for product");
            }
        }),
    },
    Customer: {
        products: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, product_controller_1.getProductsByCustomerId)(parent._id);
            }
            catch (error) {
                console.error("Error fetching products for customer:", error);
                throw new Error("Failed to fetch products for customer");
            }
        }),
    },
    Order: {
        product: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, product_controller_1.getProductById)(parent.productId);
            }
            catch (error) {
                console.error("Error fetching product for order:", error);
                throw new Error("Failed to fetch product for order");
            }
        }),
        customer: (parent) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, customer_controller_1.getCustomerById)(parent.customerId);
            }
            catch (error) {
                console.error("Error fetching customer for order:", error);
                throw new Error("Failed to fetch customer for order");
            }
        }),
    },
    Mutation: {
        addProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productName, productPrice, }) {
            try {
                return yield (0, product_controller_1.createProduct)(productName, productPrice);
            }
            catch (error) {
                console.error("Error creating product:", error);
                throw new Error("Failed to create product");
            }
        }),
        editProduct: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, productName, productPrice, }) {
            try {
                return yield (0, product_controller_1.updateProduct)(id, productName, productPrice);
            }
            catch (error) {
                console.error("Error updating product:", error);
                throw new Error("Failed to update product");
            }
        }),
        removeProduct: (_, id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, product_controller_1.deleteProduct)(id);
            }
            catch (error) {
                console.error("Error deleting product:", error);
                throw new Error("Failed to delete product");
            }
        }),
        addCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { firstName, lastName, email, }) {
            try {
                return yield (0, customer_controller_1.createCustomer)(firstName, lastName, email);
            }
            catch (error) {
                console.error("Error creating customer:", error);
                throw new Error("Failed to create customer");
            }
        }),
        editCustomer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, firstName, lastName, email, }) {
            try {
                return yield (0, customer_controller_1.updateCustomer)(id, firstName, lastName, email);
            }
            catch (error) {
                console.error("Error updating customer:", error);
                throw new Error("Failed to update customer");
            }
        }),
        removeCustomer: (_, id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, customer_controller_1.deleteCustomer)(id);
            }
            catch (error) {
                console.error("Error deleting customer:", error);
                throw new Error("Failed to delete customer");
            }
        }),
        addOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { productId, customerId, }) {
            try {
                return yield (0, order_controller_1.createOrder)(productId, customerId);
            }
            catch (error) {
                console.error("Error creating order:", error);
                throw new Error("Failed to create order");
            }
        }),
        editOrder: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, productId, customerId, }) {
            try {
                return yield (0, order_controller_1.updateOrder)(id, productId, customerId);
            }
            catch (error) {
                console.error("Error updating order:", error);
                throw new Error("Failed to update order");
            }
        }),
        removeOrder: (_, id) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield (0, order_controller_1.deleteOrder)(id);
            }
            catch (error) {
                console.error("Error deleting order:", error);
                throw new Error("Failed to delete order");
            }
        }),
    },
};
