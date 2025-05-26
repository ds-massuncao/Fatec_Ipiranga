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
https://www.mongodb.com/try/download/database-tools;

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

// exemplo de pesquisa
db.actors.find().count()

db.actors.find({  height: null } ).count() - atores onde o campo "height" esta nulo

db.actors.find({ height: { $ne: null, $exists: true } }).count() - atores onde o campo "height" nao esta nulo

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
      dia:  {$dayOfMonth: ISODate("2025-05-05T22:33:44.555Z")},
      mês: {$month: ISODate("2025-05-05T22:33:44.555Z")}
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
                                          unit: "day" } } , _id: 0 } } ] )
                                          
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
  { $project: { intervalo: { $dateSubtract:{ startDate: new Date(),
                                             unit: "hour",
                                             amount: 10 } } } } ] ) 
											 
// adicionando unidades de tempo -- no SQL INTERVAL '2' HOUR
db.teste.aggregate( [
  { $project: { intervalo: { $dateAdd:{ startDate: new Date(),
                                             unit: "hour", amount: 2 } } } } ] )

// Funções de grupo ou agregação -> GROUP BY
// $count , $sum , $avg, $max, $min 
// count -> contagem
db.movie.count()
db.movie.find().count()
db.movie.aggregate(
    {$group : {_id: {}, 
                contagem : {$count:{} } } } )
// contagem com criterio >= 
db.movie.count({duracao: {$gte: 120}})
// group by -- ordenado na descrescente -1 ; ascendente 1
db.movie.aggregate(
    {$group : {_id: {duracao_min: "$duracao"} , 
                contagem : {$count:{} } } } ,
                { $sort: {contagem: -1} } )
// qtde de filmes por país -- conta o vetor
db.movie.aggregate(
    {$group : {_id: {país: "$countries"} , 
                contagem : {$count:{} } } } ,
                { $sort: {contagem: -1} } )
// qtde de filmes por país -- retirar os elementos do vetor
db.movie.aggregate(
    { $unwind: "$countries"} ,
    {$group : {_id: {país: "$countries"} , 
                contagem : {$count:{} } } } ,
                { $sort: {contagem: -1} } )

// qtde de filmes por país -- retirar os elementos do vetor
db.movie.aggregate( 
    {$match : {countries: /bra.il/i} }  ,
    { $unwind: "$countries"} ,
    {$group : {_id: {país: "$countries"} , 
                contagem : {$count:{} } } } ,
                { $sort: {contagem: -1} } )

// primeiro desempacota depois aplica o match
db.movie.aggregate( 
    { $unwind: "$countries"} ,
    {$match : {countries: /bra.il/i} }  ,
    {$group : {_id: {país: "$countries"} , 
                contagem : {$count:{} } } } ,
                { $sort: {contagem: -1} } )
// qtde de filmes por ator/atriz depois aplica o match
db.movie.aggregate( 
    { $unwind: "$actors"} ,
    // {$match : {countries: /bra.il/i} }  ,
    {$group : {_id: {artista: "$actors"} , 
                contagem : {$count:{} } } } ,
                { $sort: {contagem: -1} } )

 // qtde de filmes por ator/atriz depois aplica o match - busca com nome torres
db.movie.aggregate( 
    { $unwind: "$actors"} ,
    {$match : {actors: /torres/i} }  ,
    {$group : {_id: {artista: "$actors"} , 
                contagem : {$count:{} } } } ,
                { $sort: {contagem: -1} } )

// aula 12/maio - continuação funções de grupo - mais de um citerio de agrupamento
// group by coluna1, coluna2, ..., colunaN
// agrupando por país e gênero 
db.movie.aggregate (
    {$unwind: "$countries"} ,
    {$match : {"countries" : /bra.il/i}},
    {$unwind: "$genre" } ,
    {$group: {_id: { país: "$countries", gênero:  "$genre" } ,
                    contagem_país_gênero: {$count : {} } } } ,
    {$sort: {contagem_país_gênero: -1 }})
    
// equivalente ao having, $match depois do group by
 db.movie.aggregate (
    {$unwind: "$countries"} ,
    {$unwind: "$genre" } ,
    {$group: {_id: { país: "$countries", gênero:  "$genre" } ,
                    contagem_país_gênero: {$count : {} } } } ,
    {$match: {contagem_país_gênero : {$gte: 1000 } } } , // having
    {$sort: {contagem_país_gênero: -1 }}) 
    
