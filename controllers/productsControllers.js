const Product = require('../models/Product');


module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("Product has been created")
        } catch (err) {
            res.status(500).json("failed to create product: " + err);
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products)
        } catch (err) {
            res.status(500).json("Failed to get the product: " + err);
        }
    },

    getProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            const { __v, createdAt, ...productData } = product._doc;
            res.status(200).json(productData);
        } catch (err) {
            res.status(500).json("Failed to get the product: " + err);
        }
    },

    searchProducts: async (req, res) => {
        try {
            const result = await Product.aggregate([
                {
                    $search: {
                        index: "apparel",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]);
    
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json("Failed to search for products: " + err);
        }
    }
}