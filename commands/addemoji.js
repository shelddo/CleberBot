const download = require('download-file');
const db = require("../Data/database.js")

exports.run = async (client, msg, args) => {
    db.Server.findOne({"_id": msg.guild.id}, function (err, documento) {    
        let [nome, emojilink] = args;
        let info = ({filename: './jimp/emoji.png'});
        var emojisqnt = msg.guild.emojis.cache.size;
        if(emojisqnt < 50){            
            if(!args[0]) return msg.channel.send(`Você precisa me dizer um nome e um link, dessa forma: \n \`${documento.serverprefix}addemoji <nome> <emojilink>\``);
            if(!args[1]) return msg.channel.send(`Você precisa me dizer um nome e um link, dessa forma: \n \`${documento.serverprefix}addemoji <nome> <emojilink>\``);         

            download(emojilink, info, function(err){
                if(err) return console.error(err);
                if(!err){                    
                        msg.guild.emojis.create(`./jimp/emoji.png`, nome).catch(erra => {
                            if(erra = {                                
                                image: "File cannot be larger than 256.0 kb.",
                                name: "Must be between 2 and 32 in length."
                            }) return msg.channel.send("Não foi possível adicionar o emoji. O arquivo não pode ter mais de 256 kb e o nome tem que ter no mínimo 2 letras.");                                      
                        }) 
                }                    
                else 
                {   
                       msg.channel.send("Link invalido.")
                }                  
            })                     
        }
        else if(emojisqnt = 50) {
            msg.channel.send("A quantidade de emojis já está no limite, não posso adicionar mais.")              
        }
               
    })

}