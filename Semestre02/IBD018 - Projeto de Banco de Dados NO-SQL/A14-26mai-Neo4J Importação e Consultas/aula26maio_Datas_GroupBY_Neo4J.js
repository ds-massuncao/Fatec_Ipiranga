// ================================================
// ARQUIVO: manipulacao_datas_e_filmes.cypher
// DESCRIÇÃO: Script Cypher para estudos com Neo4j
// AUTOR: Marcos Assunção
// DATA: 26 de maio de 2025
// ================================================
// RECURSOS USADOS:
// - date(), datetime(), duration()
// - toInteger(), split(), UNWIND
// - WHERE com operadores de string (STARTS WITH, ENDS WITH, CONTAINS, =~)
// - MATCH para consultas
// - SET para atualização de propriedades
// - funções de agregação: COUNT, AVG, MAX, MIN
// ================================================


////////////////////////////////////
// 1. MANIPULAÇÃO DE DATAS E HORAS
////////////////////////////////////

// SYNTAX: date(), datetime()
// Retorna data e hora atual do sistema
RETURN date() AS data_atual, datetime() AS datahora_atual;

// SYNTAX: datetime({timezone: '...'}) 
// Retorna data/hora considerando fuso horário
RETURN datetime({timezone: 'Greenwich'}) AS datahora_utc;
RETURN datetime({timezone: "America/Sao_Paulo"}) AS datahora_sp;

// SYNTAX: datetime().hour, datetime().week
// Extrai partes da data/hora
RETURN datetime({timezone: "America/Sao_Paulo"}).hour AS hora_atual;
RETURN datetime({timezone: "America/Sao_Paulo"}).week AS semana_atual;

// SYNTAX: + duration({units})
// Soma 2 horas à data/hora
RETURN datetime({timezone: "America/Sao_Paulo"}) + duration({hours:2}) AS duas_horas_mais;

// SYNTAX: UNWIND + date()
// Demonstração de diferentes formatos de data
UNWIND [
  date('2025-10-25'),
  date('2025-10'),
  date('202510'),
  date('2025-W22-1'),
  date('2025300'),
  date('2025')
] AS Formatos_Data
RETURN Formatos_Data;

// SYNTAX: duration.between(data1, data2)
// Calcula duração entre diferentes tipos de data/hora
UNWIND [
  duration.between(date("1984-10-11"), date("1985-11-25")),
  duration.between(date("1985-11-25"), date("1984-10-11")),
  duration.between(date("1984-10-11"), datetime("1984-10-12T21:40:32.142+0100")),
  duration.between(date("2015-06-24"), localtime("14:30")),
  duration.between(localtime("14:30"), time("16:30+0100")),
  duration.between(localdatetime("2015-07-21T21:40:32.142"), localdatetime("2016-07-21T21:45:22.142")),
  duration.between(
    datetime({year: 2017, month: 10, day: 29, hour: 0, timezone: 'Europe/Stockholm'}),
    datetime({year: 2017, month: 10, day: 29, hour: 0, timezone: 'Europe/London'})
  )
] AS aDuration
RETURN aDuration;


///////////////////////////////////////////////////////
// 2. CONVERSÃO DE CAMPOS: toInteger()
///////////////////////////////////////////////////////

// SYNTAX: SET propriedade = toInteger(valor)
// Converte altura de string para número inteiro
MATCH (a:Artista)
SET a.altura = toInteger(a.altura)
RETURN a;

// Converte duração e ano de filmes
MATCH (f:Filme)
SET f.duração = toInteger(f.duração),
    f.ano_lançamento = toInteger(f.ano_lançamento)
RETURN f;


///////////////////////////////////////////////////////
// 3. CONSULTAS COM FILTROS DE NOME
///////////////////////////////////////////////////////

// SYNTAX: =~ '(?i).*texto.*' → regex que ignora maiúsculas
// Busca com expressão regular (regex)
MATCH (x)-[z:Elenco]->(y)
WHERE y.nome =~ '(?i).*jim.*' AND y.nome =~ '(?i).*carrey.*'
RETURN *
LIMIT 10;

// SYNTAX: MATCH direto com filtro no nome
MATCH (f)-[e:Elenco {tipo_participação: "actor"}]->(a:Artista {nome: "Jim Carrey"})
RETURN *
LIMIT 100;


/////////////////////////////////////////////////////////
// 4. FILTROS DE TEXTO: STARTS WITH, ENDS WITH, CONTAINS
/////////////////////////////////////////////////////////

// SYNTAX: STARTS WITH
MATCH (f:Filme)
WHERE toUpper(f.titulo_original) STARTS WITH 'LOVE'
RETURN f;

// SYNTAX: regex que começa com (^)
MATCH (f:Filme)
WHERE f.titulo_original =~ '(?i)^love.*'
RETURN f
LIMIT 15;

