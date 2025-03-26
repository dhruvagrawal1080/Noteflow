const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            default: null  // Google users won't have a password
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        gender: {
            type: String,
        },
        dob: {
            type: Date,
        },
        about: {
            type: String,
        },
        contactNumber: {
            type: Number,
        },
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Note'
            }
        ],
        sharedNotes: [  // notes that are shared with me by someone
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Note'
            }
        ],
        favoriteNotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Note'
            }
        ],
        trashedNotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Note'
            }
        ],
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
    }, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);