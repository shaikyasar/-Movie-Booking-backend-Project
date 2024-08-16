const express = require('express');
const router = express.Router();
const { getAllUsers, addUser, login, updateUser,deleteUser,getbookingUser} = require('../controllers/user-controller');

// Route to get all users
router.get('/all', getAllUsers);
router.post("/signup",addUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser)
router.post("/login",login);

router.get("/booking/:id",getbookingUser);
module.exports = router;
