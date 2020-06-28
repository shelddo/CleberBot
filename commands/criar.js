const db = require("../Data/database.js")

exports.run = async (client, msg, args) => {
    if(msg.author.id === '174942549109112832')  {
        const mentionedUser = msg.mentions.users.first();
        let [pessoa] = args           
        pessoa = mentionedUser; 
        /*
            // Procura na database o documento do usuário, pela id dele           
            if(erro) return console.error(erro);
           
            if(documento){
                msg.channel.send(`Usuário já está na DB`)
            }
            else
            {
                new db.Users({
                    _id: pessoa.id,
                    nick: pessoa.username,
                    avatar: pessoa.displayAvatarURL(),
                    guildid: msg.guild.id
                }).save()
                msg.channel.send(`Perfil criado com sucesso na DB.`);
            } 
            
        
        */
           try {
            msg.guild.members.cache.forEach(member => {
              if (member.id != client.user.id && !member.user.bot){
                db.Users.findOne({ "_id": member.id }, function (erro, documento) {
                    if(erro) return console.error(erro);
                    if(!documento){
                        const newUser = new db.Users({
                            _id: member.id,
                            nick: member.user.username,
                            avatar: `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp`,
                            guildid: msg.guild.id
                        })
                        newUser.save();
                        msg.channel.send(`Usuário ${member.user.username} adicionado com sucesso na DB.`)
                    }
                    else {
                        msg.channel.send(`Usuário ${member.user.username} já está na DB.`)
                    }
                })
              } 
            });   
          } catch (error) {
            console.log(error)
          }           
        
    }     
    else
    {
        msg.reply("Você não pode alterar meu banco de dados.")
    }       
}