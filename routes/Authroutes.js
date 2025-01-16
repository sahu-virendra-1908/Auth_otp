

// const express = require('express');
// const {register } = require('../controllers/authcontrollers');
// const router = express.Router();

// router.post('/signup',register )
// module.exports = {router}; ; 

const express = require('express');
const { signup, verifyOTP, login } = require('../controllers/authcontrollers');
// const {  validate } = require('../validation/validate');

const router = express.Router();

// Signup route
router.post('/signup',  signup);

// Verify OTP route
router.post('/verify-otp', verifyOTP);

// Login route
router.post('/login', login);

module.exports = router;

