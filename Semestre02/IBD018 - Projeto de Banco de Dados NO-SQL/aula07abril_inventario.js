// Este comando seleciona o banco de dados 'bd2_2025' para uso.
// Se o banco de dados não existir, o MongoDB o criará na primeira inserção de dados.
use bd2_2025

// Lista todos os bancos de dados disponíveis no servidor MongoDB.
show databases

// Este comando remove a coleção 'empresa' se ela já existir no banco de dados atual.
// É útil para garantir um estado limpo antes de começar a inserir novos dados.
db.empresa.drop()

// Insere um único documento na coleção 'empresa'.
// O documento representa uma empresa com 'razao_social', 'endereco' e uma lista de 'fones'.
db.empresa.insertOne( {razao_social: 'Microsoft do Brasil Ltda',
endereco: 'Av. Engenheiro Berrini, 1000 - Brooklin - São Paulo',
fones: [1150801000, 1150801001]  }  )

// Lista todas as coleções presentes no banco de dados 'bd2_2025'.
show collections

// Retorna todos os documentos da coleção 'empresa'.
// É o equivalente a um 'SELECT *' em SQL.
db.empresa.find()

// Insere múltiplos documentos na coleção 'empresa' de uma vez.
// Demonstra a inserção de documentos com estruturas aninhadas (como o 'endereco' da IBM)
// e diferentes formatos de dados para 'fones'.

db.empresa.insertMany([{razao_social: 'IBM do Brasil Ltda',
endereco: {logradouro: 'Rua Tutóia', numero: 100,
bairro: 'Paraíso', cidade : 'Sao Paulo', cep: 02240100},
cnpj: 1234, fones: [{ddd:11, num: 32151000},
                    {ddd:11, num: 32774000} ] },
{razao_social: 'ABC Equipamentos Ltda',
endereco: 'Rua Vergueiro, 500 - Ipiranga',
fone: 115550100}])

// **Atenção:** Os comandos abaixo tentam deletar documentos por '_id'.
// É importante notar que esses '_id's são gerados automaticamente pelo MongoDB
// e serão diferentes a cada execução do script.
// Para que funcionem, você precisaria substituir os valores por _ids reais
// de documentos existentes em sua coleção.

// Deleta um documento específico da coleção 'empresa' com base no seu '_id'.
db.empresa.deleteOne({ _id : ObjectId("67f3c33f28c81a7a8e1112cb") } )
// Deleta outro documento específico.
db.empresa.deleteOne({ _id : ObjectId("67f3c33f28c81a7a8e1112cc") } )

// Encontra documentos onde a 'razao_social' contém "abc", ignorando maiúsculas/minúsculas ('i').
// O '/abc/i' é uma expressão regular para busca.
db.empresa.find({ razao_social: /abc/i })
// Tenta deletar um documento com um '_id' específico (veja a observação acima sobre _ids).
db.empresa.deleteOne({ _id : ObjectId("67f3c33f28c81a7a8e1112cd" ) } )

// Encontra documentos onde a 'razao_social' começa com "micro", ignorando maiúsculas/minúsculas.
// O '^' indica o início da string.
db.empresa.find({razao_social: /^micro/i })

// Encontra documentos onde a 'razao_social' contém "bra" seguido por zero ou mais caracteres
// e depois "il", ignorando maiúsculas/minúsculas.
// O '.*' é um curinga para zero ou mais caracteres.
db.empresa.find( {razao_social : /bra*.il/i  } )

// **Atenção:** Este comando pode não funcionar como esperado em MongoDB
// pois a vírgula dentro de um objeto de consulta significa um 'AND' implícito,
// mas para o mesmo campo, a última condição sobrescreve a anterior.
// O MongoDB irá aplicar apenas a última condição ('razao_social: /bra/i').
db.empresa.find ({razao_social: /ltda/i , razao_social: /bra/i })

// A maneira correta de realizar um 'AND' lógico entre múltiplas condições no mesmo campo
// (ou em campos diferentes) é utilizando o operador '$and'.
db.empresa.find ({$and : [ {razao_social: /ltda/i} ,
                           {razao_social: /bra/i } ] } )

// Encontra documentos onde o 'endereco' contém "s.o paulo" (com qualquer caractere no lugar do '.')
// OU onde o campo aninhado 'endereco.cidade' contém "s.o paulo".
db.empresa.find( {$or: [ {endereco:  /s.*o paulo/i} ,
                         { "endereco.cidade":  /s.*o paulo/i } ] })

// Encontra documentos onde a 'razao_social' contém "ltda" E a 'razao_social' NÃO contém "bra".
// O operador '$not' inverte a condição da expressão regular.
// Para números, use '$ne' (not equal).
db.empresa.find ({$and : [ {razao_social: /ltda/i} ,
                           {razao_social: {$not: /bra/i } } ] } )

// Atualiza o documento onde 'razao_social' contém "microsoft", adicionando o campo 'ano_fundação' com o valor 1974.
// O '$set' é usado para definir ou atualizar o valor de um campo.
db.empresa.updateOne( {razao_social: /microsoft/i},
                       {$set: {ano_fundação: 1974 } })
// Atualiza o 'ano_fundação' para IBM.
db.empresa.updateOne( {razao_social: /ibm/i},
                         {$set: {ano_fundação: 1911}} )
// Atualiza o 'ano_fundação' para ABC Equipamentos.
db.empresa.updateOne( {razao_social: /abc/i},
                         {$set: {ano_fundação: 2002}} )
// Retorna todos os documentos para visualizar as atualizações.
db.empresa.find()

// Encontra documentos onde 'ano_fundação' é maior que ($gt) 1950.
db.empresa.find({ano_fundação : { $gt: 1950 }})

// **Atenção:** Este comando não funcionará como um range, pois a última condição sobrescreve a primeira
// para o mesmo campo ('ano_fundação').
db.empresa.find({ ano_fundação : { $lte: 2000 }, ano_fundação : { $gte:1950 } })

// A forma correta de realizar uma consulta de range (entre dois valores)
// é usando o operador '$and' com as duas condições.
db.empresa.find({ $and: [ { ano_fundação : { $gte: 1950 } },
                                          { ano_fundação : { $lte: 2000 } } ] } )

// Adiciona os números 1132561234 ao array 'fones' do documento da Microsoft.
// O '$push' adiciona elementos a um array. O '$each' permite adicionar múltiplos elementos de uma vez.
db.empresa.updateOne( {razao_social : /microsoft/i },
                   {$push: { fones: {$each: [1132561234] } } })

// Atualiza um elemento específico dentro do array 'fones'.
// Encontra o documento da Microsoft e, dentro do array 'fones', localiza o elemento 1150801001
// e o substitui por 1150809999. O operador '$' é um placeholder para o elemento encontrado na query.
db.empresa.updateOne( {razao_social : /microsoft/i , "fones": 1150801001},
{$set: { "fones.$" : 1150809999 } } )

// Remove o número 1150801000 do array 'fones' do documento da Microsoft.
// O '$pull' remove todos os elementos de um array que correspondem ao valor especificado.
db.empresa.updateOne( {razao_social : /microsoft/i },
{$pull: {"fones" : 1150801000 } } )
