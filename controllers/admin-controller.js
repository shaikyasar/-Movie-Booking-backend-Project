const Admin = require('../models/admin'); 
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const env = require("dotenv");

env.config();

async function getAllAdmins(req, res, next) {
    try {
       
        const admins = await Admin.find();

        
        if (admins.length === 0) {
            return res.status(404).json({ message: "No admins found" });
        }

       
        return res.status(200).json({ admins });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}



async function addAdmin(req, res, next) {
    const { email, password } = req.body;

    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10); 

        // Create a new admin
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        const savedAdmin = await newAdmin.save();
        return res.status(201).json({ admin: savedAdmin });
    } catch (error) {
        console.error('Error saving admin:', error);
        return next(error); 
    }
}


async function login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Find the user by email
        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(400).json({ message: "Email not registered" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY,{
            expiresIn: '7d',
        });


        return res.status(200).json({ message: "Login successful",token,id:existingAdmin._id});

    } catch (error) {
        console.error('Error logging in user:', error);
        return next(error);
    }
}


module.exports= {
    addAdmin,
    login,
    getAllAdmins};
