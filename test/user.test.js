const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
const storage = server.storage;

chai.use(chaiHttp);

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');
const {User, Test, Question} = require('../models'); 

function tearDownDb() {
    return new Promise((resolve, reject) => {
      console.warn('Deleting database');
      mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
}

function seedUserData() {
    console.info('seeding user data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
      seedData.push({
        fullName: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName()
        },
        username: faker.internet.userName(),
        password: faker.lorem.words(),
        type: faker.lorem.words()
      });
    }
    return User.insertMany(seedData);
}

function seedQuestionData() {
    console.info('seeding question data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
      seedData.push({
        title: faker.lorem.sentence(),
        answerChoices: {
          choice1: faker.lorem.sentence(),
          choice2: faker.lorem.sentence(),
          choice3: faker.lorem.sentence(),
          choice4: faker.lorem.sentence()
        },
        correctAnswer: faker.lorem.sentence(),
      });
    }
    return Question.insertMany(seedData);
}

function seedTestData() {
    console.info('seeding test data');
    const seedData = [];
    for (let i = 1; i <= 10; i++) {
      seedData.push({
        testTitle: faker.lorem.sentence()
      });
    }
    return Test.insertMany(seedData);
}


describe('user API resource', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
      });

    beforeEach(function() {
        return seedUserData();
    });

    afterEach(function() {
        return tearDownDb();
    });
    
    after(function() {
    return closeServer();
    });

    describe('GET endpoint', function() {
        it('should return all existing users', function() {
            let res;
            return chai.request(app)
                .get('/users/list')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.length.should.be.above(0);
                    return User.count();
                })
                .then(count => {
                    res.body.length.should.be.equal(count);
                });
        });
        it('should return users with the right fields', function() {
            let resPost;
            return chai.request(app)
                .get('/users/list')
                .then(res => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.length.of.at.least(1);
                    res.body.forEach(function(user) {
                        user.should.be.a('object');
                        user.should.include.keys('_id', 'fullName', 'username');
                    });
                    user = res.body[0];
                    return User.findById(user._id);
                })
                .then(user => {
                    user.fullName.should.equal(user.fullName);
                    user.username.should.equal(user.username);
                    user._id.should.equal(user._id);
                });
        })
    });

    describe('POST endpoint', function() {
        it('should add a new user', function() {
            const newUser = {
                fullName: {
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName()
                },
                username: faker.internet.userName(),
                password: faker.lorem.words(),
                type: faker.lorem.words() 
            };
            return chai.request(app)
                .post('/authentication/users/create')
                .send(newUser)
                .then(function(res) {
                    res.should.have.status(201);
                    res.should.have.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('_id', 'fullName', 'username');
                    res.body.fullName.should.equal(`${newUser.fullName.firstName} ${newUser.fullName.lastName}`);
                    res.body._id.should.not.be.null;
                    res.body.username.should.equal(newUser.username);
                    return User.findById(res.body._id);
                })
                .then(function(user) {
                    user.name.firstName.should.equal(newUser.name.firstName);
                    user.name.lastName.should.equal(newUser.name.lastName);
                    user.body.username.should.equal(newUser.username);
                    user.body._id.should.equal(newUser._id);
                });
        });
    });

    describe('PUT endpoint', function () {
        it('should update user with test results', function () {
            const updateData = {
                results: {
                    answerRight: 2,
                    answerWrong: 3
                }
            };
            return User
            .findOne()
            .then(user => {
                updateData._id = user._id;
                return chai.request(app)
                .put('/users/results')
                .send(updateData);
            })
            .then(res => {
                res.should.have.status(204);
                return User.findById(updateData._id);
            })
            .then(user => {
                user.results.answerRight.should.equal(updateData.results.answerRight);
                user.results.answerWrong.should.equal(updateData.results.answerWrong);
            });
        });
    });
});
