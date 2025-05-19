// Aula 19/maio - BD Filmes e Atores
// operações CRUD, relacionamentos, consultas com regex
// limpando o banco de dados inteiro
MATCH(n)
DETACH DELETE n 

// nó para filmes
CREATE (f1:Filme {título: "Star Wars", ano_lançamento: 1977, gênero: "Ficção Científica",
estúdio: "Lucas Filmes", país: "EUA" })
RETURN f1

// dois ou mais nós
CREATE (f2:Filme {título: "Indiana Jones - Os caçadores da arca perdida", ano_lançamento: 1981, gênero: ["Aventura", "Ação"], estúdio: "Paramount", país: "EUA", duração: 116 }) ,
(f3:Filme {título: "Central do Brasil", ano_lançamento: 1998, gênero: "Drama",
país: "Brasil" , duração: 113})
RETURN f2, f3

// mostrar só os nós de filme
MATCH (f:Filme)
RETURN f

// dois atores
CREATE (a2:Ator {nome: "Carrie Fischer", país: "EUA", sexo: "Feminino"}),
(a3:Ator {nome: "Fernanda Montenegro", país: "Brasil", sexo: "Feminino"})
RETURN *

// excluindo um nó especifico
MATCH (a1:Ator)
WHERE ID(a1) = 7
DELETE a1

// Criando Relacionamentos
// primeiro encontrar os nós que vão se relacionar, depois cria a aresta do relacionamento
MATCH (a20:Ator) , (f21:Filme), (f22:Filme)
WHERE a20.nome = "Harrison Ford" AND
f21.título =~ '(?i).*indiana.*'
AND f22.título =~ '(?i).*wars.*'
CREATE (f21)-[e1:Elenco {personagem: "Indiana Jones", tipo_participação: "Ator"}]->(a20),
(f22)-[e2:Elenco {personagem: "Hans Solo", tipo_participação: "Ator"}]->(a20)
RETURN a20, f21, f22, e2, e1
// RETURN * 


// central brasil <-> fernanda montenegro, indiana <-> karen allen
MATCH (atriz1:Ator), (atriz2:Ator), (f1:Filme), (f2:Filme)
WHERE toUpper(atriz1.nome) =~ '.*MONTENEGRO.*'
AND toLower(atriz2.nome) =~ '.*allen.*'
AND f1.título =~ '(?i).*brasil.*' 
AND f2.título =~ '(?i).*indiana.*'
CREATE (f1)-[e1:Elenco {personagem: 'Dora', tipo_participação: "Atriz"}]->(atriz1),
(f2)-[e2:Elenco {personagem: 'Marion Ravenwood', tipo_participação: "Atriz"}]->(atriz2)
RETURN *

// mostrar o elenco do filme Indiana Jones
MATCH (z10)-[e10:Elenco]->(y10)
WHERE z10.título =~ '(?i).*indiana.*'
RETURN *
