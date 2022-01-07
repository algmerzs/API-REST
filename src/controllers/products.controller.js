import Product from "../models/Product";

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body;

    const newProduct = new Product({ name, category, price, imgURL });

    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
};

export const getProducts = async (req, res) => {
    const products = await Product.find();

    res.status(200).json(products);
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).send(product);
};

export const updateProductById = async (req, res) => {
    const upatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
    );
    res.status(201).send(upatedProduct);
};

export const deleteProductById = async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(
        req.params.productId
    );
    res.status(204).send(deletedProduct);
};
