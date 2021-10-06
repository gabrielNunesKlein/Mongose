// Conexão com Mongose
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUniFiedTopology: true});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function(){
    console.log("Estamos conectados ao MongoDB");
});

// Criar Schema
const pessoaSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    profissao: String
});

// Criar Model
const Pessoa = mongoose.model("Pessoa", pessoaSchema);

const gabriel = new Pessoa({
    nome: "Gabriel",
    idade: 22,
    profissao: "Programador"
});

console.log(gabriel.nome);
console.log(gabriel.idade);

// Salvando dado
/*gabriel.save(function(err){
    if(err){
        console.log(err)
    }
})*/

const joao = new Pessoa({nome: "João", idade: 21, profissao: "Estagiario"});
//joao.save()


// Encontrando dado
/*Pessoa.findOne({nome: "Gabriel"}, function(err, pessoa){
    console.log(pessoa)
})*/

// Inserindo vários dados
/*Pessoa.insertMany([
    {nome: "Pedro", idade: 25, profissao: "Vendedor"},
    {nome: "Carla", profissao: "Advogada"},
    {nome: "Gailson", idade: 45}
]);*/

async function getPessoas(){
    const pessoas = await Pessoa.find().exec();
    console.log(pessoas);
}

//getPessoas();

// Deletando registro
async function getPessoa(nome){
    const pessoa = await Pessoa.find({nome: nome}).exec();
    if(pessoa.length === 0){
        console.log("Essa pessoa não existe");
    }else{
        console.log(pessoa);
    }
}

getPessoa("Gailson");

Pessoa.deleteOne({nome: "Gailson"}).exec();

getPessoa("Gailson");

// Atualizando dados

Pessoa.updateOne({nome: "João"}, {$set: {idade: 25}}).exec();
getPessoa("João");

// Utilizando where
async function getPessoaIdade(nome, idade){
    const pessoa = await Pessoa.where("nome", nome).where("idade", idade);
    if(pessoa.length === 0){
        console.log("Esta pessoa não existe");
    } else{
        console.log(pessoa);
    }
}

getPessoaIdade("Gabriel", 22);