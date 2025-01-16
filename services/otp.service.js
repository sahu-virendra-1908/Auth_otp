const otpGenerator = require('otp-generator');

// Generate 6-digit OTP
const generateOTP = () => {

    const k = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false });
    console.log('otp is :',k);
    return k;
};




// Validate OTP expiry (check if OTP is expired)
const isOTPExpired = (expiryTime) => {
    return Date.now() > expiryTime;
};

// generateOTP();
module.exports = { generateOTP, isOTPExpired };
