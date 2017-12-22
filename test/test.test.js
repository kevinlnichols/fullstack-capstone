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
        return seedTestData();
    });

    afterEach(function() {
        return tearDownDb();
    });
    
    after(function() {
    return closeServer();
    });

    describe('DELETE endpoint', function () {
        it('should delete a test by id', function () {
          let test;
          return Test
            .findOne()
            .then(function (_test) {
              test = _test;
              console.log(test._id);
              return chai.request(app).delete(`/tests/list/delete/${test._id}`);
            })
            .then(function (res) {
                console.log(test.id);
              res.should.have.status(204);
              return Test.findById(test.id);
            })
            .then(function (_test) {
              should.not.exist(_test);
            });
        });
      });
    
});
