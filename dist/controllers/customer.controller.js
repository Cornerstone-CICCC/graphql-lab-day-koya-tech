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
exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.getCustomerById = exports.getCustomers = void 0;
const customer_model_1 = __importDefault(require("../models/customer.model"));
// Get all customers
const getCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield customer_model_1.default.find();
    }
    catch (error) {
        throw new Error("Error fetching customers");
    }
});
exports.getCustomers = getCustomers;
// Get a customer by ID
const getCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield customer_model_1.default.findById(id);
    }
    catch (error) {
        throw new Error("Error fetching customer");
    }
});
exports.getCustomerById = getCustomerById;
// Create a new customer
const createCustomer = (firstName, lastName, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCustomer = new customer_model_1.default({
            firstName,
            lastName,
            email,
        });
        return yield newCustomer.save();
    }
    catch (error) {
        throw new Error("Error creating customer");
    }
});
exports.createCustomer = createCustomer;
// Update a customer by ID
const updateCustomer = (id, firstName, lastName, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield customer_model_1.default.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true });
    }
    catch (error) {
        throw new Error("Error updating customer");
    }
});
exports.updateCustomer = updateCustomer;
// Delete a customer by ID
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCustomer = yield customer_model_1.default.findByIdAndDelete(id);
        return !!deletedCustomer;
    }
    catch (error) {
        throw new Error("Error deleting customer");
    }
});
exports.deleteCustomer = deleteCustomer;
