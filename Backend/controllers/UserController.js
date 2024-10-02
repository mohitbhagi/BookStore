const WrapAsync = require("../middlewares/WrapAsync");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

module.exports.signup = WrapAsync(async(req, res) => {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);  
    const createdUser = new User({
        fullname: fullname,
        email: email,
        password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({
        message: "User created successfully",
        user: {
            _id: createdUser._id,
            fullname: createdUser.fullname,
            email: createdUser.email,
        },
    });
});

module.exports.login = WrapAsync(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
    } else {
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    }
});