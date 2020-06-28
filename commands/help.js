const Discord = require("discord.js");
const db = require("../Data/database.js")
  
exports.run = async (client, msg, args) => {
	db.Server.findOne({"_id": msg.guild.id}, function (err, documento) {
		var [comandonome] = args;
		if(!args[0]){		
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff') //Cor da barra alateral
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setDescription('Estes são os comandos disponíveis no Cleber. \n Se você acha que deve por mais algum comando entre em contato com o Jajasies#8185') //Descrição
				.setThumbnail(client.user.displayAvatarURL()) //Foto thumb
				.addFields( //adiciona campos
					{ name: '** Comandos moderativos **', value:
					`\`${documento.serverprefix}setwelcomechannel\`, \`${documento.serverprefix}setgoodbyechannel\`,
					 \`${documento.serverprefix}setprefix\`, \`${documento.serverprefix}addemoji\`, \`${documento.serverprefix}verificar\`,
					 \`${documento.serverprefix}ban\`, \`${documento.serverprefix}kick\``},
					//{ name: '\u200B', value: '\u200B' }, //espaçamento
					{ name: '** Ping **', value: `\`${documento.serverprefix}ping\``},
					{ name: '** Misc **', value: `\`${documento.serverprefix}avatar\`, \`${documento.serverprefix}info\``},
					{ name: '\u200B', value: `❓Digite \`${documento.serverprefix}help <nomedocomando>\` para mais informações. \n Exemplo: \`${documento.serverprefix}help info\``}
				)
				//.addField('Inline field title', 'Some value here', true)
				//.setImage('https://i.imgur.com/wSTFkRM.png')
				.setTimestamp()
				.setFooter('Cleber 2020', client.user.displayAvatarURL());
	  
			msg.channel.send({embed});
		}
		else if(comandonome == "setwelcomechannel"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Set Welcome Channel')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}setwelcomechannel \n **Descrição:** Define o canal de mensagens de bem-vindo.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}setwelcomechannel @<canaldesejado>\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "setgoodbyechannel"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Set Goodbye Channel')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}setgoodbyechannel \n **Descrição:** Define o canal de mensagens de adeus.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}setgoodbyechannel @<canaldesejado>\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "setprefix"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Set Prefix')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}setprefix \n **Descrição:** Define o prefixo do servidor.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}setprefix <prefixodesejado>\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "addemoji"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Add Emoji')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}addemoji \n **Descrição:** Adiciona um emoji com o nome desejado.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}addemoji <nomedoemoji> <linkdoemoji>\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "ping"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Ping')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}ping \n **Descrição:** Mostra a latência do bot e da API.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}ping\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "avatar"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Avatar')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}avatar \n **Descrição:** Mostra o seu avatar ou de alguma outra pessoa.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}avatar\` ou \`${documento.serverprefix}avatar <@pessoa>\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "verificar"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Verificar')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}verificar \n **Descrição:** Verifica se a pessoa mencionada tem alguma tag.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}verificar <usuário> <algumatag>\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "info"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Info')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}info \n **Descrição:** Mostra as informações do servidor.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}info\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "ban"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Ban')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}ban \n **Descrição:** Bane algum membro do servidor.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}ban <@pessoa> <motivo do ban>\``);

			msg.channel.send({embed});
		}
		else if(comandonome == "kick"){
			const embed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setAuthor('Cleber HELP', client.user.displayAvatarURL()) //Cabeçario
				.setTitle('Comando Kick')
				.setDescription(`O prefixo do bot é: ${documento.serverprefix} \n Envie \`${documento.serverprefix}help <nomedocomando>\` para mais informações sobre um comando.`)
				.addField('\u200B', `**Comando:** ${documento.serverprefix}kick \n **Descrição:** Expulsa algum membro do servidor.`)
				.addField('\u200B', `**Modo de uso:** \n \`${documento.serverprefix}kick <@pessoa> <motivo do ban>\``);

			msg.channel.send({embed});
		}
	})    
  }