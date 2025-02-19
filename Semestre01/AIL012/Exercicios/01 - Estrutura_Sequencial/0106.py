


print('Digite o salario do funcionário ')
salario = float(input('>_ '))

print('Digite a valor das vendas do funcionário ')
vendas = float(input('>_ '))

comissao = vendas * 0.04
salario_final = salario + comissao

print(f'Salario R${salario:.2f} + comissão R${comissao:.2f} = Salario final de R${salario_final:.2f}')