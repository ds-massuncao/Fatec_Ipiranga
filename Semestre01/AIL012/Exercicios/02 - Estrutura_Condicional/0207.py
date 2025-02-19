


print('Digite o salario do funcionario')
salario = float(input('>>>_ '))

if salario <= 500:

    n_salario = salario *1.30
    print(F'Ó novo salario é de R${n_salario:.2f}')

else:

    print(f'Funcionario não trem direito ao aumento')
