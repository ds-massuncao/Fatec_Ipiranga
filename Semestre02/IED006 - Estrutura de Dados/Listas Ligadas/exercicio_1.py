# Exercicio - 01:
# Faça uma função que copia os dados
# de uma lista L1 para uma lista L2
# não se esqueça que lista L1 deverá continuar
# como estava antes da cópia

from unorderedlist import UnorderedList

def copiar_lista(L1):
    L2 = UnorderedList()
    atual = L1.get_head()
    
    while atual is not None:
        L2.append(atual.get_data())
        atual = atual.get_next()
    return L2

L1 = UnorderedList()
L1.add(190)
L1.add(5)
L1.add(18)

# Copiando para L2
L2 = copiar_lista(L1)



# Verificando as listas
print("L1:", L1.imprimir())  # Deve mostrar: 5 10 15
print("L2:", L2.imprimir())
