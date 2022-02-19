const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

// Route 3: updating notes
router.post('/update-notes', FetchUsers, [
    body('note_id', 'note_id is required').exists(),
    body('title', 'title is required').exists(),
    body('description', 'description is required').exists()
], async (req, res,) => {
    const { note_id, title, description, tags } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // note id is valid
    if (!mongoose.Types.ObjectId.isValid(note_id)) {
        return res.status(400).json({ error: "note id is not valid" })
    }

    // finding notes
    const note = await notes.findOne({ _id: note_id });

    // if note_id is not present in db
    if (!note) {
        return res.status(400).json({ error: "Note not found" })
    }

    // checking user is authorized
    if (!note.user_id == req.user.id) {
        return res.status(401).json({ error: "Not Allowed" })
    }

    // notes new updated object
    const update_notes = {
        title: title,
        description: description,
        tags: tags
    }

    // updating notes 
    const updated_notes = await notes.findByIdAndUpdate(note._id, update_notes,
        async function (err, docs) {
            if (err) {
                return res.status(500).json({ error: err })
            }
            else {
                const notes = await notes.findOne({ _id: note._id });
                return res.status(200).json({ success: notes })
            }
        });
})

// Route 4: delete notes

router.post('/delete-notes', FetchUsers, [
    body('note_id', 'note_id is required').exists()
], async (req, res,) => {

    try {
        const { note_id } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // note id is valid
        if (!mongoose.Types.ObjectId.isValid(note_id)) {
            return res.status(400).json({ error: "note id is not valid" })
        }

        // finding notes
        const note = await notes.findOne({ _id: note_id });

        // if note_id is not present in db
        if (!note) {
            return res.status(400).json({ error: "Note not found" })
        }

        // checking user is authorized
        if (!note.user_id == req.user.id) {
            return res.status(401).json({ error: "Not Allowed" })
        }

        // delete notes
        await notes.deleteOne({ _id: note_id });
        return res.status(200).json({ success: "note delete successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Interval Server Error" })
    }
})


module.exports = router;