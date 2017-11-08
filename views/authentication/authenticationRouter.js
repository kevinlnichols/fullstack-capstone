const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const jsonParser = bodyParser.json();

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

router.post('/admin/create', jsonParser, (req, res) => {
    console.log('receiving data');
    console.log(req.body);
});


module.exports = router;