// contagem por país, gênero e ano_lançamento, que não seja USA 
db.movie.aggregate (
    {$unwind: "$countries"} ,
    {$match : {"countries" : {$not: /usa/i}  }  }, // excluindo USA
    {$unwind: "$genre" } ,
    {$group: {_id: { país: "$countries", gênero:  "$genre", ano: "$ano_lancamento" } ,
                    contagem_país_gênero_ano : {$count : {} } } } ,
    {$match : { contagem_país_gênero_ano: {$gte : 5 } } } ,  // somente acima ou igual a 5 filmes/ano/genero
    {$sort: {contagem_país_gênero_ano : -1 }})

//Atividade 05: Banco NO-SQL – MongoDB
//Utilizando o comando aggregate e group na base importada do IMDB , responda às seguintes consultas:
//a)	Faça a conversão na coleção actor para o campo height (altura). Tente “limpar” a maior parte dos dados. 
db.actor.aggregate ( [
    {$match: {altura: {$ne : null}}}, 
    {$group : {_id: null,
              contagem : {$count: {} }])
// conversao
// renomear uma coluna height -> altura
db.actor.updateMany({}, {$rename : {"height":"altura"}})
// transformar a altura em numero 
db.actor.find({altura: {$ne: ""}}).forEach( function(x){  // laço for, função lambda
  x._id = x._id ;
  x.altura = parseInt(x.altura) ; // converte texto para inteiro
  print(x.altura)
//  db.actor.save(x) } )
db.actor.replaceOne({_id:x._id}, x ) } ) ;
// tratando o NaN
db.actor.find({altura: NaN}).count()
db.actor.updateMany({altura: NaN}, {$set: {altura: null}})

db.actor.find()


//b)	Mostre a quantidade de filmes por gênero em que atuou o ator Robert de Niro.
db.movie.aggregate ([
  {$match: {actors: /robert de niro/i}},
  {$unwind: "$genre"},
  { $group : { _id: {genero: "$genre"},  
              contagem_genero : {$count : {} } } },
             {$sort : { contagem_genero: -1  } } ]) 
db.movie.find()

//c)	Mostre a contagem de filmes por país e gênero, mostrando o nome dos país(es) e idiomas(s) no formato “Brazil/EUA”, “Comedy/Drama”, ou seja, transforme o conteúdo do vetor em string (tirar os elementos de dentro do vetor).
db.movie.aggregate (
{ $group : { _id: {pais: "$countries", genero: "$genre", idioma: "$languages"},  
              pais_genero_idioma : {$count: {} } } },
{$project : {
    País: {$cond : {"if" : {"$eq": [{$size: "$_id.pais" }, 1] },
                               "then":  { "$arrayElemAt"  : ["$_id.pais", 0]  },
            "else": {"$concat": [ { "$arrayElemAt" : ["$_id.pais", 0]  }, "/", 
                                  { "$arrayElemAt" : ["$_id.pais", 1]  } ] } } } ,
    Gênero: {$cond : {"if" : {"$eq": [{$size: "$_id.genero" }, 1] },
                               "then":  { "$arrayElemAt"  : ["$_id.genero", 0]  },
            "else": {"$concat": [ { "$arrayElemAt" : ["$_id.genero", 0]  }, "/", 
                                  { "$arrayElemAt" : ["$_id.genero", 1]  } ] } } } ,
     Idioma: {$cond : {"if" : {"$eq": [{$size: "$_id.idioma" }, 1] },
                               "then":  { "$arrayElemAt"  : ["$_id.idioma", 0]  },
            "else": {"$concat": [ { "$arrayElemAt" : ["$_id.idioma", 0]  }, "/", 
                                  { "$arrayElemAt" : ["$_id.idioma", 1]  } ] } } },
              pais_genero_idioma: 1, _id: 0} },
 {$match: {pais_genero_idioma : {$lte: 50}}},
            {$sort : { pais_genero_idioma: -1  } } )

// método 2 usando o $unwind nos dois vetores, faz a contagem correta 
// mas perde informação de co-produção e generos combinados
db.movie.aggregate ([
  {$unwind: "$countries"} , 
  {$unwind: "$genre"} , 
  {$unwind: "$languages"} , 
  {$group : { _id: {pais: "$countries", genero: "$genre", idioma: "$languages"},  
              pais_genero_idioma : {$count: {} } } } , 
  {$sort: {pais_genero_idioma: -1 } }  ) 

//d) Mostre a contagem de filmes por Diretor. Mostre o nome(s) do(s) diretor(es) quando tiverem no máximo 2.
db.movie.aggregate ([
  { $match: {directors: {$ne: null}}},
  {$unwind: "$directors"},
  { $group : { _id: {direcao: "$directors"},  
              contagem_direcao : {$count : {} } } },
{$match: {contagem_direcao: {$lte: 2} }}, 
{$sort : { contagem_direcao: -1 , _id : 1}]) // ordena pela contagem depois nome do diretor


//e)	Mostre a contagem de filmes por país e idioma.
db.movie.aggregate ([
    {$unwind: "$countries"},
    {$unwind: "$languages"},
  { $group : { _id: {país: "$countries",idioma: "$languages"}
              contagem_pais_idioma : {$count : {} } } },
             {$sort : { contagem_pais_idioma: -1  } },
{$project :{Pais: "$_id.país", Idioma: "$_id.idioma", contagem_pais_idioma: 1, _id: 0} } ]) 

//f)	Mostre a contagem por motivos de óbito para os atores falecidos, com mais de 100 óbitos por motivo.
db.actor.find()
db.actor.updateMany({}, {$rename: {"reason_of_death": "motivo_obito"}})
db.actor.updateMany({}, {$rename: {"date_of_death": "data_obito"}})
db.actor.aggregate([
{$match: { data_obito: {$ne: null}, motivo_obito: {$ne: null}}},
{$group: {_id: {motivo_obito:  "$motivo_obito" },
          contagem: {$count: {} } } },
    {$match: { contagem : {$gte: 100}}},      
    {$sort: {contagem: -1}} ] )


//g)	Mostre a média de altura por ano de nascimento dos atores, da maior média para menor e limite o resultado para as 10 maiores médias.
db.movie.find().limit(10)
db.actor.find().limit(10)

/***** CONVERSÃO *****/
// NASCIMENTO
// renomear uma coluna height -> altura
db.actor.find()
db.actor.updateMany({}, {$rename : {"date_of_birth":"data_nascimento"}})

// consulta
db.actor.updateMany({}, )
db.actor.aggregate( [
{$match: {data_nascimento: {$ne: null}, data_nascimento : {$type: 9 } } },
{$project: {ano_nascto: {$year: "$data_nascimento"}, "altura": 1}},
{$group: { _id: "$ano_nascto",
           media_altura: {$avg: "$altura" } 
           contagem: {$count: {}} } },
 //{$sort: {contagem:-1}},
{$sort: {"media_altura":-1}}, { $limit : 50 } ] ) 

// estimativa para verificar as menores contagens 
db.movie.aggregate ([
  {$unwind: "$genre"} , 
  {$group : { _id: {genero: "$genre"},  
              conta_genero : {$count: {} } } } , 
  {$sort: {conta_genero: 1 } }  ) 
// filtramos por News para diminuir o tempo de processamento, aqui pega News com qualquer outra combinação de gênero,
// depois desaninha o vetor e faz o join 
// lembrar que o lookup faz um outer join , são 62mil filmes, muitos com mais de um gênero
// cada filme tem um vetor com até 15 atores, acaba gerando todas as combinações e relaciona em actor o nome dentro do vetor
// ou seja , 62 mil x 15 nomes no vetor x 297 mil combinações x generos dentro do vetor . Por isso filtramos  New.
db.movie.find({"genre": /news/i }, {_id:0, "genre": 1})  // aparece News combinado com vários outros gêneros

db.movie.aggregate([
    {$unwind: "$genre" },
    {$match: {"genre": /news/i}} ,  // para pegar todos os gêneros é só comentar esta linha
    {$unwind: "$actors"},
    {$lookup: 
      {from : "actor",
       localField: "actors", 
       foreignField: "name" , 
       as : "atores_filme" }} ,
{$unwind:  "$atores_filme" },      
{$group: {_id: {genero:  "$genre" },
          media_altura: {$avg: "$atores_filme.altura" } } } ]).limit(10)

// Aula 26/maio - Manipulação de Datas

//Trabalhando com datas
// data atual
RETURN date() AS data_atual, datetime() AS datahora_atual
// data hora
RETURN datetime({timezone: 'Greenwich'}) AS datahora_atual
RETURN datetime({timezone: "America/Sao_Paulo"}) AS datahora_atual
// extract da data hora
RETURN datetime({timezone: "America/Sao_Paulo"}).hour AS hora_atual
RETURN datetime({timezone: "America/Sao_Paulo"}).week AS semana_atual
// somando 2 horas à data atual
RETURN datetime({timezone: "America/Sao_Paulo"}) + duration({hours:2})

UNWIND [
  date('2025-10-25'),
  date('2025-10'), // completa com dia 01
  date('202510'),   // completa com dia 01
  date('2025-W22-1'), // retorna semana 43, 1o dia
  date('2025300'), // retorna dia 300
  date('2025') // completa com 01-01
] as Formatos_Data
RETURN Formatos_Data


UNWIND [
  duration.between(date("1984-10-11"), date("1985-11-25")),
  duration.between(date("1985-11-25"), date("1984-10-11")),
  duration.between(date("1984-10-11"), datetime("1984-10-12T21:40:32.142+0100")),
  duration.between(date("2015-06-24"), localtime("14:30")),
  duration.between(localtime("14:30"), time("16:30+0100")),
  duration.between(localdatetime("2015-07-21T21:40:32.142"), localdatetime("2016-07-21T21:45:22.142")),
  duration.between(datetime({year: 2017, month: 10, day: 29, hour: 0, timezone: 'Europe/Stockholm'}), datetime({year: 2017, month: 10, day: 29, hour: 0, timezone: 'Europe/London'}))
] AS aDuration
RETURN aDuration

// Aula 26 de maio - Banco IMDB Importado 
// Tratamentos de string para número
// Funções de Grupo - GROUP BY 

// Converter altura, duração e ano lançamento para Inteiro
MATCH (a:Artista)
SET a.altura = toInteger(a.altura)
RETURN a

// Converter duração e ano lançamento para Inteiro
MATCH (f:Filme)
SET f.duração = toInteger(f.duração) ,
f.ano_lançamento = toInteger(f.ano_lançamento)
RETURN f

// Consulta : quais os filmes em que trabalhou Jim Carrey
MATCH (x)-[z:Elenco]->(y)
WHERE y.nome =~ '(?i).*jim.*' 
AND y.nome =~ '(?i).*carrey.*' 
RETURN *
LIMIT 10 

// Consulta : quais os filmes em que trabalhou Jim Carrey
MATCH (f)-[e:Elenco {tipo_participação: "actor"}]->(a:Artista {nome: "Jim Carrey"})
RETURN *
LIMIT 100 

// consultas usando operadores de busca START , ENDS, CONTAINS
MATCH (f:Filme)
WHERE toUpper(f.titulo_original) STARTS WITH 'LOVE' 
RETURN f
// usando regex
MATCH (f:Filme)
WHERE f.titulo_original =~ '(?i)^love.*'
RETURN f
LIMIT 15 

// termina com WARS
MATCH (f:Filme)
WHERE toUpper(f.titulo_original) ENDS WITH 'WARS' 
RETURN f
LIMIT 15

// usando regex
MATCH (f:Filme)
WHERE f.titulo_original =~ '(?i).*wars$'
RETURN f
LIMIT 15 

// tem a string em qualquer posição - CONTAINS
// artistas com nome Montenegro
MATCH (a:Artista)
WHERE toUpper(a.nome) CONTAINS "MONTENEGRO"
RETURN a.nome, a.local_nascto
LIMIT 50 

MATCH (a:Artista)
WHERE toUpper(a.nome) CONTAINS "FORD"
RETURN a.nome, a.local_nascto
LIMIT 50 

// usando regex
MATCH (a:Artista)
WHERE a.nome =~ '(?i).*montenegro.*'
RETURN a.nome, a.local_nascto
LIMIT 50 

MATCH (a:Artista)
WHERE a.nome =~ '(?i).*ford.*'
RETURN a.nome, a.local_nascto
LIMIT 50 

// Funções de Grupo : COUNT , SUM, AVG, MAX, MIN 
// Média de altura dos artistas
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
RETURN COUNT(a.altura) AS Contagem, AVG(a.altura) AS Media 

// Média de altura dos artistas - isto equivale à expressão do SQL
// SELECT COUNT(a.altura) AS Contagem, AVG(a.altura)
// WHERE a.altura IS NOT NULL ;
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
RETURN COUNT(a.altura) AS Contagem, AVG(a.altura)

//Contagem por altura - GROUP BY
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
RETURN a.altura, COUNT(a.altura) AS Contagem
ORDER BY Contagem DESC 

// Maior e menor alturas e a diferenlça entre elas
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
RETURN MAX(a.altura) AS Maior, MIN(a.altura) AS Menor, 
MAX(a.altura) - MIN(a.altura)  AS Diferença

// media de altura por local de nascimento
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
AND a.local_nascto IS NOT NULL
RETURN a.local_nascto AS LOCAL, AVG(a.altura) AS Media, COUNT(a.altura) AS Contagem
ORDER BY Media DESC 

// quantidade de filmes por gênero - 
// há  problemas nesta comsulta porque generos é um vetor
MATCH (f:Filme)
WHERE f.generos IS NOT NULL
RETURN f.generos AS Gênero, COUNT(f.titulo) AS Contagem
ORDER BY Contagem DESC

//problemas porque generos é um vetor usando UNWIND
MATCH (f:Filme)
WHERE f.generos IS NOT NULL
UNWIND f.generos AS genero
RETURN genero AS Gênero, COUNT(f.titulo) AS Contagem
ORDER BY Contagem DESC


// Tratamento para o Genero: Não é um vetor ["Comedy, Drama"]
// considera uma string só, na verdade é um vetor com 1 elemento
WITH ["Comedy, Drama"] as generos
WITH [elemento in generos | split(elemento, ', ') ]  as ValorExtraido
// RETURN ValorExtraido
UNWIND ValorExtraido AS VetorGeneros
// RETURN VetorGeneros
UNWIND VetorGeneros AS genero
RETURN genero

// Voltando para a consulta original de contagem por genero

// Seleciona todos os nós do tipo Filme que possuem o campo 'generos' não nulo
// Armazena o campo 'generos' (assumido como lista de strings) na variável 'vetor_generos'
// Para cada elemento da lista 'vetor_generos', divide a string por vírgula e espaço ', '
// Isso cria uma lista de listas (uma lista para cada filme, contendo os gêneros separados)
// 'UNWIND' transforma a lista de listas em uma lista de listas individuais por linha
// 'UNWIND' novamente para achatar as sublistas em elementos individuais de gênero
// Conta quantas vezes cada gênero aparece e retorna os resultados ordenados decrescentemente

MATCH (f:Filme)
WHERE f.generos IS NOT NULL
WITH (f.generos) as vetor_generos
WITH [elemento in vetor_generos | split(elemento, ', ') ] as GeneroExtraido
UNWIND GeneroExtraido AS VGeneros
UNWIND VGeneros AS genero
RETURN genero, COUNT(*) AS Qtos_filmes_por_genero
ORDER BY Qtos_filmes_por_genero DESC


// nova consulta trazendo a qtde por país e gênero
// Voltando para a consulta original de contagem por genero
MATCH (f:Filme)
WHERE f.generos IS NOT NULL AND f.país IS NOT NULL
WITH (f.generos) as vetor_generos, (f.país) AS vetor_paises
WITH [elemento in vetor_generos | split(elemento, ', ') ]  as GeneroExtraido,
 [elemento in vetor_paises | split(elemento, ', ') ]  as PaísExtraido
UNWIND GeneroExtraido AS VGeneros
UNWIND PaísExtraido AS VPaíses
UNWIND VGeneros AS genero
UNWIND VPaíses AS país
RETURN país, genero, COUNT(*) AS Qtosfilmes_país_genero
ORDER BY Qtosfilmes_país_genero DESC

// idem acima , mas filtrando só filmes do Brazil
MATCH (f:Filme)
WHERE f.generos IS NOT NULL AND f.país IS NOT NULL
WITH (f.generos) as vetor_generos, (f.país) AS vetor_paises
WITH [elemento in vetor_generos | split(elemento, ', ') ]  as GeneroExtraido,
 [elemento in vetor_paises | split(elemento, ', ') ]  as PaísExtraido
UNWIND GeneroExtraido AS VGeneros
UNWIND PaísExtraido AS VPaíses
UNWIND VGeneros AS genero
UNWIND VPaíses AS país
WITH genero AS gen, país AS p
WHERE p =~ '(?i)Bra.*il'
RETURN p, gen, COUNT(*) AS Qtosfilmes_país_genero
ORDER BY Qtosfilmes_país_genero

// No SQL seria
// SELECT f.pais, f.genero, COUNT(*)
// FROM filme f
// GROUP BY f.pais, f.genero
// ORDER BY COUNT(*) DESC ;


// aplicar o group by nas arestas , contar os tipos de participação do Clint Eastwood
MATCH (f)-[e:Elenco ]->(a)
WHERE a.nome =~ '(?i)^clint.*' 
AND toUpper(a.nome) ENDS WITH 'EASTWOOD'
RETURN e.tipo_participação AS Participação, COUNt(*) AS Contagem
LIMIT 100

    










