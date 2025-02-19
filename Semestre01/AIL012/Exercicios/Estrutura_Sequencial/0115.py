


print('Digite o salario do João')
salario = float(input('>_ '))

print('Digite o valor da primeira conta')
conta_1 = float(input('>_ '))

print('Digite o valor da segunda conta ')
conta_2 = float(input('>_ '))

liquido = salario - (conta_1 *1.02 + conta_2 * 1.02)

print(f'O valor que João ficará após pagamento é de : R${liquido:.2f}')