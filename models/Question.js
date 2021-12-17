const mongoose = require('mongoose');

const Question = new mongoose.Schema({
    serverID: {type: String, required: true},
    quizID: { type: Number, auto: true},
    content: {type: String},
    right_answer: {type: String},
    answer_a: {type: String},
    answer_b: {type: String},
    answer_c: {type: String},
    questionID: {type: Number},
        
})

const model = mongoose.model('questions', Question)

module.exports = model;