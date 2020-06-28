var mongoose = require("mongoose"); // faz requisicao do mongoose
const { Guild } = require("discord.js");
var Schema = mongoose.Schema // só para deixar bonitinho
mongoose.connect("mongodb+srv://cleber:sheldoxxx2020@cleberdb-jxt4s.gcp.mongodb.net/cleberdb?retryWrites=true&w=majority", { // Onde pegamos o link, da conexão em Cluster
    useUnifiedTopology: true
}).then(function () { // Caso Logue Corretamente
    console.log('[ BANCO DE DADOS ] Banco de dados foi ligado');
}).catch(function () { // Caso de ERRO
    console.log('[ BANCO DE DADOS ] Banco de dados desligado por erro');
});

// Iremos fazer um pequeno databse do usuário:
/*
var User = new Schema({
    _id: { type: String, required: true }, // ID Do Usuário
    rank: { type: Number, default: 1 }, // Rank do Usuário
    xp: { type: Number, default: 0 }, // Xp do Usuário
    money: { type: Number, default: 0 }, // Dinheiro do Usuário
})
*/

var user = new Schema({
    _id: {type: String, required: true},
    nick: {type: String, requred: true},
    avatar: {type: String, required:true},
    guildid: {type: String, required: true}
})

var server = new Schema({
    _id: {type: String, required: true}, //id do servidor
    serverprefix: {type: String, required: true},
    welcomechannelID: {type: String, required: true},
    goodbyechannelID: {type: String, required: true}
})
/* Colocamos assim, o nome do que queremos (que nem um Objeto sabe?)
money: { type: Number, default: 0 },
Type: será o formato dele (Number = Número, String = Texto, Boolean = true/false)
default: será o valor inicial que todos irão ter
required: è que é NECESSÀRIO TER
*/

// Aqui é a exportação. para usar essa base do documento, fora desse código (Troca de documentos)
var Server = mongoose.model("server", server);
exports.Server = Server

var Users = mongoose.model("user", user);
exports.Users = Users
