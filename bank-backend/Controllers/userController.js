const users = require('../Models/userSchema')
// import token
const jwt =require('jsonwebtoken')

const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { username, email, password, accountNumber, isAdmin } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new users({
            username,
            email,
            password: hashedPassword, 
            accountNumber,
            isAdmin,
            balance: "",
            address: "",
            phoneNumber: ""
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json('Registration Failed...');
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });
        if (existingUser && await bcrypt.compare(password, existingUser.password)) { 
            const token = jwt.sign(
                { userid: existingUser._id },
                "super2024",
                { expiresIn: '1h' }
            );
            res.status(200).json({ existingUser, token });
        } else {
            res.status(404).json("Invalid email or password");
        }
    } catch (err) {
        res.status(500).json("Login failed: " + err);
    }
};

exports.getUserDetails = async (req, res) => {
    const userId=req.payload
    try {
        const user = await users.findById(userId);
        if (!user) return res.status(404).json('User not found');

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json('Error fetching user details: ' + err.message);
    }
    }
