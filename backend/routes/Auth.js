const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.post('/add-user', async (req, res,) => {
    try {
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