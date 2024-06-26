const User = require("../models/User");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            location: req.body.location,
        });

        try {
            await newUser.save();
            res.status(201).json({ message: "User Successfully Created" }); // 201 represents a successful creation
        } catch (error) {
            res.status(500).json({ message: error });
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(401).json("Could not find the user");

            const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const thePassword = decryptedPass.toString(CryptoJS.enc.Utf8);

            if (thePassword !== req.body.password) return res.status(401).json("Wrong Password");

            const userToken = jwt.sign({
                id: user._id
            }, process.env.JWT_SEC, { expiresIn: "21d" });

            const { password, __v, updatedAt, createdAt, ...others } = user._doc;
            res.status(200).json({ ...others, token: userToken });
        } catch (error) {
            res.status(500).json("Failed to login, check your credentials");
        }
    },
};