// aula 07/abril
use bd2_2025
show databases
// excluindo e criando uma nova coleção
db.empresa.drop()
db.empresa.insertOne( {razao_social: 'Microsoft do Brasil Ltda',
endereco: 'Av. Engenheiro Berrini, 1000 - Brooklin - São Paulo',
fones: [1150801000, 1150801001]  }  )
// coleções do bd
show collections
// consultar a coleção empresa SELECT * FROM empresa
db.empresa.find()
// inserindo mais de um documento
db.empresa.insertMany([{razao_social: 'IBM do Brasil Ltda',
endereco: {logradouro: 'Rua Tutóia', numero: 100, 
bairro: 'Paraíso', cidade : 'Sao Paulo', cep: 02240100},
cnpj: 1234, fones: [{ddd:11, num: 32151000},
                    {ddd:11, num: 32774000} ] }, 
{razao_social: 'ABC Equipamentos Ltda',
endereco: 'Rua Vergueiro, 500 - Ipiranga',
fone: 115550100}])
// excluindo um documento
db.empresa.deleteOne({ _id : ObjectId("67f3c33f28c81a7a8e1112cb") } )
db.empresa.deleteOne({ _id : ObjectId("67f3c33f28c81a7a8e1112cc") } )
// buscando com critérios WHERE
db.empresa.find({ razao_social: /abc/i }) //- "i" transforma em nao sensitive
db.empresa.deleteOne({ _id : ObjectId("67f3c33f28c81a7a8e1112cd" ) } )
// início de palavra
db.empresa.find({razao_social: /^micro/i }) //- "^" traz o que começa com "micro"
// cadeia de caracteres
db.empresa.find( {razao_social : /bra*.il/i  } )
// consultas com AND e OR 
db.empresa.find ({razao_social: /ltda/i , razao_social: /bra/i }) 
// operador $and
db.empresa.find ({$and : [ {razao_social: /ltda/i} , 
                           {razao_social: /bra/i } ] } ) 
// operador $or - empresas em São Paulo
db.empresa.find( {$or: [ {endereco:	 /s.*o paulo/i} , 
                         { "endereco.cidade":  /s.*o paulo/i } ] })
// operador not ou diferente $not
db.empresa.find ({$and : [ {razao_social: /ltda/i} ,
                           {razao_social: {$not: /bra/i } } ] } ) //- "$ne" para número
// atualização -novo campo ano fundação
db.empresa.updateOne( {razao_social: /microsoft/i},
                       {$set: {ano_fundação: 1974 } })
db.empresa.updateOne( {razao_social: /ibm/i},
                         {$set: {ano_fundação: 1911}} )
db.empresa.updateOne( {razao_social: /abc/i},
                         {$set: {ano_fundação: 2002}} )
db.empresa.find()
// operadores de comparação numéricos
// $eq igual / $ne diferente (não igual <>) / $lt (menor que-lower than <)
// $lte (menor ou igual <=) / $gt (maior que >) / $gte (maior ou igual >=)
db.empresa.find({ano_fundação : { $gt: 1950 }})
// simulando um between
db.empresa.find({ ano_fundação : { $lte: 2000 }, ano_fundação : { $gte:1950 } }) //- nao funcionou
db.empresa.find({ $and: [ { ano_fundação : { $gte: 1950 } },  //- funcionou
                                          { ano_fundação : { $lte: 2000 } } ] } )
// manipulando vetores
// novo numero de fone na Microsoft
db.empresa.updateOne( {razao_social : /microsoft/i }, 
                   {$push: { fones: {$each: [1132561234] } } })
// atualizando um numero de fone
db.empresa.updateOne( {razao_social : /microsoft/i , "fones": 1150801001}, 
{$set: { "fones.$" : 1150809999 } } )
// excluindo um número de fone 1150801000
db.empresa.updateOne( {razao_social : /microsoft/i }, 
{$pull: {"fones" : [1150801000] } } )	

