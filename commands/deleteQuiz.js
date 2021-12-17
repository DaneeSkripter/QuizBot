const { Command, ArgumentType } = require('gcommands');
const Discord = require('discord.js')

module.exports = class Quiz extends Command {
    constructor(...args) {
        super(...args, {
            name: 'deletequiz',
            description: 'Delete a quiz',
            guildOnly: '819193854921146408',
            slash: true,
            args: [
                {
                    name: "id",
                    type: ArgumentType.STRING,
                    description: "ID of quiz",
                    required: true
                }
            ]
        })
    }

 async run({ respond, author, objectArgs, guild }) {
     const quizID = objectArgs.id
    const Quiz = require('../models/Quiz')
    const IDexist = await Quiz.findOne({ quizID: quizID})
    const quizData = await Quiz.findOneAndDelete({ quizID: quizID})
    const embed = new Discord.MessageEmbed()
    if (!IDexist) {
        embed.setColor('RED')
        embed.setDescription('No quiz was found with this id.')
    } else {
    embed.setColor("#2B4D70")
    embed.setDescription(`Quiz **${quizData.quizName}** was deleted.`)
    }
    respond({ embeds: [embed]})
    }
  }
