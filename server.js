var express = require('express');
var app = express();
app.use(express.static('public'));
const mongoose = require('mongoose');

const testRouter = require('./views/tests/testsRouter');
const userRouter = require('./views/users/usersRouter');
const mainRouter = require('./public/mainRouter');
const authenticationRouter = require('./views/authentication/authenticationRouter');

app.use('/tests', testRouter);
app.use('/users', userRouter);
app.use('/main', mainRouter);
app.use('/authentication', authenticationRouter);

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/capstone', err => {
      if (err) {
        return reject(err);
      };
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      }).on('error', err => {
        reject(err)
      });
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};