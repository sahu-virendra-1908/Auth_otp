

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'vspawan9@gmail.com',
//         pass: 'naxa pxaj ioel cggt'
//     }
// });

// const sendMail = async (email , otp) => {
//     const mailOptions = {
//         from: 'vspawan9@gmail.com',
//         to: '23bcs124@nith.ac.in',
//         subject: 'Sending Email using Node.js',
//         text: `${otp}`
//     };

//     try {
//         await transporter.verify();
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//     } catch (error) {
//         console.error('Error while sending email:', error);
//     }
// };

// sendMail('23bcs124@nith.ac.in', 1234);

const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vspawan9@gmail.com',
        pass: 'naxa pxaj ioel cggt'
    },
});

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: 'vspawan9@gmail.com',
        to: email,
        subject: 'Your OTP for Email Verification',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    try {
        const res=await transporter.sendMail(mailOptions);
        console.log(res);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};


// sendOTPEmail('23bcs124@nith.ac.in', 1234)
module.exports = { sendOTPEmail };
