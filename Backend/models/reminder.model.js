const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateTime: { // Combined Date & Time
        type: Date,
        required: true
    },
    isSent: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = mongoose.model("Reminder", ReminderSchema);