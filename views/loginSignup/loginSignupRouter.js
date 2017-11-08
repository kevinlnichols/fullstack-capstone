const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/adminLogin', (req, res) => {
    res.sendFile(path.join(__dirname + '/adminLogin.html'));
});

router.get('/adminSignup', (req, res) => {
    res.sendFile(path.join(__dirname + '/adminSignup.html'));
});

router.get('/userLogin', (req, res) => {
    res.sendFile(path.join(__dirname + '/userLogin.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


module.exports = router;