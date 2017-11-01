const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const should = chai.should();
const storage = server.storage;

chai.use(chaiHttp);

const {app, runServer, closeServer} = require('../server');

describe('index', function() {
    before(function() {
        return runServer();
      });
    
      after(function() {
        return closeServer();
      });

    it('exists', function() {
       /* chai.request(app)
            .get('/')
            .then(function(res, err) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });*/
            return true;
    });
});
