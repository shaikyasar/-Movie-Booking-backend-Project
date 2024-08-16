const mongoose = require('mongoose');
const Booking = require('../models/booking'); // Ensure 'Booking' is the correct model name
const User = require("../models/user");
const Movie = require('../models/movies');
async function newBooking(req, res, next) {


    try {

      const { movie, seatNumber, date, user } = req.body;

        // Check if all required fields are provided
        if (!movie || !seatNumber || !date || !user) {
            return res.status(400).json({ message: "Every field is required" });
        }

        const existingUser = await User.findById(user);
        const existingMovie = await Movie.findById(movie);

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!existingMovie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // Ensure date is properly formatted
        const formattedDate = new Date(date);

        // Create a new booking
        const newBooking = new Booking({
            movie,
            seatNumber,
            date: formattedDate,
            user
        });

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
         
              // Assuming you have a bookings field in User schema
            existingMovie.bookings.push(newBooking); // Assuming you have a bookings field in Movie schema
             existingUser.bookings.push(newBooking);

            await existingUser.save({ session });
            await existingMovie.save({ session });
            await newBooking.save({ session });

            await session.commitTransaction();
            session.endSession();

            return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;  // Rethrow error to be caught by outer catch block
        }
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error("Error processing booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
async function getBookingById(req, res, next) {
    try {
        const  bookingId  = req.params.id;

        const booking = await Booking.findById(bookingId);

     
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Send the booking details as a response
        return res.status(200).json({ booking });
    } catch (error) {
        // Handle any errors that occurred during the process
        console.error("Error fetching booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function deleteBookingById(req, res, next) {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const booking = await Booking.findById(id).populate('user movie').session(session);

        if (!booking) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Booking not found" });
        }

   
        const { user, movie } = booking;

        if (user) {
            user.bookings.pull(id);
            await user.save({ session });
        }

        if (movie) {
            movie.bookings.pull(id);
            await movie.save({ session });
        }

        await Booking.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        session.endSession();

 
        return res.status(200).json({ message: "Booking successfully deleted" });
    } catch (error) {

        await session.abortTransaction();
        session.endSession();
        console.error("Error deleting booking:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}



module.exports = { newBooking,getBookingById,deleteBookingById};
