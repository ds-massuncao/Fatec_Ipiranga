def investimento(valor, tipo):

    if tipo != 1 and tipo != 2:
        return 'Tipo de investimento incorreto'
    
    if tipo == 1 :
        return valor * 1.03
    elif tipo == 2:
        return valor * 1.04
    

print('Digite o valor a ser investido')
valor = float(input('R$'))

print('Digite o tipo de investimento \n 1 - Poupança \n 2 - Renda Fixa')
tipo = int(input('>_ '))

total = investimento(valor, tipo)


if isinstance(total, str): 
    print(total)
else:
    if tipo == 1:
        print(f'O Valor depositado foi de R${valor}, \nValor corrigido na poupança R${total:.2f}')
    else:
        print(f'O Valor depositado foi de R${valor}, \nValor corrigido na renda fixa R${total:.2f}')