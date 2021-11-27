const mongoose = require('mongoose');

const Quiz = new mongoose.Schema({
    serverID: {type: String, required: true},
    quizName: { type: String},
    quizID: { type: Number, auto: true},
    questionCount: { type: String},
    questions: {
        question: {
            id: { type: Number, auto: true},
            content: {type: String},
            right_answer: {type: String},
            answer_a: {type: String},
            answer_b: {type: String},
            answer_c: {type: String},
        },
    }
})

const model = mongoose.model('Quiz', Quiz)

module.exports = model;