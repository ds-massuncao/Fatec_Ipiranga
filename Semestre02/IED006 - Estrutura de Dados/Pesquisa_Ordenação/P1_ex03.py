# Criar um programa em Pyhton que, dado um numero
# em decimal para uma função, converter para octal
# utilizando a estrutura de pilha e depois apresente


from stack import Stack

def converteOctal(n_decimal):
    p = Stack()

    while n_decimal > 0:
        resto = n_decimal % 8
        p.push(resto)
        n_decimal = n_decimal // 8

    octal = ""
    while not p.isEmpty():
        octal = octal + str(p.pop())

    return octal


print(converteOctal(10))
