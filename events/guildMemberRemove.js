const db = require("../Data/database.js")
const jimp = require("jimp")

module.exports = async (client, member) => {          
    db.Server.findOne({"_id": member.guild.id}, async function (err, documento) {
        if(err) return console.error(err);
        let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
        let mask = await jimp.read('./jimp/mascara.png')
        let fundo = await jimp.read('./jimp/adeus-fundo.png');         
        let goodbyeid = documento.goodbyechannelID;
        let canal = client.channels.cache.get(goodbyeid)

        db.Users.findOne({"_id": member.id}, function (erro, document) {
            if(erro) return console.error(erro)
            if(document){
                document.remove()
                console.log(`[ BANCO DE DADOS ] O usuário ${member.user.username} foi removido com sucesso do banco de dados`)
            }
            else{
                console.log(`[ BANCO DE DADOS ] O usuário ${member.user.username} não estava no banco de dados, portanto não foi necessária a remoção.`)
            }
        }) 

        jimp.read(member.user.displayAvatarURL({ format: 'png', dynamic: true}))
            .then(avatar => {
                avatar.resize(130, 130)
                mask.resize(130, 130)
                avatar.mask(mask)
                fundo.print(fonte, 170, 140, member.user.username)
                fundo.composite(avatar, 05, 90).write('./jimp/adeus.png')
                canal.send(``, { files: ["./jimp/adeus.png"]})
                console.log('[ Jimp ] Imagem enviada para o Discord')
            })
            .catch(err => {
                console.log("[ Jimp ] Erro ao carregar imagem.")
                console.log(err)
            });
    })
}