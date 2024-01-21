const User = require("../models/User");

module.exports = {
    getUser: async (req, res) => {
        try {
            // Ensure req.user.id instead of req.User.id
            const user = await User.findById(req.user.id);

            // Destructure the user object to remove sensitive information
            const { password, __v, updatedAt, createdAt, ...userData } = user._doc;

            res.status(200).json(userData);
        } catch (error) {
            // Proper error handling and response
            res.status(500).json({ error: 'Error fetching user data', message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            // Ensure req.user.id instead of req.User.id
            await User.findByIdAndDelete(req.user.id);
            res.status(200).json('User has been deleted');
        } catch (error) {
            // Proper error handling and response
            res.status(500).json({ error: 'Error deleting user', message: error.message });
        }
    },
};