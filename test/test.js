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
        name: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName()
        },
        username: faker.lorem.userName(),
        password: faker.lorem.text(),
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

    
});
