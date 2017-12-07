const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {User} = require('./../../models');
const config = require('./../../config');
const passportLocal = require('passport-local');

const createAuthToken = user => {
    return jwt.sign({user}, config.JWT_SECRET, {
      subject: user.username,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256'
    });
  };

router.get('/adminLogin', (req, res) => {
    res.sendFile(path.join(__dirname + '/adminLogin.html'));
});

router.get('/adminSignup', (req, res) => {
    res.sendFile(path.join(__dirname + '/adminSignup.html'));
});

router.get('/userLogin', (req, res) => {
    res.sendFile(path.join(__dirname + '/userLogin.html'));
});


let adminToken = '1234';

router.post('/adminLogin', jsonParser, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    User.findOne({username: username, password: password, type: 'admin'}, (err, user) => {
        console.log(err, user);
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        else if (!user) {
            return res.status(404).send();
        }
        else {
            return res.status(200).json({token: adminToken});
        }
    });
});

let token = "abcd";
const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());

router.post('/userLogin', localAuth, (req, res) => {
    const authToken = createAuthToken(req.user.serialize());
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    User.findOne({username: username, password: password, type: 'user'}, (err, user) => {
        console.log(err, user);
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        else if (!user) {
            console.log("blah");
            return res.status(404).send();
        }
        else {
            return res.status(200).json({
                authToken,
                userId: user._id
            });
        }
    });
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//POST to create new admin
router.post('/admin/create', jsonParser, (req, res) => {

    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => (!field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    const stringFields = ['firstName', 'lastName', 'username', 'password'];
    const nonStringFields = stringFields.find(
        field => field in req.body && typeof req.body[field] !== 'string'
    );

    if (nonStringFields) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringFields
        });
    };

    const explicitylyTrimmedFields = ['username', 'password'];
    const nonTrimmedFields = explicitylyTrimmedFields.find(
      field => req.body[field].trim() !== req.body[field]  
    );

    if (nonTrimmedFields) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedFields
        });
    };

    const sizedFields = {
        username: {
            min: 1
        },
        password: {
            min: 10,
            max: 72
        }
    };
    const tooSmallField = Object.keys(sizedFields).find(
        field => 'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min
    );
    const tooLargeField = Object.keys(sizedFields).find(
        field => 'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max
    );

    if (tooSmallField || tooLargeField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: tooSmallField
                ? `Must be at least ${sizedFields[tooSmallField]
                      .min} characters long`
                : `Must be at most ${sizedFields[tooLargeField]
                      .max} characters long`,
            location: tooSmallField || tooLargeField
        });
    };

    let {username, password, firstName = '', lastName = ''} = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();

    return User.find({username})
        .count()
        .then(count => {
            if (count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
            }
            return User.hashPassword(password);
        })
        .then(hash => {
            return User.create({
                username,
                password: hash,
                name: {firstName, lastName},
                type: 'admin'
            })
        })
        .then(user => {
            return res.status(201).json(user.apiRepr());
        })
        .catch(err => {
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({code: 500, message: err});
        });
});

//POST to create new user
router.post('/users/create', jsonParser, (req, res) => {
    
        const requiredFields = ['username', 'password'];
        const missingField = requiredFields.find(field => (!field in req.body));
    
        if (missingField) {
            return res.status(422).json({
                code: 422,
                reason: 'ValidationError',
                message: 'Missing field',
                location: missingField
            });
        }
    
        const stringFields = ['firstName', 'lastName', 'username', 'password'];
        const nonStringFields = stringFields.find(
            field => field in req.body && typeof req.body[field] !== 'string'
        );
    
        if (nonStringFields) {
            return res.status(422).json({
                code: 422,
                reason: 'ValidationError',
                message: 'Incorrect field type: expected string',
                location: nonStringFields
            });
        };
    
        const explicitylyTrimmedFields = ['username', 'password'];
        const nonTrimmedFields = explicitylyTrimmedFields.find(
          field => req.body[field].trim() !== req.body[field]  
        );
    
        if (nonTrimmedFields) {
            return res.status(422).json({
                code: 422,
                reason: 'ValidationError',
                message: 'Cannot start or end with whitespace',
                location: nonTrimmedFields
            });
        };
    
        const sizedFields = {
            username: {
                min: 1
            },
            password: {
                min: 10,
                max: 72
            }
        };
        const tooSmallField = Object.keys(sizedFields).find(
            field => 'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].min
        );
        const tooLargeField = Object.keys(sizedFields).find(
            field => 'max' in sizedFields[field] && req.body[field].trim().length > sizedFields[field].max
        );
    
        if (tooSmallField || tooLargeField) {
            return res.status(422).json({
                code: 422,
                reason: 'ValidationError',
                message: tooSmallField
                    ? `Must be at least ${sizedFields[tooSmallField]
                          .min} characters long`
                    : `Must be at most ${sizedFields[tooLargeField]
                          .max} characters long`,
                location: tooSmallField || tooLargeField
            });
        };
    
        let {username, password, firstName = '', lastName = ''} = req.body;
        firstName = firstName.trim();
        lastName = lastName.trim();
    
        return User.find({username})
            .count()
            .then(count => {
                if (count > 0) {
                    return Promise.reject({
                        code: 422,
                        reason: 'ValidationError',
                        message: 'Username already taken',
                        location: 'username'
                    });
                }
                return User.hashPassword(password);
            })
            .then(hash => {
                return User.create({
                    username,
                    password: hash,
                    name: {firstName, lastName},
                    type: 'user'
                })
            })
            .then(user => {
                return res.status(201).json(user.apiRepr());
            })
            .catch(err => {
                if (err.reason === 'ValidationError') {
                    return res.status(err.code).json(err);
                }
                res.status(500).json({code: 500, message: err});
            });
    });


module.exports = router;
