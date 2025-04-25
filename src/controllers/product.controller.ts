import Product, { IProduct } from "../models/product.model";
import { Request, Response } from "express";

// Get all products
export const getProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get a product by ID
export const getProductById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Create a new product
export const createProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { productName, productPrice } = req.body;
        const newProduct: IProduct = new Product({ productName, productPrice });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Update a product by ID
export const updateProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const { productName, productPrice } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, productPrice },
            { new: true }
        );
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete a product by ID
export const deleteProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
