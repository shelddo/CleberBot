const db = require("../Data/database.js")
const config = require("../config.json")

module.exports = async (client, msg) => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
    if(msg.author.id === "669725510212780034") return;
    if(!msg.member.permissions.has('MANAGE_MESSAGES')){
      const regex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
          if (regex.exec(msg.content)) {
            await msg.delete({timeout: 1000});
              await msg.channel.send(
                `${msg.author} **você não pode postar link de outros servidores aqui!**`
              );
          }
    }
    db.Server.findOne({"_id": msg.guild.id}, async function (err, guild){          
      if(guild){
        if(err) return console.error(err);
        var prefix = guild.serverprefix;
        if(!msg.content.startsWith(prefix)) return;
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const comando = args.shift().toLowerCase();      
        
        const cmd = client.commands.get(comando);
        
        if(!cmd) return;
        cmd.run(client, msg, args);
      }
      else {
        var newServer = new db.Server({
          _id: msg.guild.id,
          serverprefix: config.prefix,
          welcomechannelID: "0",
          welcomechannelID: "0"
        })
        
        newServer.save();
        console.log(`Servidor ${msg.guild.name} (id: ${msg.guild.id}) adicionado ao banco de dados`)
      }
    })
}