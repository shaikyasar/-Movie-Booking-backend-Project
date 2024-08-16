const Movie = require('../models/movies');
const Admin = require('../models/admin'); 

const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const env = require("dotenv");
env.config();
const SECRET_KEY = process.env.SECRET_KEY;


async function getAllMovies(req, res, next) {
    try {
        // Fetch all movies from the database
        const movies = await Movie.find({});


        return res.status(200).json({ movies });
    } catch (error) {
        console.error('Error fetching movies:', error);
        return next(error);
    }
}


async function addMovies(req, res, next) {

    const extractedToken = req.headers.authorization?.split(" ")[1];
    if (!extractedToken) {
        return res.status(404).json({ message: "Token not found" });
    }

    let adminId;

    try {
        // Verify the token and get the admin ID
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(extractedToken, SECRET_KEY, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
        adminId = decoded.id;

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    const { title, description, releaseDate, postUrl, featured, actors } = req.body;

    if (!title || !description || !releaseDate || !postUrl) {
        return res.status(422).json({ message: "Title, description, release date, and post URL are required" });
    }

    try {
        // Create a new movie instance
        const newMovie = new Movie({
            title,
            description,
            releaseDate: new Date(releaseDate),
            postUrl,
            featured: featured || false, // Default to false if not provided
            admin: adminId, // Set admin ID from the token
            actors: actors || [] // Default to empty array if not provided
        });
        const session=await mongoose.startSession();
        const adminUser=await Admin.findById(adminId);
        session.startTransaction();
        await newMovie.save({ session });
        await adminUser.addedMovies.push(newMovie) ;
        await adminUser.save({session});
        await session.commitTransaction();      

        // Save the new movie to the database
        const savedMovie = await newMovie.save();

        // Respond with the created movie
        return res.status(201).json({ movie: savedMovie });

    } catch (error) {
        console.error('Error adding movie:', error);
        return next(error); 
    }
}




async function getMovieById(req, res, next) {
    const movieId = req.params.id;

    try {
        
        const movie = await Movie.findById(movieId);

        if (!movie) {
            
            return res.status(404).json({ message: "Movie not found" });
        }

        // Movie found, return it
        return res.status(200).json({ movie });
    } catch (error) {

        console.error('Error fetching movie:', error);
        return next(error);

    }
}

module.exports = {
    addMovies,
    getAllMovies,
    getMovieById
};