// SYNTAX: ENDS WITH
MATCH (f:Filme)
WHERE toUpper(f.titulo_original) ENDS WITH 'WARS'
RETURN f
LIMIT 15;

// SYNTAX: regex que termina com ($)
MATCH (f:Filme)
WHERE f.titulo_original =~ '(?i).*wars$'
RETURN f
LIMIT 15;

// SYNTAX: CONTAINS
MATCH (a:Artista)
WHERE toUpper(a.nome) CONTAINS "FORD"
RETURN a.nome, a.local_nascto
LIMIT 50;

// SYNTAX: regex com .*termo.*
MATCH (a:Artista)
WHERE a.nome =~ '(?i).*ford.*'
RETURN a.nome, a.local_nascto
LIMIT 50;


/////////////////////////////////////////
// 5. FUNÇÕES DE AGREGAÇÃO E AGRUPAMENTO
/////////////////////////////////////////

// SYNTAX: COUNT()
MATCH (a:Artista)
RETURN COUNT(a.nome) AS Contagem;

// SYNTAX: AVG() + COUNT()
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
RETURN COUNT(a.altura) AS Contagem, AVG(a.altura) AS Media;

// SYNTAX: GROUP BY altura
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
RETURN a.altura, COUNT(*) AS Contagem
ORDER BY Contagem DESC;

// SYNTAX: MAX(), MIN(), subtração de valores
MATCH (a:Artista)
WHERE a.altura IS NOT NULL
RETURN MAX(a.altura) AS Maior, MIN(a.altura) AS Menor, MAX(a.altura) - MIN(a.altura) AS Diferença;

// SYNTAX: GROUP BY local de nascimento
MATCH (a:Artista)
WHERE a.altura IS NOT NULL AND a.local_nascto IS NOT NULL
RETURN a.local_nascto AS Local, AVG(a.altura) AS Media, COUNT(*) AS Contagem
ORDER BY Media DESC;


///////////////////////////////////////////////////////
// 6. ANÁLISE DE GÊNEROS: SPLIT, UNWIND e GROUP BY
///////////////////////////////////////////////////////

// SYNTAX: SPLIT(string, separador), UNWIND
WITH ["Comedy, Drama"] AS generos
WITH [elemento IN generos | split(elemento, ', ')] AS ValorExtraido
UNWIND ValorExtraido AS VetorGeneros
UNWIND VetorGeneros AS genero
RETURN genero;

// SYNTAX: UNWIND para vetores de gêneros e agregação
MATCH (f:Filme)
WHERE f.generos IS NOT NULL
WITH [elemento IN f.generos | split(elemento, ', ')] AS GeneroExtraido
UNWIND GeneroExtraido AS VG
UNWIND VG AS genero
RETURN genero, COUNT(*) AS Qtos_filmes_por_genero
ORDER BY Qtos_filmes_por_genero DESC;

// SYNTAX: GROUP BY país e gênero (com SPLIT e UNWIND)
MATCH (f:Filme)
WHERE f.generos IS NOT NULL AND f.país IS NOT NULL
WITH [split IN f.generos | split(split, ', ')] AS GeneroExtraido,
     [split IN f.país | split(split, ', ')] AS PaisExtraido
UNWIND GeneroExtraido AS VG
UNWIND PaisExtraido AS VP
UNWIND VG AS genero
UNWIND VP AS pais
RETURN pais, genero, COUNT(*) AS Qtosfilmes_por_pais_genero
ORDER BY Qtosfilmes_por_pais_genero DESC;

// SYNTAX: filtro por país com regex '(?i)bra.*'
MATCH (f:Filme)
WHERE f.generos IS NOT NULL AND f.país IS NOT NULL
WITH [split IN f.generos | split(split, ', ')] AS GeneroExtraido,
     [split IN f.país | split(split, ', ')] AS PaisExtraido
UNWIND GeneroExtraido AS VG
UNWIND PaisExtraido AS VP
UNWIND VG AS genero
UNWIND VP AS pais
WITH genero AS gen, pais AS p
WHERE p =~ '(?i)bra.*'
RETURN p, gen, COUNT(*) AS Qtosfilmes_por_pais_genero
ORDER BY Qtosfilmes_por_pais_genero DESC;


////////////////////////////////////////////////
// 7. AGRUPAMENTO POR PARTICIPAÇÃO NO ELENCO
////////////////////////////////////////////////

// SYNTAX: agrupamento por tipo_participação
MATCH (f)-[e:Elenco]->(a)
WHERE a.nome =~ '(?i)^clint.*' AND toUpper(a.nome) ENDS WITH 'EASTWOOD'
RETURN e.tipo_participação AS Participação, COUNT(*) AS Contagem
LIMIT 100;

MATCH (f)-[e:Elenco]->(a)
WHERE a.nome =~ '(?i)^meryl.*' AND toUpper(a.nome) ENDS WITH 'STREEP'
RETURN e.tipo_participação AS Participação, COUNT(*) AS Contagem
LIMIT 100;
