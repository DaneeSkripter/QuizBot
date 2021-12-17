const { Command, ArgumentType } = require('gcommands');
const Discord = require('discord.js')

module.exports = class Quiz extends Command {
    constructor(...args) {
        super(...args, {
            name: 'removequestion',
            description: 'Remove question',
            guildOnly: '819193854921146408',
            slash: true,
            args: [
                {
                    name: "questionid",
                    type: ArgumentType.STRING,
                    description: "ID of question",
                    required: true
                },
            ]
        })
    }

 async run({ respond, author, objectArgs, guild }) {
     const questionID = objectArgs.questionid
    const Question = require('../models/Question')
    const embed = new Discord.MessageEmbed()
    const questionExist = await Question.findOne({ questionID: questionID})
    if (!questionExist) {
        embed.setColor('RED')
        embed.setDescription('This question does not exist.')
    } else {
        const removeQuestion = await Question.findOneAndRemove({ questionID: questionID})
        embed.setColor("#2B4D70")
        embed.setDescription(`Question **${questionID}** was deleted.`)
    }
            respond({ embeds: [embed]})  
    }    

}
