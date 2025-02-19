


print('Digite o valor do carro')
carro = float(input('R$ '))

if 1 < carro <= 12000:

    custo_fabrica = carro + (carro * 0.05)

    print(f'O custo do carro para o cliente é de R${custo_fabrica:.2f}')

elif 12000.01 < carro <= 25000:

    custo_fabrica = carro + (carro * 0.15)

    print(f'O custo do carro para o cliente é de R${custo_fabrica:.2f}')

elif carro > 25000.01:

    custo_fabrica = carro + (carro * 0.20)

    print(f'O custo do carro para o cliente é de R${custo_fabrica:.2f}')


else:
     
     print('O carro foi doado')