// Atividade 3 - 14/abril
// Com base nos atributos do Diagrama de Classes acima, e das coleções desenvolvidas em aula de laboratório, 
// utilizando a linguagem javascript no SGBD MongoDB
// a)	Insira uma nova empresa fornecedora com razão social, tipo, cnpj, endereço (com campos para cada característica) e
// fone com campos para ddd e número.
db.empresa.insertOne({razao_social : 'MicroTecnica Equipamentos Ltda', cnpj: 777, tipo_empresa : 'Fornecedor',
endereco : {logradouro : 'Av. Cerro Corá', numero : 455, bairro : 'Lapa', cidade : 'São Paulo'},
fones :  [{DDD: 11, numero : 51891000} , {DDD: 11, numero : 51831001}] })
db.empresa.find({razao_social: /MicroTecnica/i})
// b)	Após incluir o novo documento atualize o bairro da empresa.
db.empresa.updateOne({razao_social: /MicroTecnica/i}, {$set: {"endereco.bairro" : 'Alto da Lapa'}})
// c)	Inclua um novo número de telefone e posteriormente atualize este número.
db.empresa.updateOne({razao_social: /MicroTecnica/i}, {$push: {"fones": {$each: [{DDD:11, numero: 11990987654}] } } } )
db.empresa.updateOne({razao_social: /MicroTecnica/i, "fones.numero" : 11990987654 } ,
{$set: {"fones.$" : {DDD:11, numero: 990987622}}})
//d)	Mostre a razão social, endereço e fones de empresas que não estão localizadas no bairro da Lapa
db.empresa.find()
db.empresa.find({$and: [ {endereco: {$not: /lapa/i }} , { "endereco.bairro" : {$not: /lapa/i } } ] },
{_id : 0 , razao_social : 1 , endereço : 1 , fone: 1 , fones: 1 })
//e)	Mostre os mesmos dados de d) mas para as empresas que tenham a palavra Equipamento na razão social, 
// mas que não se localizem em cidades com nome de santo (São, Santo, Santa).
db.empresa.find({$and: [ {razao_social : /equipamento/i}, 
                         {endereco: {$not: /sant/i }} ,
                         { "endereco.cidade" : {$not: /sant/i }},
                         {endereco: {$not: /s.*o/i }} ,
                         { "endereco.cidade" : {$not: /s.*o/i }} ] },
{_id : 0 , razao_social : 1 , "endereço.cidade": 1, fone: 1 , fones: 1 })

