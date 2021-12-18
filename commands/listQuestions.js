const Discord = require('discord.js');
const { Command, ArgumentType } = require('gcommands');


module.exports = class Quiz extends Command {
    constructor(...args) {
        super(...args, {
            name: 'listquestions',
            description: 'List all questions',
            guildOnly: '819193854921146408',
            slash: true,
            args: [
                {
                    name: "quizid",
                    type: ArgumentType.INTEGER,
                    description: "ID of quiz",
                    required: true
                },
            ]
        })
    }

 async run({ respond, author, objectArgs, guild, channel }) {
    const quizID = objectArgs.quizid
    const Question = require('../models/Question')
    const Quiz = require('../models/Quiz')
    const quizExist = await Quiz.findOne({ quizID: quizID})
    if (!quizExist) {
        const errormsg = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription('This quiz does not exist.')
        respond({embeds: [errormsg]})
    } else {
        Question.find({ quizID: quizID}).sort().exec((err, res) => {
            const questionMsg = new Discord.MessageEmbed
            if (res.length === 0) {
                questionMsg.setDescription('No questions found!')
                questionMsg.setFooter('Create new with /addquestion')
            } else {
                const list = [];
                let maxIteration = res.length
                let x = -1
               do {
                   ++x
                   maxIteration--
                   questionMsg.addField(`Question: ${res[x].content}`, `ID: **${res[x].questionID}** A: **${res[x].answer_a}** B: **${res[x].answer_b}** C: **${res[x].answer_c}** Right Answer: **${res[x].right_answer}**`, true)
                   console.log(x)
                   list.push(x)
                   console.log(list)
                } while (list.includes(x) && maxIteration > 0)
            }
            questionMsg.setColor('#2B4D70')
             respond({embeds: [questionMsg]})
        }) 
    }
    }
    }
  
// CREATED BY DANEESKRIPTER © 2021 
// LAST EDIT: 18-12-2021