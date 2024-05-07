
const express = require('express');

const ProductModel = require('../models/productModel');
const fs = require('fs');
const path = require('path');

exports.getAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await ProductModel.find();

        // Respond with the list of products
        res.status(200).json(products);
    } catch (error) {
        // If an error occurs, respond with the error message
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


