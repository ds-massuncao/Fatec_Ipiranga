from math import sqrt, pow


print('Digite um número 1:')
num1 = float(input('>>_ ')) 

print('Digite um número 2:')
num2 = float(input('>>_ ')) 

print('''Digite a opção desejada 
      1 - O primeiro número elevado ao segundo número  
      2 - Raiz quadrada de cada um dos numeros.  
      3 - Raiz cubica de cada um dos numeros''')

opt = int(input('>>>_ '))

if opt == 1:

    pow1 = pow(num1,num2)

    print(f'{num1} elevado a {num2} = {pow1}')

elif opt == 2:

    raiz_num1 = sqrt(num1)
    raiz_num2 = sqrt(num2)

    print(f'Raiz quadrada de {num1} = {raiz_num1}')
    print(f'Raiz quadrada de {num2} = {raiz_num2}')

elif opt == 3:

    cubo_num1 = pow(num1,1/3)
    cubo_num2 = pow(num2,1/3)

    print(f'Raiz cubica de {num1} = {cubo_num1}')
    print(f'Raiz cubica de {num2} = {cubo_num2}')


else:

    print('Opção errada')