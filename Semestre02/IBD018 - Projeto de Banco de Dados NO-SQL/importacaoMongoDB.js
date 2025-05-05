/*******************************************/
/****** Aula 05/maio - Importação e funções de grupo *****/
// Método 1 - Para importar dados no MongoDB Compass, seguir os seguintes passos:
0- Baixar do Teams : movie.json e IMDb_names.csv para a pasta documentos
1- Conectar-se ao sistema que contém a coleção para a qual se deseja importar os dados;
2 - Selecionar um database. Para criar um novo selecionar a conexão e botão Create database
à direita acima (em verde).Preencha os dados e crie uma nova coleção que será destino da importação.
As coleção serão "movie" (movie.json) e "actor" (IMDB_names.csv)
3- Navegar até a coleção de destino;
4 - Clicar no menu suspenso Add Data (verde) e selecionar Import JSON or CSV file;
5 - Selecionar o tipo de arquivo apropriado, JSON ou CSV para importar e clicar em Select;
6 - Configurar opções de importação;
7 - Clicar em Import. 

// Método 2 - MONGOIMPORT
// para baixar o import do MongoDB baixe pelo Teams ou
https://www.mongodb.com/try/download/database-tools

// descompacte o arquivo zipado no seu user\documents
// baixe os arquivos de dados no diretório c:\data
// vá até o diretório
c:\users\seuRA\mongodb-database-tools-windows-x86_64-100\bin

// execute o comando de linha
mongoimport --jsonArray --db imdb_fatec --collection movie --file c:\data\movie.json

//  execute o comando de linha
mongoimport --db imdb_fatec --collection actors --type csv --headerline --file c:\data\IMDb_names.csv

// Método 3 - dentro do NOSQL Booster
use importacao_bd2
db.movie.find().count()
db.movie.find()
//renomeando um campo
db.movie.updateMany({}, {$rename: {"year": "ano_lancamento"}})
// datatype
// $type : date-9, timestamp-17, string-2, double-1
db.movie.aggregate( [ 
        { "$project": { "Tipo_dado": {  "$type": "$ano_lancamento"  } } } ])
// convertendo ano de lancamento
db.movie.find({ano_lancamento:{$ne: ""}}).count()

db.movie.find({ano_lancamento:{$ne: ""}}).forEach( function (doc) {
doc._id = doc._id ;
doc.ano_lancamento = parseInt(doc.ano_lancamento);
//print(doc._id); 
print(doc.ano_lancamento)  ;
// deprecated save()
db.movie.replaceOne({_id:doc._id},doc ) } ) ;

db.movie.createIndex(
  { title: 1, ano_lancamento: -1 } ,
  { name: "titulo_ano" })

// conversão da duração do filme - runtime - limpar o "min"
db.movie.find()
// criando novo campo para receber a duração sem os minutos
db.movie.updateMany({}, {$set : {duracao: null}})
db.movie.updateMany({runtime: {$ne: null}},
[ { $set: {duracao: {$substr: ["$runtime",0, { $indexOfBytes : ["$runtime", " min"] }] }  } } ] )
// conversão para inteiro
db.movie.find({duracao:{$ne: null}}).forEach( function (doc) {
doc._id = doc._id ;
doc.duracao = parseInt(doc.duracao);
//print(doc.duracao)
db.movie.replaceOne({_id:doc._id},doc ) } ) ;

// Manipulando datas
// O MongoDB converte as datas para BSON, e além disso trabalha com milissegundos, característico de sistemas UNIX
// No relacional as datas são convertidas, nos sistemas ocidentais, para o calendário Juliano , por exemplo, o dia
// de hoje 05/maio/2025 é convertido na quantidade de dias que se passaram desde 01/01/00, vamos imaginar que essa conversão
// resultasse 738945,67321
// No MOngoDB. o início do calendário é 01/01/1970, isso significa que datas posteriores são positivas, e anteriores são negativas

// coleção teste para funções de data 
db.teste.insertOne({teste:"teste"})
db.teste.find()

// Equivalente ao EXTRACT
db.teste.aggregate(
[ { $project :
    { hoje : new Date(),
      dia:  {$dayOfMonth: ISODate("2024-10-05T22:33:44.555Z")},
      mês: {$month: ISODate("2024-10-05T22:33:44.555Z")}
      hora: {$hour: new Date()},
    minuto: {$minute: new Date()},
    segundo: {$second: new Date()},
    milisegundo: {$millisecond: new Date()},
    dia_ano: {$dayOfYear: new Date()},
    dia_semana: {$dayOfWeek: new Date()},
    semana: {$week: new Date()}  }  }   ]   )
    
// diferença do localtimezone para GMT   
var now = new Date() ;
now.getTimezoneOffset()


// diferença entre datas 
db.teste.aggregate( [
  { $project: { diferenca_dias: { $dateDiff: { startDate: ISODate("2024-08-25T00:00:00.000Z") ,
                                        endDate: ISODate("2024-09-11T00:00:00.000Z") ,
                                          unit: "second" } } , _id: 0 } } ] )
                                          
db.teste.aggregate( [
  { $project: { difhoras: { $dateDiff: { startDate: ISODate("2000-12-25T00:00:00.000Z") ,
                                        endDate: new Date(),
                                          unit: "month" } } , _id: 0 } } ] )  
                                          
//db.teste.aggregate( [
//  { $project: { idade: 
//  {$divide:{ [ $dateDiff: { startDate: ISODate("2000-12-25T00:00:00.000Z") ,
//                                        endDate: new Date(),
//                                          unit: "month" } , 12 ] }}}} } ])
// subtraindo unidades de tempo 
db.teste.aggregate( [
  { $project: { intervalo: { $dateSubtract:{ startDate: ISODate("2024-02-29T12:10:05Z"),
                                             unit: "year",
                                             amount: 10 } } } } ] ) 
											 
// adicionando unidades de tempo -- no SQL INTERVAL '2' HOUR
db.teste.aggregate( [
  { $project: { intervalo: { $dateAdd:{ startDate: new Date(),
                                             unit: "hour",

