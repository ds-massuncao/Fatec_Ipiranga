/* Esquema de Relações - Sessão de Cinema
Filme ( cod_filme(PK), titulo_portugues, titulo_original, idioma_original, sinopse, genero, duracao, ano_lcto, classificacao_etaria, situ_filme)
Sessao(num_sessao(PK), dt_sessao, publico_total, renda, legendado, idioma_sessao, cod_filme(FK)NN, nm_sala(FK)NN, cod_hora(FK)NN, situ_sessao)
Sala(nome_sala(PK), capacidade, tipo_video, tipo_audio, situ_sala)
Horario(cod_hora(PK), horario )
Funcionario(cod_func(PK), nome_func, num_ctps(AK), dt_admissao, sexo_func, dt_nascto_func,
                    situ_func)
Escala_trabalho (cod_hora(PK)(FK), cod_func(PK)(FK), dia_semana(PK), funcao, dt_ini_escala,
                            dt_fim_escala)
Premio (Sigla_premio(PK), nm_premio)
Premiacao (Sigla_premio(PK)(FK), cod_filme(PK)(FK), categoria(PK), ano_premiacao)
*/
SET DATESTYLE TO POSTGRES, DMY ;

-- tabela horario
DROP TABLE IF EXISTS horario CASCADE ;
CREATE TABLE horario 
( cod_hora SMALLINT PRIMARY KEY, 
horario TIME NOT NULL  ); 

-- populando horario
INSERT INTO horario VALUES (14, '14:00:00') ;
INSERT INTO horario (horario, cod_hora)
            VALUES ('16:00:00', 16) ;




-- tabela funcionario
DROP TABLE IF EXISTS funcionario CASCADE ;
CREATE TABLE funcionario (
cod_func SMALLINT NOT NULL, 
nome_func VARCHAR(60) NOT NULL, 
num_ctps NUMERIC(11) NOT NULL,
dt_admissao DATE NOT NULL, 
sexo_func CHAR(1) NOT NULL CHECK (sexo_func IN ('M', 'F'))  , 
dt_nascto_func DATE NOT NULL,
situ_func CHAR(15) NOT NULL,
PRIMARY KEY (cod_func),
UNIQUE(num_ctps) ) ;
-- definindo CHECK para situacao do funcionario
ALTER TABLE funcionario ADD CHECK (situ_func IN ('ATIVO', 'DESLIGADO', 'AFASTADO',
                                                                                       'FERIAS') ) ;
-- populando funcionario
INSERT INTO funcionario VALUES 
(1, 'Jose de Arimateia', 123456, '10/01/2010', 'F',
'05/05/1995', 'ATIVO') ;
UPDATE funcionario SET sexo_func = 'M'
WHERE cod_func = 1 ;
SELECT * FROM funcionario ;
-- restricao para dt_nascto ser menor que data atual
ALTER TABLE funcionario ADD CHECK (dt_nascto_func <= current_date) ;

-- tabela escala de trabalho
DROP TABLE IF EXISTS escala_trabalho CASCADE ;
CREATE TABLE escala_trabalho (
cod_hora SMALLINT NOT NULL,
cod_func SMALLINT NOT NULL,
dia_semana CHAR(15) NOT NULL, 
funcao CHAR(15) NOT NULL,
dt_ini_escala DATE NOT NULL,
dt_fim_escala DATE NOT NULL,
PRIMARY KEY (cod_hora, cod_func, dia_semana),
FOREIGN KEY (cod_hora) REFERENCES horario(cod_hora)
                 ON UPDATE RESTRICT ON DELETE RESTRICT, -- ação referencial
FOREIGN KEY (cod_func) REFERENCES funcionario(cod_func)
                  ON UPDATE RESTRICT ON DELETE RESTRICT ) ;
