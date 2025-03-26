const mongoose = require("mongoose");
const Note = require('../models/note.model');
const User = require('../models/user.model');
const { noteSharedEmail } = require("../templates/noteSharedWithYouTemplate");
const mailSender = require("../utils/mailSender");

// Note controller
exports.createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and Content are required'
            });
        }

        let note = new Note({
            title,
            content,
            createdBy: req.user._id,
            sharedWith: [{ user: req.user._id, permission: 'edit' }]
        });
        await note.save();

        await User.findByIdAndUpdate(req.user._id, { $push: { notes: note._id } });

        note = await Note.findById(note._id).populate({
            path: 'sharedWith.user',
            select: 'email firstName lastName image'
        });

        return res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: note
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'notes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        });
        const allNotes = user.notes
        if (!allNotes || allNotes.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No notes found'
            });
        }

        return res.status(200).json({
            success: true,
            data: allNotes,
            favoriteNotes: user.favoriteNotes
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.getNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Note ID",
            });
        }

        const note = await Note.findById(id).populate("createdBy", "firstName lastName email");
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Note retrieved successfully",
            note,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
};


exports.updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and Content are required'
            });
        }

        const note = await Note.findOne({ _id: req.params.id });
        if (!note) {
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });
        }

        note.title = title;
        note.content = content;
        await note.save();

        const user = await User.findById(req.user._id).populate({
            path: 'notes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'note updated successfully',
            data: user.notes,
            favoriteNotes: user.favoriteNotes
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

// Shared note controller
exports.getNotesSharedWithMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'sharedNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Notes shared with you retrieved successfully',
            sharedNotes: user.sharedNotes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getNotesSharedByMe = async (req, res) => {
    try {
        // Find notes created by the user that are shared with others
        const notes = await Note.find({
            createdBy: req.user._id,
            sharedWith: { $exists: true, $ne: [], $elemMatch: { "user": { $ne: req.user._id } } } // Ensure it's actually shared
        }).populate('sharedWith.user', 'firstName lastName email image');

        return res.status(200).json({
            success: true,
            message: "Notes shared by you retrieved successfully",
            sharedNotes: notes
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.updateSharedNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Title and Content are required'
            });
        }

        const note = await Note.findById(req.params.id).populate({
            path: 'sharedWith.user',
            select: 'firstName lastName email image'
        })
        if (!note) {
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });
        }

        // Check if the user is in the shared list with 'edit' permission
        const sharedUser = note.sharedWith.find(
            (entry) => entry.user._id.toString() === req.user._id && entry.permission === "edit"
        );
        if (!sharedUser) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to edit this note",
            });
        }

        note.title = title;
        note.content = content;
        await note.save();

        return res.status(200).json({
            success: true,
            message: 'note updated successfully',
            data: note
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

exports.shareNote = async (req, res) => {
    try {
        const { noteId, recipientEmail, permission, sender } = req.body;

        if (!noteId || !recipientEmail) {
            return res.status(400).json({
                success: false,
                message: 'Note ID and recipient email are required'
            });
        }

        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        // Fetch the recipient user
        const recipient = await User.findOne({ email: recipientEmail });
        if (!recipient) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if the note is already shared with the recipient
        if (note.sharedWith.some(entry => entry.user.toString() === recipient._id.toString())) {
            return res.status(400).json({
                success: false,
                message: 'Note is already shared with this user'
            });
        }

        // Update the `sharedWith` field in Note model
        note.sharedWith.push({ user: recipient._id, permission });
        await note.save();

        // Update the `sharedNotes` field in the recipient's User model
        recipient.sharedNotes.push(noteId);
        await recipient.save();

        const user = await User.findById(req.user._id).populate({
            path: 'notes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        });

        mailSender(
            recipientEmail,
            "📌 A Note has been Shared with You!",
            noteSharedEmail(recipient.firstName, recipient.lastName, sender.firstName, sender.lastName, note.title, note.content, `${process.env.FRONTEND_URL}/note/${note._id}`)
        )

        return res.status(200).json({
            success: true,
            message: 'Note shared successfully',
            notes: user.notes,
            favoriteNotes: user.favoriteNotes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.updateShare = async (req, res) => {
    try {
        const { noteId, recipientEmail, permission } = req.body;

        if (!noteId || !recipientEmail || !permission) {
            return res.status(400).json({
                success: false,
                message: 'Note ID, recipient email, and permission are required'
            });
        }

        const note = await Note.findById(noteId).populate('sharedWith.user', 'firstName lastName email image');
        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        const recipient = await User.findOne({ email: recipientEmail });
        if (!recipient) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Find shared entry index
        const sharedIndex = note.sharedWith.findIndex(entry => entry.user._id.toString() === recipient._id.toString());
        if (sharedIndex === -1) {
            return res.status(400).json({
                success: false,
                message: 'User does not have shared access to this note'
            });
        }

        if (permission === "remove") {
            // Remove the user from shared access
            note.sharedWith.splice(sharedIndex, 1);

            // Also remove from recipient's `sharedNotes`
            recipient.sharedNotes = recipient.sharedNotes.filter(id => id.toString() !== noteId);

            // Also remove from recipient's `favoriteNotes`
            recipient.favoriteNotes = recipient.favoriteNotes.filter(id => id.toString() !== noteId);
        } else {
            // Update the permission
            note.sharedWith[sharedIndex].permission = permission;
        }

        await note.save();
        await recipient.save();

        // Fetch updated notes with populated `sharedWith` users
        const user = await User.findById(req.user._id).populate({
            path: 'notes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email image'
            }
        });

        return res.status(200).json({
            success: true,
            message: permission === "remove" ? "User removed from shared access" : "Permission updated successfully",
            notes: user.notes,
            favoriteNotes: user.favoriteNotes,
            updatedNote: note
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Favorite note controller
exports.favoriteNote = async (req, res) => {
    try {
        const { noteId } = req.body;
        if (!noteId) {
            return res.status(400).json({
                success: false,
                message: 'Note ID is required',
            });
        }

        const note = await Note.findById(noteId).populate({
            path: 'sharedWith.user',
            select: 'email firstName lastName image',
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found',
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Check if the note is already in favorites
        if (user.favoriteNotes.some((favNote) => favNote._id.toString() === noteId)) {
            return res.status(400).json({
                success: false,
                message: 'Note is already in favorites',
            });
        }

        // Add the note to the user's favoriteNotes
        user.favoriteNotes.push(noteId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Note added to favorites successfully',
            note
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.removeFavoriteNote = async (req, res) => {
    try {
        const { noteId } = req.body;
        if (!noteId) {
            return res.status(400).json({
                success: false,
                message: 'Note ID is required'
            });
        }

        const note = await Note.findById(noteId).populate({
            path: 'sharedWith.user',
            select: 'email firstName lastName image',
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.favoriteNotes.some(favNote => favNote._id.toString() == noteId)) {
            return res.status(400).json({
                success: false,
                message: 'Note is not in favorites'
            });
        }

        // Remove the note from the user's favoriteNotes
        user.favoriteNotes = user.favoriteNotes.filter(favNote => favNote._id.toString() !== noteId);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Note removed from favorites successfully',
            note
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getFavoriteNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'email firstName lastName image'
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: user.favoriteNotes.length > 0 ? 'Favorite notes retrieved successfully' : 'No favorite notes found',
            notes: user.favoriteNotes
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete note controller
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });
        }

        const user = await User.findById(req.user._id);

        // If note is already in trash, permanently delete it
        if (note.deletedAt) {
            await Note.findByIdAndDelete(req.params.id);

            // Update the user's trashedNotes
            user.trashedNotes = user.trashedNotes.filter(noteId => noteId.toString() !== req.params.id);
            await user.save();

            // Get updated trashed notes
            const updatedUser = await User.findById(req.user._id)
                .populate('notes')
                .populate('trashedNotes')
                .populate('favoriteNotes');

            return res.status(200).json({
                success: true,
                message: 'Note permanently deleted',
                trashedNotes: updatedUser.trashedNotes,
                myNotes: updatedUser.notes,
                favoriteNotes: updatedUser.favoriteNotes
            });
        }

        // Move note to trash
        note.deletedAt = new Date();

        // Remove the note from User's `notes`, `favoriteNotes`, `sharedNotes`
        user.notes = user.notes.filter(noteId => noteId.toString() !== req.params.id);
        user.favoriteNotes = user.favoriteNotes.filter(noteId => noteId.toString() !== req.params.id);
        if (!user.trashedNotes.includes(req.params.id)) { // Add to trash
            user.trashedNotes.push(req.params.id);
        }
        await user.save();

        if (note.sharedWith.length > 0) {
            await User.updateMany(
                { _id: { $in: note.sharedWith.map(entry => entry.user) } },
                { $pull: { sharedNotes: req.params.id } }
            );

            // Clear sharedWith list
            note.sharedWith = [];
            await note.save();
        }

        // Populate trashedNotes before sending response
        const updatedUser = await User.findById(req.user._id)
            .populate('notes')
            .populate('trashedNotes')
            .populate('favoriteNotes');

        return res.status(200).json({
            success: true,
            message: 'Note moved to trash',
            trashedNotes: updatedUser.trashedNotes,
            myNotes: updatedUser.notes,
            favoriteNotes: updatedUser.favoriteNotes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.restoreNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note || !note.deletedAt) {
            return res.status(400).json({
                success: false,
                message: 'Note not found or not in trash'
            });
        }

        // Restore the note
        note.deletedAt = null;

        // Ensure the owner has edit access after restoration
        const userId = req.user._id.toString();
        const alreadyShared = note.sharedWith.some(entry => entry.user.toString() === userId);

        if (!alreadyShared) {
            note.sharedWith.push({ user: userId, permission: 'edit' });
        }
        await note.save();

        // Update the user's notes and trashedNotes
        const user = await User.findById(req.user._id);
        user.trashedNotes = user.trashedNotes.filter(noteId => noteId.toString() !== req.params.id);

        // Ensure the note is added back to user's notes (if not already)
        if (!user.notes.includes(req.params.id)) {
            user.notes.push(req.params.id);
        }
        await user.save();

        // Populate updated notes and trashed notes before sending response
        const updatedUser = await User.findById(req.user._id)
            .populate('notes')
            .populate('trashedNotes');

        return res.status(200).json({
            success: true,
            message: 'Note restored successfully',
            myNotes: updatedUser.notes,
            trashedNotes: updatedUser.trashedNotes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getTrashedNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('trashedNotes');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Trashed notes retrieved successfully',
            trashedNotes: user.trashedNotes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};