# Exercicio 2:
# Faça uma função que concatene a lista 1 
# com a lista 2 e retorne a lista resultante.

from unorderedlist import UnorderedList
from random import randint

def concatenaLista(lista1, lista2):

    listaFinal = UnorderedList()
    headLista1 = lista1.get_head()
    headLista2 = lista2.get_head()
    
    while headLista1 is not None:
        listaFinal.append(headLista1.get_data())
        headLista1 = headLista1.get_next()

    while headLista2 is not None:
        listaFinal.append(headLista2.get_data())
        headLista2 = headLista2.get_next()


    return  listaFinal 

lista_1 = UnorderedList()
lista_2 = UnorderedList()

for i in range(3):
    lista_1.add(randint(1, 100))
    lista_2.add(randint(1,100))

print("Lista 1: ", lista_1.imprimir())
print("Lista_2: ", lista_2.imprimir() )
print("Lista Final: ", concatenaLista(lista_1, lista_2).imprimir())
