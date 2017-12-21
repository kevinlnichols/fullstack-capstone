const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();
const path = require('path');
const {User} = require('./../../models');
const {Test} = require('./../../models');
const logout = require('express-passport-logout');

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
        });
    } else {
        res.json('Forbidden');
    }

})

//PUT to update user with test info
router.put('/results', jsonParser, (req, res) => {
    const requiredFields = ['userId', 'testId', 'answerRight', 'answerWrong'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    User.findById(req.body.userId)
        .then(user => {
            let currentUser = user.apiRepr();
            console.log(req.body.testId);
            console.log(user.results);
            //user.results = user.results ? user.results : {};
            let test = { 
                answerRight: req.body.answerRight,
                answerWrong: req.body.answerWrong
            }
            console.log(currentUser.results);
            currentUser.results = currentUser.results ? currentUser.results : {};
            console.log(currentUser.results);
            console.log(req.body.testId);
            currentUser.results[req.body.testId] = test;
            console.log(currentUser.results);
            user.results = currentUser.results;
            console.log(user.results);
            user.save()
            .then(user => {
                res.status(200).json(user);
                
            })
        })
    
    
})

router.get('/userLogout', logout());


module.exports = router;