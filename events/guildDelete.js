const db = require("../Data/database.js")

module.exports = (client, guild) => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    db.Server.findOne({"_id": guild.id}, function (err, documento){
        if(err) return console.error(err);
        documento.remove();
        console.log(`[ BANCO DE DADOS ] Servidor ${guild.name} removido da DB.`)
    })
    client.user.setActivity(`fala fi kkkk, to em ${client.guilds.cache.size} servidores kkkk`);
}