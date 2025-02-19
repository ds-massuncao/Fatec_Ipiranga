


print('Digite seu ano de nascimento')
ano_nascto = int(input('>_ '))

print('Digite o ano atual ')
ano_atual = int(input('>_ '))

idade_anos = ano_atual - ano_nascto
idade_meses = idade_anos * 12
idade_semanas = idade_anos * 52
idade_dias = idade_anos * 365

print(f'Idade em anos = {idade_anos}')
print(f'Idade em meses = {idade_meses}')
print(f'Idade em semanas = {idade_semanas}')
print(f'Idade em dias = {idade_dias}')