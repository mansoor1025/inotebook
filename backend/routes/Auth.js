const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const FetchUsers = require('../middleware/FetchUsers');
// secret jwt token
const jwt_secret = "dasdasdasdas";

// Route:1 add user 
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

// Route:2 login user
router.post('/login', [
    body('email', 'Enter valid Email').isEmail(),
    body('email', 'email is required').exists(),
    body('password', 'password is required').exists()
], async (req, res,) => {
    try {
        const { email, password } = req.body;

        // check validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // finding user via email
        const check_user = await User.findOne({ email: email });

        // check whether user exists
        if (!check_user) {
            return res.status(400).send('username and password did not matched')
        }

        // if user exists in our db now compare password with email

        const compare_password = await bcrypt.compare(password, check_user.password);

        // if password did not matched 
        if (!compare_password) {
            return res.status(400).send('username and password did not matched')
        }

        // jwt payload data
        const data = {
            user_id: {
                id: check_user._id
            }
        }
        // generating auth token
        const auth_token = jwt.sign(data, jwt_secret);
        res.json({ auth_token });

    } catch (error) {
        // logging errors
        console.log(error);
        res.send(error)
    }
})

// Route:3 get user
router.post('/get-user', FetchUsers, async (req, res,) => {
    try {
        const user_id = req.user.id;

        // fetch user details with userid
        const user_details = await User.findOne({ _id: user_id }).select('-password');
        res.status(200).json({ success: user_details })
    } catch (error) {
        // logging errors
        console.log(error);
        res.send(error)
    }
})

module.exports = router;