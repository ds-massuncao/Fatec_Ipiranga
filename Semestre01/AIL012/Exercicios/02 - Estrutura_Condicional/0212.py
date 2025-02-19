


print('Digite o salario do funcionario')
sal_func = float(input('R$'))

imposto = 0.93

if 0 < sal_func <= 350:

    new_sal = (sal_func * imposto) + 100
    print(f'Novo salario é de R${new_sal:.2f}')

elif 350 < sal_func <= 600:

    new_sal = (sal_func * imposto) + 75
    print(f'Novo salario é de R${new_sal:.2f}')

elif 600 < sal_func <= 900:

    new_sal = (sal_func * imposto) + 50
    print(f'Novo salario é de R${new_sal:.2f}')

elif sal_func > 900:

    new_sal = (sal_func * imposto) + 35
    print(f'Novo salario é de R${new_sal:.2f}')

else:

    print(f'O Salario não pode ser negativo')