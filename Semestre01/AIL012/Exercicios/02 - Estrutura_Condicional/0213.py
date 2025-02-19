


print('Digite o preço do produto')
produto = float(input('R$'))

if produto <= 50:
    n_produto = produto * 1.05

elif 51 < produto <= 100:
    n_produto = produto * 1.1

elif produto > 100:
    n_produto = produto * 1.15

else:
     
    print(f'O Produto não pode ser negativo')


if n_produto <= 80:

    print(f'Produto Barato R${n_produto:.2f}')

elif 80 < n_produto <= 120:

    print(f'Produto Normal R${n_produto:.2f}')

elif 120 < n_produto <= 200:

    print(f'Produto Caro R${n_produto:.2f}')

else:

    print(f'Produto Muito Caro R${n_produto:.2f}')




    