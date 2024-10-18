const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config()

const UserModel = require('../models/user.model');
const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    try {
        if (!firstname && !lastname && !username && !email && !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ firstname, lastname, username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message, msg: 'Internal Server Error' });
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        } else {
            const token = jwt.sign({ ...user }, process.env.SECRETKEY)
            res.json({ message: 'User logged in successfully', token });
        }

    } catch (err) {
        return res.status(404).json({ msg: 'internal server error', message: err });
    }
})

module.exports = userRoute;