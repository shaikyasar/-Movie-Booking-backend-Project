const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId, 
        ref: "Movie",
        // Reference to the Movie model
        required: true,
    },
    
    
    seatNumber: {
        type: Number, // Array of seat numbers or IDs
        required: true,
    },
    
    date: {
        type: Date,
        required: true,

    },
    user: {
        type: mongoose.Types.ObjectId,
         ref: "User",
         // Reference to the User model
        required: true,
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
