// const mongoose = require('mongoose');

// const Userschema = new mongoose.Schema({
//     name: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     password: {
//         type: String,
//     },
//     isverified: {
//         type: Boolean,
//         default: false,
//     },
//     verificationcode: String,
// }, { timestamps: true });

// const usermodel = mongoose.model('User', Userschema);

// module.exports = usermodel;


const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {

    fullName: {
      type: String,
      required: true,
     
    },
    username: {
      type: String,
      required: true,
   
    },
    password: {
      type: String,
      required: true,
      // match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    },
    email: {
      type: String,
      required: true,
      unique: true,



      
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },



    isVerified: {
      type: Boolean,
      default: false,
  },
  // otp: {
  //     type: String,
  //     default: null,
  // },
  // otpExpiry: {
  //     type: Date,
  //     default: null,
  // },












    branch: {
      type: String,
      enum: ['CSE', 'ECE', 'ME', 'CE', 'EE', 'IPE', 'CSE-DD', 'ECE-DD'],
      // required: true
    },

    field: {
      type: String, 
      enum: ['Web', 'AR/VR', 'App Dev', 'AI/ML', 'Cloud', 'UI/UX'],
      // required: true
    },

    role: {
      type: String,
      enum: [
        "admin",
        "faculty",
        "teamLead",
        "subLead",
        "member",
        "participant",
        "oldMember",
      ],
      default: "participant",
    },
  }
);
const User= mongoose.model("User", UserSchema);
module.exports = User ;

