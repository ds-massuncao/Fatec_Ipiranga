


print('Digite o salario do funcionario')
sal_func = float(input('R$'))

if 0 < sal_func <=300:
    new_sal = sal_func * 1.15
    print(f'Novo Salario é de R${new_sal:.2f}')
elif 300 < sal_func <= 600:
    new_sal = sal_func * 1.10
    print(f'Novo Salario é de R${new_sal:.2f}')
elif 600 < sal_func <= 900:
    new_sal = sal_func * 1.05
    print(f'Novo Salario é de R${new_sal:.2f}')
elif sal_func > 900:
    new_sal = sal_func
    print(f'Novo Salario é de R${new_sal:.2f}')
else:
    print(f'O Salario não pode ser negativo')