"""

Faça um programa que receba 4 notas de um aluno, calcule e mostre a média aritmética
das notas e a mensagem de aprovado ou reprovad, considerando para aprovação
média 7

"""

print('Digite a nota 1')
nota1 = float(input('>_ '))

print('Digite a nota 2')
nota2 = float(input('>_ '))

print('Digite a nota 3')
nota3 = float(input('>_ '))

print('Digite a nota 4')
nota4 = float(input('>_ '))

media = (nota1 + nota2 + nota3 + nota4)/4

if media > 7:
    print(f'Aluno aprovado com media {media:.2f}')
else:
    print(f'Aluno reprovado com media {media:.2f}')