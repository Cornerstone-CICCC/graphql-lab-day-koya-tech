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
exports.getProductsByCustomerId = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
// Get all products
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_model_1.default.find();
    }
    catch (error) {
        throw new Error("Error fetching products");
    }
});
exports.getProducts = getProducts;
// Get a product by ID
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_model_1.default.findById(id);
    }
    catch (error) {
        throw new Error("Error fetching product");
    }
});
exports.getProductById = getProductById;
// Create a new product
const createProduct = (productName, productPrice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new product_model_1.default({ productName, productPrice });
        return yield newProduct.save();
    }
    catch (error) {
        throw new Error("Error creating product");
    }
});
exports.createProduct = createProduct;
// Update a product by ID
const updateProduct = (id, productName, productPrice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_model_1.default.findByIdAndUpdate(id, { productName, productPrice }, { new: true });
    }
    catch (error) {
        throw new Error("Error updating product");
    }
});
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_model_1.default.findByIdAndDelete(id);
        return !!deletedProduct;
    }
    catch (error) {
        throw new Error("Error deleting product");
    }
});
exports.deleteProduct = deleteProduct;
const getProductsByCustomerId = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield product_model_1.default.find({ customerId });
    }
    catch (error) {
        throw new Error("Error fetching products by customerId");
    }
});
exports.getProductsByCustomerId = getProductsByCustomerId;
