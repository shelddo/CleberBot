exports.run = async (client, msg, args) => {
    let [mensagem] = args;
    if(!args[0]){
        msg.reply("Você precisa digitar alguma coisa para eu poder falar.")
    }
    else
    {
        msg.channel.send(args.join(" "), mensagem)
        msg.delete();
    }
}