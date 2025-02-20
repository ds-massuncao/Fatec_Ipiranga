from faker import Faker
import random

# Crie uma instância do Faker
fake = Faker('pt_BR')
for i in range(10):
    nome = fake.name()
    endereco = fake.address()
    telefone = fake.phone_number()
    data_de_nascimento = fake.date_of_birth(minimum_age=5, maximum_age=65)
    cpf = fake.cpf()
    email = fake.email()

    # Imprima os dados fictícios
    print("Nome: ", nome)
    print("Endereço: ", endereco)
    print("Telefone: ", telefone)
    print("Data de Nascimento: ", data_de_nascimento)
    print(f'CPF: {cpf}')
    print(f'Email: {email}')

 


def user_insert(n):
    
    fake = Faker('pt_BR')
    usuarios = {}
    
    for i in range(n):
        
        usuarios['nome'] = fake.name()
        usuarios['endereço'] = fake.address()
          
    return usuarios

print(user_insert(2))
    


