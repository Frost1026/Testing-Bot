const discord = require("discord.js");
const database = require("@replit/database");

const config = require("./config.json");
const client = new discord.Client();
const db = new database()

const prefix = config.prefix;

client.once('ready', () => {
	console.log('Ready!');
});

client.on("message", message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;

    const preSlicedCommand = message.content.slice(prefix.length);
    const args = preSlicedCommand.split(" ");
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    else if(command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }

    else if(command === "link") {
        if(args[0] === "set" && args[1] !== null && args[2] !== null) { 
          db.set(args[1], args[2]).then(() => {
            message.channel.send(`I saved <${args[1]}> to ${args[0]}`);
          });
        }
        else if (args[0] === "get") {
          db.get(args[1]).then(value => {
            message.channel.send(`The link for ${args[1]} is <${value}>!`);
          })
        }
        else if(args[0] === "list") {
          db.list().then(keys => {
            
          });
        }
        else {
          message.channel.send("oi your command cacat")
        }
    }
});
    
client.login(config.BOT_TOKEN);