// aula 28/abril
// nova coleção equipamento ; relacionamento com aggregate
// atualizar as empresas com o tipo e definindo cnpj para todas 
db.empresa.updateOne ({razao_social : 'Microsoft do Brasil Ltda'} ,
{$set: {tipo_empresa: 'Fabricante', cnpj: 112233} } ) 
db.empresa.updateOne ({razao_social : 'IBM do Brasil Ltda'}, 
{$set: {tipo_empresa: 'Fabricante', cnpj: 445566 } } )
db.empresa.updateOne ({razao_social : 'ABC Equipamentos Ltda'}, 
{$set: {tipo_empresa: 'Fornecedor', cnpj: 778899 } } )
db.empresa.updateOne ({razao_social : ' 'MicroTecnica Equipamentos Ltda '}, 
{$set: {tipo_empresa: 'Fornecedor', cnpj: 998800 } } )

// nova coleção equipamento
// computador 
db.equipamento.insertOne({ patrimonio: 100, marca: 'IBM', modelo: 'ThinkPad',
num_serie: 123, tipo_eqpto: 'Computador', 
caracteristicas: {processador: 'I5', memoria_GB: 16, armazenamento_GB : 500,
velocidade_GHZ: 3.2 , tipo_computador: 'Notebook' }, Fornecedor: 778899 } )
db.equipamento.find()
db.equipamento.updateOne( {patrimonio: 100} , {$set : {Fabricante: 445566} } ) 
// periferico 
db.equipamento.insertOne({patrimonio: 101, marca: 'Microsoft', modelo : 'UltraPad',
num_serie : 987, tipo_eqpto: 'Periferico',
caracteristicas : { resolucao_dpi : 2400, tipo_periferico: 'Mouse Optico', 
tipo_conexao : 'Sem fio' , botoes: 3 } , Fornecedor : 998800, Fabricante : 112233,
valor_aquisicao: 250.00 } ) 
db.equipamento.updateOne ({patrimonio: 101} ,
{$set: {dt_aquisicao : ISODate ( "2024-11-05T16:20:00.000Z") } } ) 

// junção no MONGODB -> aggregate + lookup
// equipamentos fornecidos por cada fornecedor
db.empresa.aggregate(
[ {$lookup: 
      { from : "equipamento" ,
        localField: "cnpj" ,
        foreignField: "Fornecedor", 
        as :   "eqptos_fornecidos"  }   }  ]  )

// equipamentos fabricados por cada fabricante
db.empresa.aggregate(
[ {$lookup: 
      { from : "equipamento" ,
        localField: "cnpj" ,
        foreignField: "Fabricante", 
        as :   "eqptos_fabricados"  }   }  ]  )

db.equipamento.updateOne({patrimonio: 101}, {$set: {Fornecedor: 1000} } )
// restaurando o fornecedor original
db.equipamento.updateOne({patrimonio: 101}, {$set: {Fornecedor: 998800 } } )

// fabricante de cada equipamento
db.equipamento.aggregate(
[ {$lookup: 
      { from : "empresa" ,
        localField: "Fabricante" ,
        foreignField: "cnpj", 
        as :   "fabricante_eqpto"  }   }  ]  )

// novo equipamento
db.equipamento.insertOne({patrimonio: 102, marca: 'IBM', modelo : 'UltraVision',
num_serie : 321 , tipo_eqpto: 'Periferico',
caracteristicas : { resolucao_dpi : '1920x1260', tipo_periferico: 'Monitor LED', 
tipo_conexao : 'HDMI' , tamanho_pol: 27  } , Fornecedor : 998800, Fabricante : 445566,
valor_aquisicao: 1250.00 } ) 

// equipamentos de cada fornecedor mas testando se é fornecedor e se existe o campo cnpj
db.empresa.aggregate(
[ {$match: {tipo_empresa : /fornecedor/i , "cnpj": {$exists: true} } } ,
  {$lookup: 
      { from : "equipamento" ,
        localField: "cnpj" ,
        foreignField: "Fornecedor", 
        as :   "eqptos_fornecidos"  }   }  ]  )

// mesma consulta acima, mas mostrando somente alguns campos -> $project 
// filtrando a consulta com a função match - usada somente no agregate
db.empresa.aggregate(
[ {$match: {tipo_empresa : /fornecedor/i , "cnpj": {$exists: true} } } ,
  {$lookup: 
      { from : "equipamento" ,
        localField: "cnpj" ,
        foreignField: "Fornecedor", 
        as :   "eqptos_fornecidos"  }   } ,
   {$project: { _id: 0 , razao_social: 1, cnpj: 1,   "eqptos_fornecidos.patrimonio"  :1 ,
"eqptos_fornecidos.modelo"  :1 , "eqptos_fornecidos.tipo_eqpto"  :1  }   }    ]  )


// relacionar o computador 100 com os perifericos 101 e 102
db.equipamento.updateOne ({patrimonio:100},
{$set: {perifericos_instalados : [{ patrimonio:101, dt_hora_alocacao: new Date() }, 
                                                  { patrimonio: 102 , dt_hora_alocacao : new Date()  } ]  }  } )



// inserindo mais perifericos
db.equipamento.insertOne({patrimonio: 101, marca: 'Microsoft', modelo : 'Surface'
num_serie : 7523, tipo_eqpto: 'Periferico',
caracteristicas : { resolucao_dpi : 2400, tipo_periferico: 'Mouse Optico', 
tipo_conexao : 'BlueTooth'} , Fornecedor : 998800, Fabricante : 112233,
valor_aquisicao: 10250.00 } ) 

// sequencia para consulta com as funcoes de agregacoes
// $match -> $lookup -> $project -> resultado (pipeline)

// consulta recursiva
// mostrando os perifericos instalados
db.equipamento.aggregate(
[ {$match: { "perifericos_instalados" : {$exists: true } } } ,
  {$lookup: 
            { from: "equipamento" ,
              localField : "perifericos_instalados.patrimonio" ,
              foreignField: "patrimonio" ,
              as : "alocação_perifericos"  }  } ,
  {$project: {_id: 0 , "patrimonio": 1, "modelo": 1 , "tipo_eqpto": 1, 
              "alocação_perifericos.patrimonio" : 1,
              "alocação_perifericos.modelo" : 1,
              "alocação_perifericos.tipo_eqpto" : 1,
              "alocação_perifericos.caracteristicas.tipo_periferico" : 1  }  }  ]  ) 

// project no find(), não precisa escrever $project
db.empresa.find({}, {razao_social: 1})


// mostrando tambem a empresa fornecedora de cada periferico

// mostrando também a empresa fabricante de cada periferico 
db.equipamento.aggregate(
[ {$match: { "perifericos_instalados" : {$exists: true } } } ,
   // relaciona com o proprio equipamento que são os perifericos
  {$lookup: 
            { from: "equipamento" ,
              localField : "perifericos_instalados.patrimonio" ,
              foreignField: "patrimonio" ,
              as : "alocação_perifericos"  }  } ,
  { $unwind : "$alocação_perifericos" },
   // relaciona como fornecedor dos perifericos
     { $lookup: 
              { from: "empresa" ,
              localField : "alocação_perifericos.Fabricante" ,
              foreignField: "cnpj" ,
              as : "fabricante_periferico"  }  } ,
    { $unwind: "$fabricante_periferico" }, 
    {$project: {_id: 0 , "patrimonio": 1, "modelo": 1 , "tipo_eqpto": 1, 
              "alocação_perifericos.patrimonio" : 1,
              "alocação_perifericos.modelo" : 1,
              "alocação_perifericos.tipo_eqpto" : 1,
              "alocação_perifericos.caracteristicas.tipo_periferico" : 1 ,
               "fabricante_periferico.razao_social" : 1 }  }  ]  ) 
