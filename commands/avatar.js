const Discord = require("discord.js")

exports.run = async (client, msg) => {
    var user = msg.mentions.users.first() || msg.author;
    var avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`;
    if(user.avatar == "null"){
        avatar = ``
    }
    const embed = new Discord.MessageEmbed()
    .setColor("0099ff")
    .setTitle(`🖼️ ${user.username}`)
    .setDescription(`**Clique [aqui](${avatar}) para baixar a imagem!**`)
    .setImage(avatar);

    msg.reply({embed})
}