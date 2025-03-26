const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ms = require('ms');
const dotenv = require('dotenv');
const mailSender = require('../utils/mailSender');
const { OAuth2Client } = require('google-auth-library');
const { welcomeEmail } = require('../templates/WelcomeTemplate');
const { resetPasswordEmail } = require('../templates/resetPasswordTemplate');
const { passwordUpdatedEmail } = require('../templates/passwordUpdateTemplate');
const { otpEmail } = require('../templates/otpTemplate');
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body; // Get the Google ID Token from frontend
        if (!token) {
            return res.status(400).json({
                message: 'Token is missing'
            });
        }

        // Verify the token with Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload(); // Get user info from Google
        const { email, given_name, family_name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            // If user does not exist, create new user
            user = await User.create({
                firstName: given_name,
                lastName: family_name,
                email,
                image: picture,
                password: null, // No password since they are using Google
            });

            mailSender(
                email,
                '🎉 Welcome to NoteFlow!',
                welcomeEmail(user.firstName, user.lastName, user.email)
            )
        }

        // Generate JWT token
        const jwtToken = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.cookie('token', jwtToken, {
            expires: new Date(Date.now() + ms(process.env.JWT_EXPIRES_IN)),
            httpOnly: true
        }).status(201).json({
            success: true,
            message: 'Google login successfull',
            user,
            token: jwtToken
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Google login failed',
            error: err.message
        });
    }
};

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'Please fill otp'
            })
        }

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const otpRecords = await OTP.find({ email }).sort({ expiresAt: -1 }).limit(1);
        if (otpRecords.length === 0 || otp != otpRecords[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        const latestOtpRecord = otpRecords[0];

        // Check if OTP is correct
        if (latestOtpRecord.otp !== parseInt(otp)) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Check if OTP is already used
        if (latestOtpRecord.used) {
            return res.status(400).json({
                success: false,
                message: "OTP has already been used"
            });
        }

        // Mark OTP as used
        latestOtpRecord.used = true;
        await latestOtpRecord.save();

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            gender: null,
            dob: null,
            about: null,
            contactNumber: null
        })

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // mail user for congratulation of account creation
        mailSender(
            email,
            '🎉 Welcome to NoteFlow!',
            welcomeEmail(user.firstName, user.lastName, user.email)
        )

        res.cookie('token', token, {
            expires: new Date(Date.now() + ms(process.env.JWT_EXPIRES_IN)),
            httpOnly: true
        }).status(201).json({
            success: true,
            message: 'User created successfully',
            user,
            token
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: 'invaid credentials'
            });
        }

        const hashedPassword = user.password;
        if (!hashedPassword) {
            return res.status(401).json({
                message: 'invaid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({
                message: 'invaid credentials'
            });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.cookie('token', token, {
            expires: new Date(Date.now() + ms(process.env.JWT_EXPIRES_IN)),
            httpOnly: true
        }).status(200).json({
            success: true,
            user,
            token,
            message: 'login success',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'logout success'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'Please provide email'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const resetPasswordToken = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save();

        // mail user for reset password link
        const resetUrl = `${process.env.FRONTEND_URL}/updatePassword/${resetPasswordToken}`;

        await mailSender(
            email,
            '🔒 Reset Your Password',
            resetPasswordEmail(resetUrl)
        );

        res.status(200).json({
            success: true,
            message: 'Reset password link sent to your email'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { password, token } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide token and password'
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid or Expired token'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save();

        // mail user for password update
        await mailSender(
            user.email,
            '🔑 Password Updated Successfully',
            passwordUpdatedEmail()
        );

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email'
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const otp = crypto.randomInt(100000, 999999);

        await OTP.create({ otp, email });
        await mailSender(
            user.email,
            '🔐 OTP Sent Successfully',
            otpEmail(otp)
        );

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}