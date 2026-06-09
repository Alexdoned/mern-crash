import mongoose from 'mongoose';
import Product from "../models/Product.js";



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // this will fetch all the products from the database
        res.status(200).json({success: true, data: products}); // send the products as a response to the client
    } catch (error) {
        console.error('Error in fetching products:', error.message);
        res.status(500).json({success: false, message: "server error"});
    }
};

export const postProduct = async (req, res) => {
    const product = req.body; // user will send this data 

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});

    } catch (error) {
        console.error('Error in creating product:', error.message);
        res.status(400).json({success: false, message: "server error"});
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "invalid product ID" });
    }


    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error('Error in updating product:', error.message);
        res.status(400).json({ success: false, message: "Bad request" });
    }
};

export const deleteProduct =  async (req, res) => {
    const { id } = req.params;

     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "invalid product ID" });
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "product deleted"});

    } catch (error) {
        console.error('Error in deleting product:', error.message);
        res.status(500).json({success: false, message: "server error"});
    }
      
};

