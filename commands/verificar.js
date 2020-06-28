var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply('**Você não tem permissão!**');
    
    var user = msg.mentions.members.first();
    if(!user) return msg.reply('**Você deve inserir um usuario**');

    var member;
    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }
    
    if(!member) return msg.reply('**Usuario não existe!**');
    var reason = args[1];
    const tags = user.roles.cache.map(role => role.toString()).join(' ')

    if(!reason) return msg.reply('**Adicione as tags**');
    const channel = msg.guild.channels.cache.find(ch => ch.id === msg.channel.id);


    var log = new Discord.MessageEmbed()
    .setTitle('Tags')
    .setColor('#be03fc')
    .setAuthor('Cleber', client.user.displayAvatarURL())
    .setThumbnail(`https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.webp`)
    .addField('Possui a tag', tags.toLowerCase().includes(reason) ? 'Sim' : 'Não')
    .addField('Usuario:', args[0], true)
    .addField('Tags:', tags)
    channel.send(log);
}