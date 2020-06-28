const db = require("../Data/database.js")

exports.run = async (client, msg, args) => {
    if(msg.member.permissions.has('MANAGE_MESSAGES')){            
        let [prefixo] = args;
        if(!args[0]) return msg.channel.send("Você precisa fornecer um prefixo.")
        db.Server.findOne({"_id": msg.guild.id}, function (err, documento){
            if(err) return console.error(err);
            documento.serverprefix = prefixo;
            documento.save();
        })
        msg.channel.send(`Prefixo mudado para: ${prefixo}`);
    }
    else
    {
        const embed = new Discord.MessageEmbed()
                .setColor('#f54242')
                .setAuthor('Cleber', client.user.displayAvatarURL())
                .setTitle("Sem permissões")
                .setDescription("Você precisa ter as seguintes permissões: \n \`Gerenciar mensagens\`");

            msg.channel.send(embed)
    }
  }