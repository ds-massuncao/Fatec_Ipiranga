


print('Digite a nota 1')
nota1 = int(input('>_ '))

print('Digite a nota 2')
nota2 = float(input('>_ '))

media = (nota1 + nota2) / 2

if 0 < media <= 4:
    print(f'Aluno reprovado com media {media:.2f}')
elif 4 < media <=7:
    print(f'Aluno em exame com media {media:.2f}')
else:
    print(f'Aluno aprovado com media {media:.2f}')