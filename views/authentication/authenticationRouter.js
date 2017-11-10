const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const jsonParser = bodyParser.json();
const {User} = require('./../../models');

router.get('/adminLogin', (req, res) => {
    res.sendFile(path.join(__dirname + '/adminLogin.html'));
});

router.get('/adminSignup', (req, res) => {
    res.sendFile(path.join(__dirname + '/adminSignup.html'));
});

router.get('/userLogin', (req, res) => {
    res.sendFile(path.join(__dirname + '/userLogin.html'));
});

User.create({
    name: {
        firstName: "John",
        lastName: "Henry"
    },
    username: "blah",
    password: "rah",
    results: {
        test: {
            answerRight: [],
            answerWrong: []
        }
    },
    type: "user"
});

router.post('/userLogin', jsonParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    User.find({}, (err, user) => {
        console.log(err, user);
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        else if (!user) {
            return res.status(404).send();
        }
        else {
            return res.status(200).send();
        }
    });
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/admin/create', jsonParser, (req, res) => {
    User
        .create({
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            username: req.body.username,
            password: req.body.password
        })
        .then(user => res.status(201).json(user.apiRepr()))
        .catch(err => {
            res.status(500).json({message: 'Error creating user'});
        });
});


module.exports = router;