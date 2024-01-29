import asyncHandler from "../middleware/asyncHandler";
import Product from "../models/productModel";

// @desc: Fetch all products
// @route: GET /api/products
// @access: Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc: Fetch single product by id
// @route: GET /api/product/:id
// @access: Public
export const getProductById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product) {
        res.status = 404;
        throw new Error("Product Not Found")
    }

    res.json(product);
});