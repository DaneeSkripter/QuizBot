const Discord = require('discord.js');
const { Command } = require('gcommands');


module.exports = class Quiz extends Command {
    constructor(...args) {
        super(...args, {
            name: 'listquizzes',
            description: 'List all quizzes',
            guildOnly: '819193854921146408',
            slash: true
        })
    }

 async run({ respond, author, args, guild, channel }) {
    const Quiz = require('../models/Quiz')
    Quiz.find({ serverID: guild.id}).sort().exec((err, res) => {
        const quizMsg = new Discord.MessageEmbed
        if (res.length === 0) {
            quizMsg.setDescription('No quizzes found!')
            quizMsg.setFooter('Create new with /createquiz')
        } else {
            const list = [];
            let maxIteration = res.length
            let x = -1
           do {
               ++x
               maxIteration--
               quizMsg.addField(`${res[x].quizID}`, `${res[x].quizName} - **${res[x].questionCount}** questions`, true)
               console.log(x)
               list.push(x)
               console.log(list)
            } while (list.includes(x) && maxIteration > 0)
        }
        quizMsg.setColor('#2B4D70')
         respond({embeds: [quizMsg]})
    }) 

    }
    }
  
