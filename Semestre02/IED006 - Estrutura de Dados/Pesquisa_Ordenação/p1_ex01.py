def buscaBinaria(contatos, telefone):
    primeiro = 0
    ultimo = len(contatos) - 1
    achou = False

    while primeiro <= ultimo and not achou:
        meio = (primeiro + ultimo) // 2
        if contatos[meio] == telefone:
            achou = True
        else:
            if telefone < contatos[meio]:
                ultimo = meio - 1
            else:
                primeiro = meio + 1

    return achou


contatos = [1234567890, 1234567891, 1234567892, 1234567893, 1234567894, 1234567895, 1234567896, 1234567897]
print(buscaBinaria(contatos, 1234567878))
