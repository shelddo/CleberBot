const Discord = require("discord.js")

exports.run = async (client, msg, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor("#0009f")
    .setAuthor(`Servidor ${msg.guild.name}`, msg.guild.iconURL())
    .setTitle("Informações do Servidor")
    .setThumbnail(msg.guild.iconURL())
    .setDescription(`Informações do servidor **${msg.guild}**`)
    .addField("Dono", `O dono deste servidor é ${msg.guild.owner}`)
    .addField("Quantidade de membros", `Este servidor tem \`${msg.guild.memberCount}\` membros`)
    .addField("Quantidade de Emojis", `Este servidor tem \`${msg.guild.emojis.cache.size}\` emojis`)
    .addField("Quantidade de cargos", `Este servidor tem \`${msg.guild.roles.cache.size}\` cargos`)

    msg.channel.send(embed)
    .catch(console.error);
}

module.exports.help = {
    name: 'info',
    aliases: ['infos', 'informações']
}