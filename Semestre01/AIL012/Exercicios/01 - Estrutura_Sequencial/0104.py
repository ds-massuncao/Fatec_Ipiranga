


print('Digite a primeira nota')
primeiro = int(input('>_ '))

print('Digite o peso 1')
peso1 = int(input('>_ '))

print('Digite a segunda nota')
segundo = int(input('>_ '))

print('Digite o peso 2')
peso2 = int(input('>_ '))

ponderada = ((primeiro*peso1)+(segundo*peso2))/(peso1+peso2)

print(f'A media ponderada das notas {primeiro} e {segundo} = {round(ponderada, 2)}')