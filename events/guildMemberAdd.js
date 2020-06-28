const db = require("../Data/database.js")
const jimp = require("jimp")

module.exports = async (client, member) => {
    db.Server.findOne({"_id": member.guild.id}, async function (err, documento) {
        if(err) return console.error(err);
        let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
        let mask = await jimp.read('./jimp/mascara.png')
        let fundo = await jimp.read('./jimp/fundo-bv.png');    
        let welcomeid = documento.welcomechannelID;
        let canal = client.channels.cache.get(welcomeid)

        db.Users.findOne({"_id": member.id}, function (erro, document){
            if(erro) return console.error(erro)
            if(document){
            console.log(`[ BANCO DE DADOS ] O usuário ${member.user.username} já está no banco de dados`)
            }
            else {
                new db.Users({
                   _id: member.id,
                    nick: member.user.username,
                    avatar: member.user.displayAvatarURL(),
                    guildid: member.guild.id
                }).save()
                console.log(`[ BANCO DE DADOS ] Usuário ${member.user.username} adicionado com sucesso no banco de dados`)
            }
        })  

        jimp.read(member.user.displayAvatarURL({ format: 'png', dynamic: true}))
            .then(avatar => {
                avatar.resize(130, 130)
                mask.resize(130, 130)
                avatar.mask(mask)
                fundo.print(fonte, 170, 175, member.user.username)
                fundo.composite(avatar, 30, 90).write('./jimp/bemvindo.png')
                canal.send(``, { files: ["./jimp/bemvindo.png"]})
                console.log('[ Jimp ] Imagem enviada para o Discord')
            })
            .catch(err => {
                console.log("[ Jimp ] Erro ao carregar imagem.")
                console.log(err)
            });        

    });
}