


print('Digite o salario do funcionario')
salario = float(input('>>>_ '))

if salario <=300:
    n_salario = salario * 1.35
    print(f'O salario de R${salario:.2f} foi reajustado para R${n_salario:.2f} ')

elif salario > 300:
    n_salario = salario * 1.15
    print(f'O salario de R${salario:.2f} foi reajustado para R${n_salario:.2f} ')
