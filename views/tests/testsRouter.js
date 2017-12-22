const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {Test} = require('./../../models');
const {User} = require('./../../models');
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


//GET to load user homepage and view user info
router.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname + '/test.html'))
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
        let index;
        test.questions.forEach((question, questionIndex) => {
            if (question._id == req.params.questionid) {
                index = questionIndex
            }
        });
        test.questions.splice(index, 1);
        test.save();
        res.json(test.apiRepr());
    });
});

//DELETE to delete test
router.delete('/list/delete/:testid', (req, res) => {
    console.log(req.params.testid);
    Test.findByIdAndRemove(req.params.testid, function (err, test) {
        const response = {
            message: "Successfully deleted",
            id: req.testid
        };
        if (err) {
            'Something went horribly wrong!'
        } else {
            res.send(response);
        }
    })
});

 //GET to view individual tests after selection from dropdown 
router.get('/list/:id', (req, res) => {
    let id = req.params.id;
    return Test.findOne({_id: id})
        .then(test => {
            res.json(test.apiRepr());
        })
})

//Get for user to take a test
router.get('/test/:id', (req, res) => {
    let id = req.params.id;
    return Test.findOne({_id: id})
        .then(test => {
            res.json(test.apiRepr());
        })
})

//Get info for single admin
router.get('/admin/:id', (req, res) => {
    if (req.headers.token === '1234') {
        return User.findOne({_id: req.params.id})
        .then(user => {
            res.json(user.apiRepr());
        });
    } else {
        res.json('Forbidden');
    }

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