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


//GET to view users
router.get('/list', (req, res) => {
    return User.find()
        .then(users => {
            res.json(users.map(user => {
                return user.apiRepr();
            }));
        })
})

//GET to load user homepage and view user info
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'))
})

//Get info for single user
router.get('/list/:id', (req, res) => {
    if (req.headers.token === 'abcd') {
        return User.findOne({_id: req.params.id})
        .then(user => {
            res.json(user.apiRepr());
        })
    } else {
        res.json('Forbidden');
    }

})

module.exports = router;