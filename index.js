require('dotenv').config()
const { GCommandsClient } = require("gcommands");
const mongoose = require('mongoose')
const { join } = require('path');
const client = new GCommandsClient({
  loader: {
    cmdDir: join(__dirname, 'commands'),
    eventDir: join(__dirname, 'events'),
  },
  language: "english", // english, spanish, portuguese, russian, german, czech, slovak, turkish, polish, indonesian, italian
  command: {
    caseSensitiveCommands: false, // true or false | whether to match the commands' caps
    caseSensitivePrefixes: false, // true or false | whether to match the prefix in message commands
    allowDm: false, // true or false | DM Support
    
    // Slash, context, prefix
    slash: "true", // https://gcommands.js.org/docs/#/docs/main/main/typedef/GCommandsOptionsCommandsSlash
    context: "false", // https://gcommands.js.org/docs/#/docs/main/main/typedef/GCommandsOptionsCommandsContext
    prefix: ".", // for normal commands
  },
  arguments: {
    // Argument prompt deleting and input deleting, there is now a option available to delete the prompt/input for arguments.
    deleteInput: true, // Default false
    deletePrompt: true, // Default false
  },
  defaultCooldown: "3s",
  database: process.env.DATABASE,
  intents: ["GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_PRESENCES", "GUILD_VOICE_STATES", "GUILD_WEBHOOKS"]
  /* DB SUPPORT
   * redis://user:pass@localhost:6379
   * mongodb://user:pass@localhost:27017/dbname
   * sqlite://path/to/database.sqlite
   * postgresql://user:pass@localhost:5432/dbname
   * mysql://user:pass@localhost:3306/dbname
   */
});

client.on("ready", () => {
  console.log("QuizBot is ready!");
});
client.on("debug", console.log); // warning | this also enables the default discord.js debug logging
client.on("log", console.log);

client.login(process.env.TOKEN);

//DATABASE CONNECT

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>[
    console.log('Connected to the database!')
]).catch((err) =>{
    console.log(`Failed connect to the database! Error: ${err}`)
})