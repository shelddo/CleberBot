const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../functions.js");

module.exports = {
    name: "kick",
    category: "moderação",
    description: "Expulsa alguma pessoa",
    usage: "<id | mention>",
    run: async (client, msg, args) => {
        const logChannel = msg.channel;

        if (msg.deletable) msg.delete();

        // No args
        if (!args[0]) {
            return msg.reply("Cite alguém para expulsar")
                .then(m => m.delete(5000));
        }

        // No reason
        if (!args[1]) {
            return msg.reply("Cite algum motivo para a expulsão")
                .then(m => m.delete(5000));
        }

        // No author permissions
        if (!msg.member.hasPermission("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Sem permissões")
            .setDescription("\n ❌ **Você não tem permissões para expulsar alguém \´(Expulsar membros)\´**")

            return msg.reply(embed)
                .then(m => m.delete(3000));
        }

        // No bot permissions
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Sem permissões")
            .setDescription("\n ❌ **Eu não tenho permissões para expulsar alguém \´Expulsar membros\´**")
            
            return msg.reply(embed)
                .then(m => m.delete(3000));
        }

        const toKick = msg.mentions.members.first() || msg.guild.members.get(args[0]);

        // No member found
        if (!toKick) {
            return msg.reply("Essa pessoa não existe... pelo menos eu não achei ninguém")
                .then(m => m.delete(3000));
        }

        // Can't kick urself
        if (toKick.id === msg.author.id) {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Expulsar você mesmo")
            .setDescription("\n ❌ **Você não pode expulsar você mesmo**")

            return msg.reply(embed)
                .then(m => m.delete(3000));
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Erro ao expulsar")
            .setDescription("\n ❌ **Não posso expulsar essa pessoa** \n Cheque se meu cargo está acima dessa pessoa")

            return msg.reply(embed)
                .then(m => m.delete(3000));
        }
                
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Membro expulso")
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter('Cleber 2020', client.user.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents`**- Membro expulso:** ${toKick}
            **- Expulso por:** ${msg.member} 
            **- Motivo:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Essa mensagem será apagada daqui 30 segundos.`)
            .setFooter("Cleber 2020", client.user.displayAvatarURL())
            .setDescription(`Você quer mesmo expulsar ${toKick}?`)

        // Send the msg
        await msg.channel.send(promptEmbed).then(async msge => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msge, msg.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msge.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return msg.channel.send(`Ocorreu um erro: ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msge.delete({timeout: 0});

                msg.reply(`Expulsão cancelada.`)
                    .then(m => m.delete({ timeout: 5000}));
            }
        });
    }
};