
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const user = {
    id: 1,
    username: 'testuser',
    password: 'password123'
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === user.username && password === user.password) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;
