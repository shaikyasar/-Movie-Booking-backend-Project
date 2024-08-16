const express = require('express');

const booking_router = express.Router();
const { newBooking,getBookingById,deleteBookingById }=require("../controllers/booking-controller");
// // const newBooking = require('../controllers/booking-controller');

booking_router.post("/",newBooking);

booking_router.get("/:id", getBookingById);
booking_router.delete("/:id", deleteBookingById);


module.exports = booking_router;

