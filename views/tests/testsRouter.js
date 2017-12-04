const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Test} = require('./../../models');
const {Question} = require('./../../models');
const _ = require('lodash');

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

//GET to view tests in dropdown menu
router.get('/list', (req, res) => {
    return Test.find()
        .then(tests => {
            res.json(tests.map(test => {
                return test.apiRepr();
            }));
        })
})

//DELETE to delete question
router.delete('/list/delete/:testid/:questionid', (req, res) => {
    Test.findOne({_id: req.params.testid})
    .then(test => {
        let currentTest = test.apiRepr();
        _.remove(currentTest.questions, {
            _id: req.params.questionid
        });
        res.json(currentTest);
    });
});

 //GET to view individual tests after selection from dropdown 
router.get('/list/:id', (req, res) => {
    let id = req.params.id;
    return Test.findOne({_id: id})
        .then(test => {
            res.json(test.apiRepr());
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