const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Booking = require('../models/booking');

async function getAllUsers(req, res, next) {
    let users;
    try {

        users = await User.find();

    } catch (error) {

        return next(error);  // Pass the error to the next middleware (error handler)
    }
    if (!users) {
        return res.status(500).json({ message: "unexpected errror" });
    }
    return res.status(200).json({ users });
}

async function addUser(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if the user already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10); // Ensure salt rounds are provided

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        return res.status(201).json({ user: savedUser });
    } catch (error) {
        console.error('Error saving user:', error);
        return next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);


        // Find and update user
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password: hashedPassword }, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: "updated sucessfully" });
    } catch (error) {
        next(error);
    }
}
async function deleteUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);

        // Find and update user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: "Deleted sucessfully" });
    } catch (error) {
        next(error);
    }
}


async function login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Find the user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Email not registered" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }


        return res.status(200).json({ message: "Login successful", user: existingUser });

    } catch (error) {
        console.error('Error logging in user:', error);
        return next(error);
    }
}
async function getbookingUser(req, res, next) {
    const id = req.params.id;

    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    login,
    getbookingUser
};
