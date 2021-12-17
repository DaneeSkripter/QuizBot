const { Command, ArgumentType } = require('gcommands');
const Discord = require('discord.js')

module.exports = class Quiz extends Command {
    constructor(...args) {
        super(...args, {
            name: 'createquiz',
            description: 'Create a quiz',
            guildOnly: '819193854921146408',
            slash: true,
            args: [
                {
                    name: "name",
                    type: ArgumentType.STRING,
                    description: "Name of quiz",
                    required: true
                },
                {
                    name: "questioncount",
                    type: ArgumentType.STRING,
                    description: "Number of questions",
                    required: true
                },
            ]
        })
    }

 async run({ respond, author, objectArgs, guild }) {
     let id;
     const quizName = objectArgs.name
     const questionCount = objectArgs.questioncount
    const Quiz = require('../models/Quiz')
    const nameExist = await Quiz.findOne({ quizName: quizName})
    const embed = new Discord.MessageEmbed()
    if (nameExist) {
        embed.setColor('RED')
        embed.setDescription('There is already quiz with this name.')
    } else {  
        do {
            id = Math.floor((Math.random() * 100000))
        } while (!Quiz.findOne({ quizID: id}) )
        const quiz = new Quiz({
            serverID: guild.id,
            quizName: `${quizName}`,
            quizID: id,
            questionCount: questionCount,
            questions: {
            }
            })
            quiz.save()
            embed.setColor("#2B4D70")
            embed.setDescription(`Quiz **${quizName}** was created. ID: **${id}**`)
    } 
    respond({ embeds: [embed]})     
    }
  }
