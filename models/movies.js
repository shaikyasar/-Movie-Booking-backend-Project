const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      
    },
    description: {
        type: String,
        required: true,
      
    },
    releaseDate: {
        type: Date,
        required: true
    },
    actors:[{type:String,
        required:true}],
        
    postUrl: {
        type: String,
        required: true,
    },
    featured:{
        type:Boolean,
    },
    bookings:[{type:mongoose.Types.ObjectId,ref:"Booking",}],
    admin:
    {
        type: mongoose.Types.ObjectId,
        ref:"Admin",
        required: true,
        
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
