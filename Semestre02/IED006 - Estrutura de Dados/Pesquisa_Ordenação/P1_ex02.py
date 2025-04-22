# Um lojista possui um sistema de inventário em que ele armazena os nomes dos produtos disponíveis. Ele deseja saber se um determinado produto está disponível no estoque, mas a lista de produtos não está ordenada.
 
# Lista de produtos em estoque: ["arroz", "feijão", "macarrão", "açúcar", "óleo", "sal", "farinha"]
 
# Implemente um programa em Python que utilize o algoritmo de pesquisa sequencial (ou busca linear) para verificar se um produto está disponível no estoque. O programa deve retornar uma mensagem informando se o produto foi encontrado ou não.

def pesquisaEstoque(estoque, item):
    pos = 0
    achou = False
    while pos < len(estoque) and not achou:
        if estoque[pos] == item:
            achou = True
        else:
             pos = pos + 1

    return achou

estoque = ["arroz", "feijão", "macarrão", "açúcar", "óleo", "sal", "farinha"]
print(pesquisaEstoque(estoque,'arroz'))
