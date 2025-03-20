const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        task: {
            type: String,
            required: true,
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);