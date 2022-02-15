const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
router.post('/add-user', [
    body('name', 'name is required').exists(),
    body('email').isEmail().exists(),
    body('password', 'password is required').exists()
], async (req, res,) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var users = new User(req.body)
        await users.save();
        res.send('user add successfully');
    } catch (error) {
        console.log('error generating');
        console.log(error);
        res.send(error)
    }
})

module.exports = router;