-- populando  horario 14 e 16, func 1 
INSERT INTO escala_trabalho VALUES ( 18, 1, 'segunda-feira', 'Atendente', current_date -1, 
current_date + 6 ) ;
SELECT * FROM escala_trabalho ;
-- tentativa de deletar o horario 14
DELETE FROM horario
WHERE cod_hora = 14 ;
-- alterando a constraint da FK em escala trabalho
ALTER TABLE escala_trabalho
DROP CONSTRAINT escala_trabalho_cod_hora_fkey ;
ALTER TABLE escala_trabalho ADD
FOREIGN KEY (cod_hora) REFERENCES horario(cod_hora)
ON UPDATE CASCADE ON DELETE CASCADE ;
-- atualizar o horario 14 -> 18
SELECT * FROM horario ;
SELECT * FROM escala_trabalho ;
UPDATE horario SET cod_hora = 18, horario = '18:00:00'
WHERE cod_hora = 14 ;

SELECT * FROM pg_constraint ;

-- tabela sala
DROP TABLE IF EXISTS sala CASCADE ;
CREATE TABLE sala (
nome_sala CHAR(20) PRIMARY KEY ,  
capacidade SMALLINT NOT NULL CHECK (capacidade >0) , 
tipo_audio VARCHAR(20) NOT NULL, 
tipo_video VARCHAR(20) NOT NULL, 
situ_sala CHAR(15) CHECK (situ_sala IN ('ATIVO', 'INATIVO', 'MANUTENCAO') ) ) ;
ALTER TABLE sala ALTER COLUMN tipo_audio TYPE VARCHAR(30); 
-- populando sala 
INSERT INTO sala VALUES ('JOSE MOJICA', 100, 'Dolby Surrond Max Plus',
'4D Imersive' , 'ATIVO') ;

/* Atividade 04 :
1- Montar o script em SQL para a criação das tabelas EM VERDE no SGBD Postgresql tomando como base o esquema de relações e o diagrama lógico-relacional, com as seguintes características: 
Filme, Sessao, Premio, Premiacao
a) Ações referenciais ON DELETE ON UPDATE
c) Colunas que indicam instante de tempo com o tipo de dado correspondente (DATE ou TIMESTAMP). */

-- tabela filme
DROP TABLE IF EXISTS filme CASCADE ;
CREATE TABLE filme (
cod_filme SMALLINT PRIMARY KEY NOT NULL,
titulo_original VARCHAR(50) NOT NULL,
titulo_portugues VARCHAR(50) NOT NULL,
idioma_original CHAR(15) NOT NULL,
sinopse VARCHAR(2000) NOT NULL,
duracao_min SMALLINT NOT NULL,
ano_lancamento SMALLINT NOT NULL,
situacao_filme CHAR(15) NOT NULL) ;

-- check em situação
ALTER TABLE filme 
ADD CHECK (situacao_filme IN ('EM CARTAZ','FORA CARTAZ','SEM COPIA'));

