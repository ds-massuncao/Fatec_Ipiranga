


print('Digite um número 1:')
num1 = float(input('>>_ ')) 

print('Digite um número 2:')
num2 = float(input('>>_ '))  

print('Digite um número 3:')
num3 = float(input('>>_ '))  


if num1 > num2 and num1 > num3:
    print(f'O número {num1} é maior.')
elif num2 > num1 and num2 > num3:
    print(f'O número {num2} é maior.')
else:
    print(f'O número {num3} é maior.')