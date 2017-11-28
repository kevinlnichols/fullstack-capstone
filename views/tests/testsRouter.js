const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Test} = require('./../../models');

router.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname + '/create.html'));
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

router.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname + '/view.html'));
})

router.get('/adminHome', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

//GET to view tests
router.get('/list', (req, res) => {
    return Test.find()
        .then(tests => {
            res.json(tests.map(test => {
                return test.apiRepr();
            }));
        })
})

//POST to create new test
router.post('/create', jsonParser, (req, res) => {
    
        const requiredFields = ['questions', 'testTitle'];
        const missingField = requiredFields.find(field => (!field in req.body));
        if (missingField) {
            return res.status(422).json({
                code: 422,
                reason: 'ValidationError',
                message: 'Missing field',
                location: missingField
            });
        }
        const {questions, testTitle} = req.body;        
        console.log(questions);
            return Test.create({
                    testTitle,
                    questions
                })
            .then(test => {
                return res.status(201).json(test.apiRepr());
            })
            .catch(err => {
                if (err.reason === 'ValidationError') {
                    return res.status(err.code).json(err);
                }
                res.status(500).json({code: 500, message: err});
            });
});


module.exports = router;