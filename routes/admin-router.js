const express = require('express');
const admin_router = express.Router();
const  {addAdmin,login, getAllAdmins}  = require('../controllers/admin-controller');

// Route to get all users
admin_router.get("/all",getAllAdmins)
admin_router.post("/signup", addAdmin);

admin_router.post("/login", login);
module.exports = admin_router;
