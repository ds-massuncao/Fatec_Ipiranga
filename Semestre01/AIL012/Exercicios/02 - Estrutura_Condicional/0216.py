def desconto(valor):
    
    if valor < 0:
        return 'O valor não pode ser negativo'
    
    elif 0 < valor <= 30:
        return 'Sem desconto'
    
    elif 30 < valor <= 100:
        return valor * 0.9
    
    else:
        return valor * 0.85
    

print ('Digite o valor do produto')
valor = float(input('R$ '))

v_desc = desconto(valor)

if isinstance(v_desc, str):
    
    print(v_desc)

else:
    
    print(f'Valor integral R${valor}\nValor com desconto R${v_desc:.2f}')