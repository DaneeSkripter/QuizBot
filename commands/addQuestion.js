const { Command, ArgumentType } = require('gcommands');
const Discord = require('discord.js')

module.exports = class Quiz extends Command {
    constructor(...args) {
        super(...args, {
            name: 'addquestion',
            description: 'Add question to quiz',
            guildOnly: '819193854921146408',
            slash: true,
            args: [
                {
                    name: "quizid",
                    type: ArgumentType.INTEGER,
                    description: "ID of quiz",
                    required: true
                },
                {
                    name: "question",
                    type: ArgumentType.STRING,
                    description: "Question",
                    required: true
                },
                {
                    name: "answera",
                    type: ArgumentType.STRING,
                    description: "Answer A",
                    required: true
                },
                {
                    name: "answerb",
                    type: ArgumentType.STRING,
                    description: "Answer B",
                    required: true
                },
                {
                    name: "answerc",
                    type: ArgumentType.STRING,
                    description: "Answer C",
                    required: true
                },
                {
                    name: "rightanswer",
                    type: ArgumentType.STRING,
                    description: "Right answer (!! a or b or c !!)",
                    required: true
                },
            ]
        })
    }

 async run({ respond, author, objectArgs, guild }) {
     let id;
     const quizID = objectArgs.quizid
     const question = objectArgs.question
     const answera = objectArgs.answera
     const answerb = objectArgs.answerb
     const answerc = objectArgs.answerc
     const rightanswer = objectArgs.rightanswer
    const Quiz = require('../models/Quiz')
    const Question = require('../models/Question')
    const quizExist = await Quiz.findOne({ quizID: quizID})
    const embed = new Discord.MessageEmbed()
    if (!quizExist) {
        embed.setColor('RED')
        embed.setDescription('This quiz does not exist.')
    } else {
        do {
            id = Math.floor((Math.random() * 100000))
        } while (!Question.findOne({ questionID: id}))
     const addQuestion = new Question({
        serverID: guild.id,
        quizID: quizID,
        content: question,
        right_answer: rightanswer,
        answer_a: answera,
        answer_b: answerb,
        answer_c: answerc,
        questionID: id
    })
    addQuestion.save()
            embed.setColor("#2B4D70")
            embed.setDescription(`Question was added. ID: **${id}**`)

         
    }
    respond({ embeds: [embed]})
  }}

  // CREATED BY DANEESKRIPTER © 2021 
// LAST EDIT: 18-12-2021