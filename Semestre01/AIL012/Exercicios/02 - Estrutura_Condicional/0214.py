def calcular_novo_salario(salario):
    if salario < 0:
        return 'Salário não pode ser negativo'
    
    if 0 < salario < 300:
        return salario * 1.5
    elif 300 < salario <= 500:
        return salario * 1.4
    elif 500 < salario <= 700:
        return salario * 1.3
    elif 700 < salario <= 800:
        return salario * 1.2
    elif 800 < salario <= 1000:
        return salario * 1.1
    else:
        return salario * 1.05


print('Digite o salário do funcionário:')
salario_inicial = float(input('R$'))


novo_salario = calcular_novo_salario(salario_inicial)


if isinstance(novo_salario, str): 
    print(novo_salario)
else:
    print(f'Novo salário é de R${novo_salario:.2f}')