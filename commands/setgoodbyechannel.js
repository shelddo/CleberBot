const db = require("../Data/database.js")

exports.run = async (client, msg, args) => {
    db.Server.findOne({"_id": msg.guild.id}, function (err, documento){
        if(msg.member.permissions.has('MANNAGE_CHANNELS')){
            const mentionedChannel = msg.mentions.channels.first();
            let [adeusCanal] = args;
            if(!mentionedChannel) return msg.channel.send("Mencione o canal que eu devo mandar mensagens de adeus, por exemplo: `#adeus`")
            adeusCanal = mentionedChannel.id;          
            if(documento.goodbyechannelID == adeusCanal){
                msg.channel.send("Este canal já é o que eu irei mandar mensagens de adeus.")
            }
            else {           
                if(err) return console.error(err);
                documento.goodbyechannelID = adeusCanal;
                documento.save()              
                msg.channel.send(`Mensagens de adeus serão mandadas no canal: ${mentionedChannel}`)
            }            
        }
        else{
            const embed = new Discord.MessageEmbed()
                .setColor('#f54242')
                .setAuthor('Cleber', client.user.displayAvatarURL())
                .setTitle("Sem permissões")
                .setDescription("Você precisa ter as seguintes permissões: \n \`Gerenciar canais\`");

            msg.channel.send(embed)
        }          
    }) 
}