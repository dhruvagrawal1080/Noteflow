const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote, favoriteNote, removeFavoriteNote, getFavoriteNotes, shareNote, updateShare, getNotesSharedWithMe, updateSharedNote, getNotesSharedByMe } = require('../controllers/note.controller');
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

module.exports = router;