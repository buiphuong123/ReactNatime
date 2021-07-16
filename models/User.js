const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    resetPasswordToken: {
        type: String, 
        require: false,
    },
    resetPasswordExpires: {
        type: Date,
        require: false,
    }
}); 

module.exports = mongoose.model('User', userSchema);