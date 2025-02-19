


print('Digite um número 1:')
num1 = float(input('>>_ ')) 

print('Digite um número 2:')
num2 = float(input('>>_ ')) 

print('''Digite a opção desejada 
      1 - Média dos numeros  
      2 - diferenca erença do maior pelo menor  
      3 - Produto dos numeros  
      4 - Divisão do primeiro pelo segundo''')

opt = int(input('>>>_ '))

if opt == 1:
    
    media = (num1 + num2)/2

    print(f'A media é de {media:.2f}')

elif opt == 2:

    if num1 > num2:
        diferenca  = num1 - num2
        print(f'A diferenca  entre {num1} e {num2} = {diferenca }')
    else:
        diferenca = num2 - num1
        print(f'A diferenca  entre {num2} e {num1} = {diferenca }')

elif opt == 3:

    produto = num1 * num2
    
    print(f'O produto é de {produto}')
 
elif opt == 4:
    if num2 > 0:
        div = num1 / num2

        print(f'A divisão é {div:.2f}')
    else:

        print(f'O numero 2 não pode ser zero')

else:

    print('Opção errada')
