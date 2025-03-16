const Note = require('../models/note.model');
const User = require('../models/user.model');

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
            select: 'email firstName lastName'
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
                select: 'firstName lastName email'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email'
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
                select: 'firstName lastName email'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email'
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

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete({ _id: req.params.id });
        if (!note) {
            return res.status(400).json({
                success: false,
                message: 'Note not found'
            });
        }
        const user = await User.findById(req.user._id);
        user.notes = user.notes.filter(noteId => noteId.toString() !== req.params.id);
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
} // abhi dekhna hai

// Shared note controller
exports.getSharedNotes = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('sharedNotes');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const sharedNotes = user.sharedNotes;

        if (!sharedNotes || sharedNotes.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No notes found'
            });
        }

        return res.status(200).json({
            success: true,
            data: sharedNotes,
            message: 'Shared notes fetched successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
} // abhi dekhna hai - '|'

exports.getNotesSharedWithMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'sharedNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email'
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
        }).populate('sharedWith.user', 'firstName lastName email');

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
            select: 'firstName lastName email'
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
        const { noteId, recipientEmail, permission } = req.body;

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
                select: 'firstName lastName email'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Note shared successfully',
            notes: user.notes,
            favoriteNotes: user.favoriteNotes
        });
    } catch (error) {
        console.error('Error sharing note:', error);
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

        const note = await Note.findById(noteId).populate('sharedWith.user', 'firstName lastName email');
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
                select: 'firstName lastName email'
            }
        }).populate({
            path: 'favoriteNotes',
            populate: {
                path: 'sharedWith.user',
                select: 'firstName lastName email'
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
        console.error('Error updating share:', error);
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
            select: 'email firstName lastName',
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
            select: 'email firstName lastName',
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
                select: 'email firstName lastName'
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