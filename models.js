const uuid = require('uuid');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
    name: {
        firstName: {type: String, default: ''},
        lastName: {type: String, default: ''}
    },
    username: {type: String, required: true},
    password: {type: String, required: true},
    results: {type: Object},
    type: {type: String, required: true}
},
    {collection: 'user'}
);

/*
{testId: hhhg778374844, answersWrong: 3. asnserCorrect: 11}

user.results.push(testid, correctAnswe, wrong)*/ 



userSchema.virtual('fullName').get(function() {
    return `${this.name.firstName} ${this.name.lastName}`.trim()
});

userSchema.methods.apiRepr = function () {
    return {
        _id: this._id,
        fullName: this.fullName || '',
        username: this.username || '',
        results: this.results
    };
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const questionSchema = mongoose.Schema({
    title: {type: String, required: true},
    answerChoices: {
        choice1: {type: String, required: true},
        choice2: {type: String, required: true},
        choice3: {type: String, required: true},
        choice4: {type: String, required: true},
    },
    correctAnswer: {type: String, required: true}
});

questionSchema.methods.apiRepr = function () {
    return {
        id: this._id,
        answerChoices: this.answerChoices,
        correctAnswer: this.correctAnswer
    };
};

const testSchema = mongoose.Schema({
    testTitle: {type: String, required: true},
    questions: [
       questionSchema
    ]},
    {collection: 'tests'}
);


testSchema.methods.apiRepr = function () {
    return {
        _id: this._id,
        testTitle: this.testTitle,
        questions: this.questions
    };
};

const User = mongoose.model('user', userSchema);
const Test = mongoose.model('test', testSchema);
const Question = mongoose.model('question', questionSchema);

module.exports = {User, Test, Question};


