const express = require('express');
const router = express.Router();
const path = require('path');
const {User} = require('./../../models');

router.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname + '/create.html'));
});

router.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname + '/view.html'));
})

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/userHome.html'));
})

//GET to view users
router.get('/list', (req, res) => {
    return User.find()
        .then(users => {
            res.json(users.map(user => {
                return user.apiRepr();
            }));
        })
})

module.exports = router;