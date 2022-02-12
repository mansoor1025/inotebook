const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    created_at: {
        type: String,
        required: true,
        default: moment().format()
    },
});
const notes = mongoose.model('notes', NotesSchema);
module.exports = notes