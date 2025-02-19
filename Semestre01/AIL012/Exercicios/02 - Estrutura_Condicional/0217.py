


def acesso(senha):
    
    if senha == 4531:
        return 'Acesso permitido!!'
    else:
        return 'Acesso negado!!'


senha = int(input('Digite a senha: '))

login = acesso(senha)

if isinstance(login, str):
    print(login)
