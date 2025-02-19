from math import sqrt, pow



print('Digite o cateto 1')
cat_1 = int(input('>_ '))

print('Digite o cateto 2 ')
cat_2 = int(input('>_ '))

hipotenusa = sqrt(pow(cat_1,2)+pow(cat_2,2))

print(f'A hipotenusa é = {hipotenusa}')