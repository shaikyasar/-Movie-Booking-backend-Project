const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String,
        required: true,
        minLength:6,
    },
    addedMovies :[
        {
            type: mongoose.Types.ObjectId,
            ref:"Movie",
        },
    ],
    
});


const Admin = mongoose.model('Admin', userSchema);

module.exports = Admin;
