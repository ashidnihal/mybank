// 1.import mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false // Default to 'false', unless set as admin
    },
    balance: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;




// // 1.import mongoose

// const mongoose = require('mongoose')



// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     accountNumber: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     role: {
//         type: String,
//         enum: ['user', 'admin'], // Limit roles to user or admin
//         default: 'user', // Default role
//     },
//     balance: {
//         type: Number,
//         default: 0
//     },
//     address: {
//         type: String,
//         trim: true
//     },
//     phoneNumber: {
//         type: String,
//         trim: true
//     }, 
   
// },
//  { timestamps: true });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
