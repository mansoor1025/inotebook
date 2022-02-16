const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
// secret jwt token
const jwt_secret = "dasdasdasdas";
router.post('/add-user', [
    body('name', 'name is required').exists(),
    body('email').isEmail().exists(),
    body('password', 'password is required').exists()
], async (req, res,) => {
    try {
        const saltRounds = 10;
        let secure_password = '';

        // check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // duplicate email validations
        const user = await User.find({ email: req.body.email });
        if (user.length > 0) {
            res.status('400').send('Email Already Exists');
        }

        // create hash password with gensalt
        await bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
            const users = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }
            await new User(users).save();

            const user_data = await User.find({ email: req.body.email });

            // jwt payload data
            const data = {
                user_id: {
                    id: user_data[0]._id
                }
            }
            // generating auth token
            const auth_token = await jwt.sign(data, jwt_secret);
            res.json({ auth_token });
        });
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;