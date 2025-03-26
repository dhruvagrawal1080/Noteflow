const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { updateProfile, updateProfilePicture } = require('../controllers/profile.controller');

router.put('/update-profile', auth, updateProfile);
router.put("/update-profile-picture", auth, updateProfilePicture);

module.exports = router;