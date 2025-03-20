const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, favoriteNote, removeFavoriteNote, getFavoriteNotes, shareNote, updateShare, getNotesSharedWithMe, updateSharedNote, getNotesSharedByMe, deleteNote, restoreNote, getTrashedNotes } = require('../controllers/note.controller');
const { auth } = require('../middleware/auth');

router.post('/createNote', auth, createNote);
router.get('/getNotes', auth, getNotes);
router.put('/updateNote/:id', auth, updateNote);
router.delete('/deleteNote/:id', auth, deleteNote);

// favorite notes related routes
router.post('/favoriteNote', auth, favoriteNote);
router.delete('/removeFavoriteNote', auth, removeFavoriteNote);
router.get('/getFavoriteNotes', auth, getFavoriteNotes);

// share notes related routes
router.post('/shareNote', auth, shareNote);
router.put('/updateShare', auth, updateShare);
router.get('/shared-with-me', auth, getNotesSharedWithMe);
router.get('/shared-by-me', auth, getNotesSharedByMe);
router.put('/update-shared-note/:id', auth, updateSharedNote);

// delete notes related routes
router.delete('/delete-note/:id', auth, deleteNote);
router.put('/restore-note/:id', auth, restoreNote);
router.get('/getTrashedNotes', auth, getTrashedNotes);

module.exports = router;