exports.run = async (client, msg) => {
    const m = await msg.channel.send("Ping");
    m.edit(`📡 Seu ping é \`${m.createdTimestamp - msg.createdTimestamp}\`ms / 🖥 A latência da API é \`${Math.round(client.ws.ping)}ms.\``)        
}