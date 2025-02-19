def produto(codigo, quantidade):

    if 1 <= codigo <= 10:
        unitario = 10
        subtotal = unitario * quantidade
        print(f'Preço Unitario R${unitario}')
        desconto(subtotal)
    elif 11 <= codigo <= 20:
        unitario = 15
        subtotal = unitario * quantidade
        print(f'Preço Unitario R${unitario}')
        desconto(subtotal)
    elif 21 <= codigo <= 30:
        unitario = 20
        subtotal = unitario * quantidade
        print(f'Preço Unitario R${unitario}')
        desconto(subtotal)
    elif 31 <= codigo <= 40:
        unitario =30
        subtotal = unitario * quantidade
        print(f'Preço Unitario R${unitario}')
        desconto(subtotal)
    else:
        return 'Codigo errado'

def desconto(subtotal):

    if subtotal <= 250:
        total = subtotal * 0.95
        print(f'Valor Total {subtotal}\nValor com desconto de 5%: R${total}')
    elif 250 < subtotal <= 500:
        total = subtotal * 0.90
        print(f'Valor Total {subtotal}\nValor com desconto de 10%: R${total}')
    elif subtotal > 500:
        total = subtotal * 0.85
        print(f'Valor Total {subtotal}\nValor com desconto de 15%: R${total}')


print('Digite o codigo do produto')
codigo = int(input('>_ '))

print('Digite a quantidade do produto a ser comprado')
quantidade = int(input('>_ '))

produto(codigo, quantidade)

