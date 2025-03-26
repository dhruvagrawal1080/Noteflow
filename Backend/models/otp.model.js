const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
        index: { expires: "0m" },
    },    
    used: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('OTP', OTPSchema);
