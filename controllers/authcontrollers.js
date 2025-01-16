const { generateOTP, isOTPExpired } = require('../services/otp.service');
const { sendOTPEmail } = require('../services/Email.confiq.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// Temporary in-memory store for OTP verification
const otpStore = new Map();

const signup = async (req, res) => {
    const { fullName, username, email, password } = req.body;

    // Check if OTP is already sent to the email
    if (otpStore.has(email)) {
        return res.status(400).json({ message: 'OTP already sent. Please verify your email.' });
    }

    try {
        // Generate OTP 
        const otp = generateOTP();

        // Store OTP and user data temporarily
        otpStore.set(email, {
            otp,
            fullName,
            username,
            password,
            otpExpiry: Date.now() + 5 * 60 * 1000, // Valid for 5 minutes
        });

        // Send OTP to email
        await sendOTPEmail(email, otp);

        res.status(201).json({ message: 'OTP sent to email. Please verify to complete registration.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    // Retrieve OTP data from the temporary store
    const userData = otpStore.get(email);

    if (!userData) {
        return res.status(400).json({ message: 'Invalid or expired OTP request.' });
    }

    if (isOTPExpired(userData.otpExpiry)) {
        otpStore.delete(email); // Clear expired data
        return res.status(400).json({ message: 'OTP expired' });
    }

    if (userData.otp !== otp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    try {
        // Save user data to the database
        const newUser = new User({
            fullName: userData.fullName,
            username: userData.username,
            email,
            password: userData.password,
            isVerified: true,
        });
        await newUser.save();

        // Clear OTP data after verification
        otpStore.delete(email);

        res.status(200).json({ message: 'Email verified and user registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
        return res.status(400).json({ message: 'Email not verified' });
    }

    // Password match check (use bcrypt.compare in a real application)
    if (password !== user.password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, "virendra", { expiresIn: '48h' });
    res.status(200).json({ message: 'Login successful', token });
};

module.exports = { signup, verifyOTP, login };