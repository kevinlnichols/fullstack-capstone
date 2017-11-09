const uuid = require('uuid');
const mongoose = require('mongoose');

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

userSchema.virtual('fullName').get(function() {
    return `${this.name.firstName} ${this.name.lastName}`.trim()
});

userSchema.methods.apiRepr = function () {
    return {
        fullName: this.fullName,
        username: this.username,
        password: this.password
    };
}

const testSchema = mongoose.Schema({
    testTitle: {type: String, required: true},
    question: {type: String, required: true},
    answer: {type: String, required: true},

});

const User = mongoose.model('User', userSchema);

module.exports = {User};