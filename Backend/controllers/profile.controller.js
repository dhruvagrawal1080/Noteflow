const User = require('../models/user.model');
const { uploadFileToCloudinary } = require('../utils/uploadFileToCloudinary');

exports.updateProfile = async (req, res) => {
    try {
        const updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err.message,
        });
    }
};

exports.updateProfilePicture = async (req, res) => {
    try {
        const updatedImage = req.files?.profileImage;
        console.log('updatedImage', updatedImage);

        const image = await uploadFileToCloudinary(updatedImage, process.env.FOLDER_NAME, 1000, 1000);
        console.log('image', image);

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: req.user._id },
            { image: image.url },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: 'Image Updated successfully',
            user: updatedProfile,
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};