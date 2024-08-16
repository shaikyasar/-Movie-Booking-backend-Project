const express = require('express');
const movie_router = express.Router();
const {getAllMovies,addMovies, getMovieById}= require('../controllers/movie-controller');


movie_router.post("/add",addMovies);
movie_router.get("/",getAllMovies);
movie_router.get("/:id",getMovieById);

module.exports = movie_router;
