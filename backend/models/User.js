const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true,
        default: moment().format()
    },
});
const user = mongoose.model('user', UserSchema);
module.exports = user