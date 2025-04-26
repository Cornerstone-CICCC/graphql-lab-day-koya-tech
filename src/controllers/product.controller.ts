import Product, { IProduct } from "../models/product.model";

// Get all products
export const getProducts = async (): Promise<IProduct[]> => {
    try {
        return await Product.find();
    } catch (error) {
        throw new Error("Error fetching products");
    }
};

// Get a product by ID
export const getProductById = async (id: string): Promise<IProduct | null> => {
    try {
        return await Product.findById(id);
    } catch (error) {
        throw new Error("Error fetching product");
    }
};

// Create a new product
export const createProduct = async (
    productName: string,
    productPrice: number
): Promise<IProduct> => {
    try {
        const newProduct: IProduct = new Product({ productName, productPrice });
        return await newProduct.save();
    } catch (error) {
        throw new Error("Error creating product");
    }
};

// Update a product by ID
export const updateProduct = async (
    id: string,
    productName: string,
    productPrice: number
): Promise<IProduct | null> => {
    try {
        return await Product.findByIdAndUpdate(
            id,
            { productName, productPrice },
            { new: true }
        );
    } catch (error) {
        throw new Error("Error updating product");
    }
};

// Delete a product by ID
export const deleteProduct = async (id: string): Promise<boolean> => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return !!deletedProduct;
    } catch (error) {
        throw new Error("Error deleting product");
    }
};

export const getProductsByCustomerId = async (
    customerId: string
): Promise<IProduct[]> => {
    try {
        return await Product.find({ customerId });
    } catch (error) {
        throw new Error("Error fetching products by customerId");
    }
};
