const Discord = require("discord.js")
const db = require("../Data/database.js")

exports.run = async (client, msg, args) => {
    db.Server.findOne({"_id": msg.guild.id}, function (err, documento) {
        if(msg.member.permissions.has('MANAGE_CHANNELS')){
            var mentionedChannel = msg.mentions.channels.first();
            let [bemvindoCanal] = args;
            if(!mentionedChannel) return msg.channel.send("Mencione o canal que eu devo mandar mensagens de bem-vindo, por exemplo: `#bem-vindo`")
            bemvindoCanal = mentionedChannel.id;    
            if(documento.welcomechannelID == bemvindoCanal){
                msg.channel.send("Este canal já é o que eu vou mandar mensagens de bem-vindo.")
            }
            else {
                if(err) return console.error(err);
                documento.welcomechannelID = bemvindoCanal;
                documento.save();                
                msg.channel.send(`Mensagens de bem-vindo serão mandadas no canal: ${mentionedChannel}`)          
           }
        }
        else {
            const embed = new Discord.MessageEmbed()
                .setColor('#f54242')
                .setAuthor('Cleber', client.user.displayAvatarURL())
                .setTitle("Sem permissões")
                .setDescription("Você precisa ter as seguintes permissões: \n \`Gerenciar canais\`");

            msg.channel.send(embed)
        }
                  
    })
}