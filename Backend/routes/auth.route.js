const express = require('express');
const { login, signup, logout, forgotPassword, sendotp, changePassword } = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);

router.post('/sendotp', sendotp);

module.exports = router;