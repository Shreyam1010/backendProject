const express = require('express');
const { registerUser,loginUser } = require('../controllers/authController');
const router = express.Router();

// POST route for user registration
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;
