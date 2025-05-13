# Exercicio 3
# Faça uma função que comprare a lista 1
# com a lista 2 se forem iguais retorna (True),
#  caso contrario, retorna (False)
# Autor: Marcos Assunção
# Data: 13/05/2025



from unorderedlist import UnorderedList
from random import randint


# Função que compara as duas listas
# se forem iguais retorna (True), caso contrario, retorna (False)

def comparaListas(lista1, lista2):
    atual1 = lista1.get_head()
    atual2 = lista2.get_head()

    while atual1 is not None and atual2 is not None:
        if atual1.get_data() != atual2.get_data():
            return False
        atual1 = atual1.get_next()
        atual2 = atual2.get_next()

    
    if atual1 is None and atual2 is None:
        return True
    else:
        return False



lista1 = UnorderedList()
lista2 = UnorderedList()

for i in range(3):
    lista1.add(randint(1,100))
    lista2.add(randint(1,100))

print("Listas iguais?", comparaListas(lista1, lista2))
print("Lista 1: ", lista1.imprimir())
print("Lista 2: ", lista2.imprimir())
