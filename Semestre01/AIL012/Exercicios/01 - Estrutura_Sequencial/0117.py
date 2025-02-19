from math import pi, pow



print('Digite o valor do Raio')
raio =  float(input('>_ '))

esfera = 2 * pi * raio
a_esfera = pi * pow(raio,2)
v_esfera = 3/4 * pi * pow(raio,3)

print(f'O comprimento da esfera é de {esfera:.3f}')
print(f'A área da esfera é de {a_esfera:.3f}')
print(f'O volume da esfera é de {v_esfera:.3f}')