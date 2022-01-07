import Product from "../models/Product";

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body;

    const newProduct = new Product({ name, category, price, imgURL });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
};

export const getProducts = async (req, res) => {
    const products = await Product.find();

    res.status(201).json(products);
};

export const getProductById = (req, res) => {};

export const updateProductById = (req, res) => {};

export const deleteProductById = (req, res) => {};
