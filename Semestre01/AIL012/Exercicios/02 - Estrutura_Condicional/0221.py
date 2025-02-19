def procedencia(origem):

    if origem == 1:
        return 'Sul'
    elif origem == 2:
        return 'Norte'
    elif origem == 3:
        return 'Leste'
    elif origem == 4:
        return 'Oeste'
    elif 5 <= origem <= 6:
        return 'Nordeste'
    elif 7 <= origem <= 9:
        return 'Sudeste'
    elif 10 <= origem <= 20:
        return 'Centro-Oeste'
    elif 21 <= origem <= 30:
        return 'Nordeste'
    elif origem > 30:
        return 'Origem Inválida'
    

print('Digite a origem do produto')
codigo = int(input('>_ '))

print(procedencia(codigo))