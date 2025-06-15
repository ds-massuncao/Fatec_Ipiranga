// Seleciona um banco de dados. Se não existir, ele será criado.
use <nome_do_banco_de_dados>

// Lista todos os bancos de dados.
show databases

// Remove (droga) uma coleção específica.
db.<nome_da_colecao>.drop()

// Insere um único documento em uma coleção.
db.<nome_da_colecao>.insertOne( { <campo1>: <valor1>, <campo2>: <valor2>, ... } )

// Lista todas as coleções no banco de dados atual.
show collections

// Encontra e retorna todos os documentos de uma coleção (equivalente a SELECT *).
db.<nome_da_colecao>.find()

// Insere múltiplos documentos em uma coleção.
db.<nome_da_colecao>.insertMany([
  { <campo1_doc1>: <valor1_doc1>, ... },
  { <campo1_doc2>: <valor1_doc2>, ... },
  ...
])

// Deleta um único documento que corresponde a um filtro.
db.<nome_da_colecao>.deleteOne( { <filtro_campo>: <filtro_valor> } )
// Exemplo com ObjectId:
db.<nome_da_colecao>.deleteOne( { _id : ObjectId("<id_do_documento>") } )

// Encontra documentos com base em um filtro.
db.<nome_da_colecao>.find( { <campo>: <valor> } )

// Exemplos de busca com expressões regulares:
// Começa com: /^<string>/i (o 'i' é para case-insensitive)
db.<nome_da_colecao>.find({ <campo>: /^<string_inicial>/i })
// Contém: /<string>/i
db.<nome_da_colecao>.find( { <campo>: /<string_contida>/i } )
// Contém com curinga: /<parte1>.*<parte2>/i
db.<nome_da_colecao>.find( { <campo>: /<parte_inicial>.*<parte_final>/i } )

// Consultas com operadores lógicos:

// AND lógico (implícito por vírgula para campos diferentes ou com $and para o mesmo campo/múltiplas condições complexas).
// Para o mesmo campo com múltiplas condições (ou condições complexas):
db.<nome_da_colecao>.find( { $and : [ { <condicao1> }, { <condicao2> } ] } )

// OR lógico:
db.<nome_da_colecao>.find( { $or: [ { <condicao1> }, { <condicao2> } ] } )

// NOT lógico:
db.<nome_da_colecao>.find( { <campo>: { $not: /<expressao_regular>/ } } )
// Para valores numéricos diferentes de:
db.<nome_da_colecao>.find( { <campo>: { $ne: <valor> } } )

// Atualiza um único documento que corresponde a um filtro.
// O operador $set é usado para definir ou atualizar o valor de um campo.
db.<nome_da_colecao>.updateOne(
  { <filtro_campo>: <filtro_valor> },
  { $set: { <campo_para_atualizar>: <novo_valor> } }
)

// Consulta com operadores de comparação:
// Maior que: $gt
db.<nome_da_colecao>.find({ <campo_numerico> : { $gt: <valor> }})
// Menor que: $lt
db.<nome_da_colecao>.find({ <campo_numerico> : { $lt: <valor> }})
// Maior ou igual: $gte
db.<nome_da_colecao>.find({ <campo_numerico> : { $gte: <valor> }})
// Menor ou igual: $lte
db.<nome_da_colecao>.find({ <campo_numerico> : { $lte: <valor> }})

// Atualização de arrays:

// Adiciona um ou mais elementos a um array.
db.<nome_da_colecao>.updateOne(
  { <filtro_documento> },
  { $push: { <nome_do_array>: <valor_a_adicionar> } }
)
// Para adicionar múltiplos elementos:
db.<nome_da_colecao>.updateOne(
  { <filtro_documento> },
  { $push: { <nome_do_array>: {$each: [<valor1>, <valor2>, ...]} } }
)

// Atualiza um elemento específico em um array (usando o operador posicional '$').
db.<nome_da_colecao>.updateOne(
  { <filtro_documento>, "<nome_do_array>": <valor_no_array_a_ser_localizado> },
  { $set: { "<nome_do_array>.$" : <novo_valor> } }
)

// Remove elementos de um array.
db.<nome_da_colecao>.updateOne(
  { <filtro_documento> },
  { $pull: { "<nome_do_array>" : <valor_a_remover> } }
)