INSERT INTO filme VALUES ( 100, 'Star Wars: Episode IV - A New Hope',
'Guerra nas Estrelas - Uma nova esperança ', 'INGLÊS', 
'O jovem Luke Skywalker (Mark Hamill) sonha ir para a Academia como seus amigos, 
mas se vê envolvido em uma guerra intergalática quando seu tio compra dois robôs
 e com eles encontra uma mensagem da princesa Leia Organa para o Jedi Obi-Wan Kenobi
 sobre os planos da construção da Estrela da Morte,
 uma gigantesca estação espacial com capacidade para destruir um planeta.
 Luke então se junta aos cavaleiros Jedi e a Han Solo, um mercenário, 
 para tentar destruir esta terrível ameaça ao lado dos membros da resistência.', 121, 1977,'EM CARTAZ' );

INSERT INTO filme VALUES ( 101, 'Central do Brasil', 'Central do Brasil', 'PORTUGUÊS', 
'Dora (Fernanda Montenegro) trabalha escrevendo cartas para analfabetos
 na estação Central do Brasil, no centro da cidade do Rio de Janeiro.
 Ainda que a escrivã não envie todas as cartas que escreve - as cartas que considera inúteis
 ou fantasiosas demais -, ela decide ajudar um menino (Vinícius de Oliveira), 
 após sua mãe ser atropelada, a tentar encontrar o pai que nunca conheceu,
 no interior do Nordeste.', 113, 1998,'EM CARTAZ' );

 SELECT * FROM filme ;
 
-- tabela sessao  -- falta horario
DROP TABLE IF EXISTS sessao CASCADE;
CREATE TABLE sessao (
num_sessao SERIAL PRIMARY KEY ,
dt_sessao DATE NOT NULL,
publico SMALLINT,
renda_sessao NUMERIC(10,2) NOT NULL,
legendado BOOLEAN NOT NULL,
idioma_sessao CHAR(15) NOT NULL,
nome_sala CHAR(15) NOT NULL,
cod_filme SMALLINT NULL ,
FOREIGN KEY (nome_sala) REFERENCES sala(nome_sala)
ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (cod_filme) REFERENCES filme
ON DELETE RESTRICT ON UPDATE CASCADE ) ;
-- população
INSERT INTO sessao VALUES ( default, 
current_date + 3, 0, 0, 'T','Portugues', 'JOSE MOJICA', 100 ) ;
INSERT INTO sessao VALUES ( default, 
current_date + 4, 0, 0, 'F','Portugues', 'JOSE MOJICA', 101 ) ;

-- Premio (Sigla_premio(PK), nome_premio)
DROP TABLE IF EXISTS premio CASCADE ;
CREATE TABLE premio (
sigla_premio CHAR(6) PRIMARY KEY,
nome_premio VARCHAR(30) NOT NULL ) ;

INSERT INTO premio VALUES ( 'OSCAR', 'Oscar') ;
INSERT INTO premio VALUES ( 'CANNES', 'Festival de Cannes') ;
INSERT INTO premio VALUES ( 'URSO', 'Urso de ouro Festival Berlim') ;
SELECT * FROM premio ;

-- Premiacao ( Sigla_premio(PK)(FK), Cod_filme(PK)(FK), Categoria(PK), Ano_premiacao)
DROP TABLE IF EXISTS premiacao CASCADE ;
CREATE TABLE premiacao (
sigla_premio CHAR(6) NOT NULL REFERENCES premio ON DELETE CASCADE ON UPDATE CASCADE , 
cod_filme SMALLINT NOT NULL REFERENCES filme ON DELETE CASCADE ON UPDATE CASCADE, 
categoria CHAR(15) NOT NULL, 
ano_premiacao SMALLINT NOT NULL,
PRIMARY KEY ( sigla_premio, cod_filme, categoria) ) ;

INSERT INTO premiacao VALUES ( 'CANNES', 100 , 'Melhor Filme', 1978) ;
INSERT INTO premiacao VALUES ( 'URSO', 100 , 'Melhor Filme', 1978) ;
INSERT INTO premiacao VALUES ( 'URSO', 101 , 'Melhor Direcao', 1999) ;
INSERT INTO premiacao VALUES ( 'URSO', 101 , 'Melhor Atriz', 1999) ;
SELECT * FROM premiacao ;


-- 2 – Inserir uma linha em cada tabela criada no item 1.
-- alterando a estrutura das tabelas
-- adicionando colunas
ALTER TABLE filme ADD COLUMN genero VARCHAR(20) NOT NULL,
ADD COLUMN classifica_etaria VARCHAR(20) NOT NULL ;

-- atualizando dados das novas colunas
UPDATE filme SET genero = 'ficção Científica', classifica_etaria = 'Livre' 
WHERE cod_filme = 100 ;
UPDATE filme SET genero = 'drama', classifica_etaria = 'Livre' 
WHERE cod_filme = 101 ;

-- alterando tipo de dado de uma coluna
ALTER TABLE sessao ALTER COLUMN idioma_sessao TYPE VARCHAR(20) ;
-- definindo um valor padrao para a coluna - default 
ALTER TABLE sessao ALTER COLUMN idioma_sessao SET DEFAULT 'PORTUGUÊS' ;

-- inserindo nova sessao
INSERT INTO sessao VALUES ( default, 
current_date + 5, 0, 0, 'F', default, 'JOSE MOJICA', 101 ) ;
SELECT * FROM Sessao ;
UPDATE sessao SET idioma_sessao = 'PORTUGUÊS'
WHERE idioma_sessao != 'PORTUGUÊS' ;

-- adicionando a chave estrangeira de horario na tabela sessao 
ALTER TABLE sessao ADD COLUMN cod_hora  SMALLINT ;
ALTER TABLE sessao ADD CONSTRAINT hora_sessao_fkey
FOREIGN KEY (cod_hora )  REFERENCES
horario (cod_hora) ON DELETE RESTRICT ON UPDATE CASCADE ;
SELECT * FROM Sessao ;
SELECT * FROM horario ;
UPDATE sessao SET cod_hora = 16 WHERE cod_filme = 100 ;
UPDATE sessao SET cod_hora = 18 WHERE cod_filme = 101 ;

-- redefinindo para NOT NULL
ALTER TABLE sessao ALTER COLUMN cod_hora SET NOT NULL ;

-- adicionando nova coluna em funcionario, renomeando e excluindo
ALTER TABLE funcionario ADD COLUMN pis_pasep VARCHAR(20)  NULL;
UPDATE funcionario SET pis_Pasep = 'SP123' ;
ALTER TABLE  funcionario ALTER COLUMN pis_pasep SET NOT NULL ;
ALTER TABLE funcionario RENAME COLUMN pis_pasep TO pasep ;
ALTER TABLE funcionario DROP COLUMN pasep ;

-- DQL - SELECT simples
-- estrutura geral de um SELECT
SELECT coluna1, coluna2, ..., colunaN -- colunas que pretende exibir
FROM tabela1, tabela2, ..., tabelaM -- tabelas de onde vem as colunas
WHERE condicao1 AND condicao2 OR condicaoJ ;  -- criterios/filtros

-- operadores lógicos e de comparação
-- 1 - alguns dados de filme 
SELECT titulo_original, ano_lancamento, duracao_min
FROM filme
WHERE ano_lancamento > 1970 ;

-- 2 - filmes com duração menor ou igual a 100 minutos ou genero drama
SELECT titulo_original, duracao_min, genero
FROM filme
WHERE duracao_min <= 100 OR genero = 'drama' ; 

-- 3 - filmes que não sejam de romance e também ano_lancamento entre 1980 e 2000 e classifica_etaria não nula -- diferente <> ou != 
SELECT * 
FROM filme
WHERE genero != 'romance' 
AND ano_lancamento BETWEEN 1980 AND 2000 
AND classifica_etaria IS NOT NULL ;
-- formatação de caracteres we apelido ou alias
-- 4 - Maiusculo, minusculo e inicial maiusculo
SELECT INITCAP(nome_sala) AS Sala ,
LOWER(tipo_audio) AS Audio,
UPPER(tipo_video) AS Video
FROM sala
WHERE capacidade >= 90 ;
-- 5 - Operador de concatenação || - gruda uma string na outra eliminando os espaços em branco no final de cada string 
SELECT 'Hoje é dia de aula      ' ||' na      '||' Fatec Ipiranga' ;

SELECT UPPER(nome_func)||' nasceu em '
||TO_CHAR(dt_nascto_func, 'DD/MON/YY')||' e tem situação '||
LOWER(situ_func)
FROM funcionario ;

-- 6 - busca não exata - LIKE  - % coringa
SELECT *
FROM funcionario
WHERE UPPER(nome_func) LIKE '%JOS_ %' ;

SELECT *
FROM sessao
WHERE UPPER(idioma_sessao) LIKE '%PORTUGU_S%' ;

-- quando começa com uma palavra
SELECT titulo_original
FROM filme
WHERE UPPER(titulo_original) LIKE 'STAR%' ; 
-- quando termina com uma palavra
SELECT titulo_original
FROM filme
WHERE UPPER(titulo_original) LIKE '%BRA_IL' ;

SELECT titulo_original
FROM filme
WHERE LOWER(titulo_original) LIKE '%bra_il' ;
-- case insentive
SELECT titulo_original
FROM filme
WHERE titulo_original ILIKE '%rA_Il' ;
-- buscar filmes da serie Star Wars, alias para tabela
SELECT f.*
FROM filme f
WHERE f.titulo_original ILIKE '%STAR%'
AND f.titulo_original ILIKE '%WAR%' ;
-- buscar filmes em que tem a palavra guerra na sinopse
SELECT f.titulo_original AS Titulo, f.sinopse AS Resumo
FROM filme f
WHERE f.sinopse ILIKE '%guerra%' ;

-- Manipulação de datas
-- 7 - data e hora no Postgresql
SELECT now() AS Data_Hora ,
current_date AS Data_atual_SQL,
current_timestamp AS Data_Hora_atual_SQL ,
localtimestamp AS Data_Hora_local ;

-- 8 - Extraindo pedaços da data - EXTRACT
SELECT EXTRACT(YEAR FROM current_date) AS Ano_atual,
EXTRACT(HOUR FROM current_timestamp) AS Hora_atual,
EXTRACT(WEEK FROM current_date) AS Semana_Ano ;

-- 9 - Sessões do mês passado
UPDATE sessao SET dt_sessao = dt_sessao - INTERVAL '30' DAY ;
SELECT * FROM sessao ;
SELECT ss.*
FROM sessao ss
WHERE EXTRACT(MONTH FROM ss.dt_sessao) =
              EXTRACT(MONTH FROM current_date) -1 ;
-- 10 - Operador INTERVAL - adiciona ou subtrair intervalos de tempo
SELECT current_date + INTERVAL '1' MONTH ;
SELECT current_timestamp - INTERVAL '3' HOUR + 
                                                INTERVAL '15' MINUTE ;
-- 11 - Sessões dos ultimos 45 dias
SELECT ss.*
FROM sessao ss
WHERE ss.dt_sessao >= current_date - INTERVAL '45' DAY ;
-- 12 - Idade e tempo de casa dos funcionários
SELECT f.nome_func AS Funcionario,
f.dt_admissao AS Data_Admissão, 
ROUND((current_date - f.dt_admissao)/365.25, 2) AS Tempo_Casa,
f.dt_nascto_func AS Data_Nascimento,
TRUNC((current_date-f.dt_nascto_func)/365.25) AS Idade_Anos
FROM funcionario f ;
-- 13 - Funcionarios com tempo de casa entre 10 e 15 anos
SELECT f.nome_func AS Funcionario,
f.dt_admissao AS Data_Admissão, 
ROUND((current_date - f.dt_admissao)/365.25, 2) AS Tempo_Casa
FROM funcionario f
WHERE ROUND((current_date - f.dt_admissao)/365.25, 2) 
     BETWEEN 10 AND 15 ;
-- 14 Outra forma pouco precisa
SELECT f.*, ( EXTRACT(YEAR FROM current_date) - 
                     EXTRACT (YEAR FROM f.dt_nascto) ) AS Idade
FROM funcionario ;
-- 15 - ORDER BY - ordenação
SELECT ss.num_sessao, ss.dt_sessao, ss.nome_sala, ss.cod_hora
FROM sessao ss
ORDER BY ss.dt_sessao DESC; 

SELECT ss.num_sessao, ss.dt_sessao, ss.nome_sala, ss.cod_hora
FROM sessao ss
ORDER BY 4 DESC, 2 ASC ; 

SELECT ss.*
FROM sessao ss
ORDER BY 1 ;