const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap")
const fs = require("fs")


const config = require("./config.json");

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  
  client.commands = new Enmap();
  
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`${commandName} carregado.`);
      client.commands.set(commandName, props);
    });
  });


client.login(config.token);
/*
client.on('message', async msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    if(msg.author.id === "669725510212780034") return;
    db.Server.findOne({"_id": msg.guild.id}, function (err, guild){
        if(err) return console.error(err);
        var prefix = guild.serverprefix;
        if(!msg.content.startsWith(prefix)) return;
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const comando = args.shift().toLowerCase();    
    })

})
*/