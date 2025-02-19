def categoria(idade):
    
    if 5 <= idade <= 7:
        return 'Infantil'
    elif 8 <= idade <= 10:
        return 'Juvenil'
    elif 11 <= idade <= 15:
        return 'Adolescente'
    elif 16 <= idade < 30:
        return 'Adulto'
    else:
        return 'Senior'
    

idade = int(input('Digite a idade do atleta: '))

print(categoria(idade))