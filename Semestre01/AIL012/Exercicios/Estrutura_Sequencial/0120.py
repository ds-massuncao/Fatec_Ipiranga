from math import radians, cos

print("Digite o ângulo formado pela escada com o chão (em graus): ")
angulo_graus = float(input('>_ '))

print("Digite a distância da escada até a parede (em metros): ")
distancia = float(input('>_ '))


angulo_radianos = radians(angulo_graus)


comprimento_escada = distancia / cos(angulo_radianos)


print(f"O comprimento necessário da escada é: {comprimento_escada:.2f} metros")


