const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { updateProfile } = require('../controllers/profile.controller');

router.put('/update-profile', auth, updateProfile);

module.exports = router;