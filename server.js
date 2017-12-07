var express = require('express');
var app = express();
app.use(express.static('public'));
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const morgan = require('morgan');

const {router: authRouter, basicStrategy, jwtStrategy} = require('./auth');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

app.use(morgan('common'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
      return res.send(204);
  }
  next();
});

app.use(passport.initialize());
passport.use(basicStrategy);
passport.use(jwtStrategy);

const testRouter = require('./views/tests/testsRouter');
const userRouter = require('./views/users/usersRouter');
const mainRouter = require('./public/mainRouter');
const authenticationRouter = require('./views/authentication/authenticationRouter');


app.use('/tests', testRouter);
app.use('/users', userRouter);
app.use('/main', mainRouter);
app.use('/authentication', authenticationRouter);


app.get(
  '/api/protected',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
      return res.json({
          data: 'rosebud'
      });
  }
);

app.use('*', (req, res) => {
  return res.status(404).json({message: 'Not Found'});
});

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