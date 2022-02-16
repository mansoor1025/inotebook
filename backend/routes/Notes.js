const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');
const FetchUsers = require('../middleware/FetchUsers');
const notes = require('../models/Notes');

// Route 1: Add notes
router.post('/add-note', FetchUsers, [
    body('title', 'title is required').exists(),
    body('description', 'description is required').exists()
], async (req, res,) => {
    const { title, description, tags } = req.body;

    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // save notes
    const note = new notes({
        user_id: req.user.id,
        title: title,
        description: description,
        tags: tags
    });

    const save_note = await note.save();
    res.status(200).json({ success: save_note });

})

// Route 2: fetch all notes
router.get('/fetch-notes', FetchUsers, [
    query('user_id', 'user_id is required').exists()
], async (req, res,) => {

    const { user_id } = req.query;

    // check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // fetching all notes from db
    const note = await notes.find({ user_id: user_id })
    res.status(200).json({ success: note });

})


module.exports = router;