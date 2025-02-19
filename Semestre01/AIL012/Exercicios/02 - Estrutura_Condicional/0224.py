# Este programa calcula o aumento, o imposto, o novo preço e a classificação de um produto com base nas regras especificadas.
# Regras:
# 1. O aumento é calculado com base no preço e na categoria do produto:
#    | PREÇO     | CATEGORIA | PERCENTUAL DE AUMENTO |
#    |-----------|-----------|-----------------------|
#    | ≤ 25      | 1         | 5%                   |
#    | ≤ 25      | 2         | 8%                   |
#    | ≤ 25      | 3         | 10%                  |
#    | > 25      | 1         | 12%                  |
#    | > 25      | 2         | 15%                  |
#    | > 25      | 3         | 18%                  |
#
# 2. O imposto é calculado com base nos seguintes critérios:
#    - Produtos que atendem pelo menos um dos requisitos (Categoria 2 ou Situação "R") pagam 5% do preço.
#    - Caso contrário, o imposto é de 8% do preço.
#
# 3. A classificação do novo preço é feita assim:
#    | NOVO PREÇO         | CLASSIFICAÇÃO |
#    |--------------------|---------------|
#    | ≤ R$ 50,00        | Barato        |
#    | Entre R$ 50,00 e R$ 120,00 | Normal        |
#    | > R$ 120,00       | Caro          |


# Função para calcular o percentual de aumento
def calcular_aumento(preco, categoria):
    if preco <= 25:
        if categoria == 1:
            return preco * 0.05
        elif categoria == 2:
            return preco * 0.08
        elif categoria == 3:
            return preco * 0.1
    else:
        if categoria == 1:
            return preco * 0.12
        elif categoria == 2:
            return preco * 0.15
        elif categoria == 3:
            return preco * 0.18

# Função para calcular o imposto
def calcular_imposto(preco, categoria, situacao):
    if categoria == 2 or situacao == 'R':
        return preco * 0.05
    else:
        return preco * 0.08

# Função para classificar o novo preço
def classificar_preco(novo_preco):
    if novo_preco <= 50:
        return "Barato"
    elif 50 < novo_preco <= 120:
        return "Normal"
    else:
        return "Caro"

# Entrada de dados
preco = float(input("Digite o preço do produto: "))
categoria = int(input("Digite a categoria do produto (1 - limpeza, 2 - alimentação, 3 - vestuário): "))
situacao = input("Digite a situação do produto (R - refrigerado, N - não refrigerado): ").upper()

# Cálculos
aumento = calcular_aumento(preco, categoria)
imposto = calcular_imposto(preco, categoria, situacao)
novo_preco = preco + aumento - imposto
classificacao = classificar_preco(novo_preco)

# Exibição dos resultados
print(f"\nResultados:")
print(f"Aumento aplicado: R$ {aumento:.2f}")
print(f"Imposto aplicado: R$ {imposto:.2f}")
print(f"Novo preço: R$ {novo_preco:.2f}")
print(f"Classificação do produto: {classificacao}")
