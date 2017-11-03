const uuid = require('uuid');
const mongoose = ('mongoose');

const userSchema = mongoose.Schema({
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },
    username: {type: String, required: true},
    password: {type: String, required: true},
    results: {
        test: {
            answerRight: {type: Number, required: true},
            answerWrong: {type: Number, required: true}
        }
    },
    type: {type: String, required: true}
});

const testSchema = mongoose.Schema({
    question: {type: String, required: true},
    answer: {type: String, required: true},
});