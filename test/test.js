const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
const storage = server.storage;

chai.use(chaiHttp);

const {router, runServer, closeServer} = require('../server');
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
        name: {
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
            return chai.request(router)
                .get('/list')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.length.of.at.least(1);
                    return User.count();
                })
                .then(count => {
                    res.body.should.have.length.of(count);
                });
        });
        it('should return users with the right fields', function() {
            let resPost;
            return chai.request(router)
                .get('/list')
                .then(res => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.length.of.at.least(1);
                    res.body.forEach(function(user) {
                        user.should.be.a('object');
                        user.should.include.keys('id', 'name', 'username', 'password', 'type');
                    });
                    resPost = res.body[0];
                    return User.findById(resPost.id);
                })
                .then(user => {
                    resPost.name.should.equal(user.name);
                    resPost.username.should.equal(user.username);
                    resPost.password.should.equal(user.password);
                    resPost.type.should.equal(user.type);
                })
        })
    });

    describe('POST endpoint', function() {
        it('should add a new user', function() {
            const newUser = {
                name: {
                    firstName: faker.name.firstName(),
                    lastName: fake.name.lastName()
                },
                username: faker.internet.userName(),
                password: faker.lorem.words(),
                type: faker.lorem.words() 
            };
            return chai.request(router)
                .post('/users/create')
                .send(newUser)
                .then(function(res) {
                    res.should.have.status(201);
                    res.should.have.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'name', 'username', 'password', 'type');
                    res.body.name.should.equal(newUser.name);
                    res.body.id.should.not.be.null;
                    res.body.username.should.equal(newUser.username);
                    res.body.password.should.equal(newUser.password);
                    res.body.type.should.equal(newUser.type);
                    return User.findById(res.body.id);
                })
                .then(function(user) {
                    user.body.name.should.equal(newUser.name);
                    user.body.username.should.equal(newUser.username);
                    user.body.password.should.equal(newUser.password);
                    user.body.type.should.equal(newUser.type);
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
            return UserS
            .findOne()
            .then(user => {
                updateData.id = user.id;
                return chai.request(router)
                .put('/result')
                .send(updateData);
            })
            .then(res => {
                res.should.have.status(204);
                return User.findById(updateData.id);
            })
            .then(user => {
                user.results.answerRight.should.equal(updateData.results.answerRight);
                user.results.answerWrong.should.equal(updateData.results.answerWrong);
            });
        });
    });

    describe('DELETE endpoint', function () {
        it('should delete a test by id', function () {
          let test;
          return Test
            .findOne()
            .then(_test => {
              test = _test;
              return chai.request(router).delete('/list/delete/:testid');
            })
            .then(res => {
              res.should.have.status(204);
              return Test.findById(test.id);
            })
            .then(_test => {
              should.not.exist(_test);
            });
        });
      });
    
});
