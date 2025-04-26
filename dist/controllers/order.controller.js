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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByProductId = exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
// Get all orders
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield order_model_1.default.find().populate("productId").populate("customerId");
    }
    catch (error) {
        throw new Error("Error fetching orders");
    }
});
exports.getOrders = getOrders;
// Create a new order
const createOrder = (productId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = new order_model_1.default({ productId, customerId });
        return yield newOrder.save();
    }
    catch (error) {
        throw new Error("Error creating order");
    }
});
exports.createOrder = createOrder;
// Update an order by ID
const updateOrder = (id, productId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield order_model_1.default.findByIdAndUpdate(id, { productId, customerId }, { new: true })
            .populate("productId")
            .populate("customerId");
    }
    catch (error) {
        throw new Error("Error updating order");
    }
});
exports.updateOrder = updateOrder;
// Delete an order by ID
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield order_model_1.default.findByIdAndDelete(id);
        return !!deletedOrder;
    }
    catch (error) {
        throw new Error("Error deleting order");
    }
});
exports.deleteOrder = deleteOrder;
// Get orders by productId
const getOrdersByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield order_model_1.default.find({ productId }).populate("customerId");
    }
    catch (error) {
        throw new Error("Error fetching orders by productId");
    }
});
exports.getOrdersByProductId = getOrdersByProductId;
