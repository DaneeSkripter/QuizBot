const mongoose = require('mongoose');

const Quiz = new mongoose.Schema({
    serverID: {type: String, required: true},
    quizName: { type: String},
    quizID: { type: Number, auto: true},
    questionCount: { type: Number},
    questions: {
        question: {
            content: {type: String},
            right_answer: {type: String},
            answer_a: {type: String},
            answer_b: {type: String},
            answer_c: {type: String},
            id: {type: Number},
        },
    }
})

const model = mongoose.model('quizzes', Quiz)

module.exports = model;