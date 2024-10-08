const express = require('express');
const mongoose = require('mongoose');
const router = require("../backend/routes/user-router");
const booking_router=require("../backend/routes/booking-router");
const admin_router = require("../backend/routes/admin-router");
const movie_router = require("../backend/routes/movie-router");





const app = express();

app.use(express.json());
app.use("/user", router);

app.use("/admin", admin_router);
app.use("/movie",movie_router);
app.use("/booking",booking_router);



// Connect to MongoDB
//paste your connection string in the .connect ("your string");
mongoose.connect("your_coonection string", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(5000, () => {
            console.log(`Server is running on http://localhost:5000`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

