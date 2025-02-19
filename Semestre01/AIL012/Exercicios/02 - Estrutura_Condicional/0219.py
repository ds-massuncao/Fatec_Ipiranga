def peso_ideal(altura, sexo):

    if sexo == 1:
        peso = (72.7 * altura) - 58
        return f'O peso ideal do Homem é de {peso:.2f}'
    else:
        peso = (62.1 * altura) - 44.7
        return f'O peso ideal da Mulher é de {peso:.2f}'
    

print('Digite a altura')
high = float(input('altura: '))

print('Escolha o sexo \n1-Masculino\n2-Feminino')
sexo = int(input('sexo: '))

print(peso_ideal(high, sexo))

