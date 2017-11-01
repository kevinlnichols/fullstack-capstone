const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const should = chai.should();
const app = server.app;
const storage = server.storage;

chai.use(chaiHttp);

describe('index', function() {
    it('exists', function(done) {
        chai.request(app)
            .get('/')
            .then(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});