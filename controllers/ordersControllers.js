const Orders = require("../models/Orders");
const Products = require("../models/Product");

module.exports = {
    getUserData: async (req, res) => {
        try {
            const userId = req.user.id;

            const userOrders = await Orders.find({ userId })
                .populate({
                    path: "productId",
                    select: "-sizes -oldPrice -description -category",
                    model: Products
                })
                .exec();

            res.status(200).json({ userOrders });
        } catch (error) {
            console.error("Error in getUserData:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};