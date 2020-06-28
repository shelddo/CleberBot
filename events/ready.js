const db = require("../Data/database.js")
const config = require("../config.json")

module.exports = async client => {
    console.log(`Bot foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
    client.user.setActivity(`fala fi, to em ${client.guilds.cache.size} servidores`)
    db.Server.findOne({"defaultprefix": ";"})

    client.guilds.cache.keyArray().forEach(id => {
        db.Server.findOne({ "_id": id }, function (err, guild) {
            if(err) console.error(err);

            if(!guild){
                const newServer = new db.Server({
                    _id: id,
                    serverprefix: config.prefix,
                    welcomechannelID: "0",
                    goodbyechannelID: "0"
                });

                return newServer.save();
            }
        })
    })
}