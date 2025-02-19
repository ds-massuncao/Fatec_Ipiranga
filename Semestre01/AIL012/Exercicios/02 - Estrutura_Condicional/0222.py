def risco(idade, peso):

    if idade <= 20:
        if peso < 60:
            return 'Risco 9'
        elif 60 < peso <= 90:
            return 'Risco 8'
        elif peso > 90:
            return 'Risco 7'
    
    elif 20 < idade <= 50:
        if peso < 60:
            return 'Risco 6'
        elif 60 < peso <= 90:
            return 'Risco 5'
        elif peso > 90:
            return 'Risco 4'
    
    elif idade > 50:
        if peso < 60:
            return 'Risco 3'
        elif 60 < peso <= 90:
            return 'Risco 2'
        elif peso > 90:
            return 'Risco 1'
        
print('Digite a idade ')
idade = int(input('>_ '))

print('Digite o peso')
peso = float(input('>_ '))

print(risco(idade, peso))