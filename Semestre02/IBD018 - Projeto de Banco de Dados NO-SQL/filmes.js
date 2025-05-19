db.movie.aggregate ([
  { $match: {directors: {$ne: null}}},
  {$unwind: "$directors"},
  { $group : { _id: {direcao: "$directors"},  
              contagem_direcao : {$count : {} } } },
{$match: {contagem_direcao: {$lte: 2} }}, 
{$sort : { contagem_direcao: -1 , _id : 1}]) 
