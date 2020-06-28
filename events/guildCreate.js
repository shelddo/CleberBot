const db = require("../Data/database.js")
const config = require("../config.json")

module.exports = (client, guild) => {
    db.Server.findOne({"_id": guild.id}, function (err, documento){
        if(err) return console.error(err);
        if(documento){

        }
        else{
            new db.Server({
                _id: guild.id,
                serverprefix: config.prefix
            })
            console.log(`[ BANCO DE DADOS ] Servidor ${guild.name} adicionado da DB.`)
        }
    })
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). Qnt. de membros: ${guild.memberCount}`);
    client.user.setActivity(`fala fi kkkk, to em ${client.guilds.cache.size} servidores kkkk`);
}