

turnos = ['M','V','N']
categorias = ['O','G']
salarioMin = 1500
valor = 0 
aux = 0 
salarioIn = 0
salarioTotal = 0

def validarTurno(turno):
    while True:
        
        turno = turno
        if turno in turnos:
            print(f"Turno {turno} é valido")
            break      
        else:
            print(f"Turno {turno} é invalido. Tente Novamente")
            break

def validarCategoria(categoria):            
    while True:
        
        if categoria in categorias:
            print(f" Categoria {categoria} válida!")
            break
        else:
            print(f"Categoria {categoria} inválida. Tente novamente. ")
            break

def imprimir_holerite(funcionario, horasTrabalhadas, valor, salarioIn, aux, salarioTotal):
        
    print(f"{'Descrição':<20} | {'Valor':>10}")
    print("-" * 32)  
    print(f"{funcionario.upper()}")
    
    print(f"{'Horas Trabalhadas':<20} | {horasTrabalhadas} horas")
    print(f"{'Valor da Hora':<20} | R$ {valor:>8.2f}")
    print(f"{'Salário Inicial':<20} | R$ {salarioIn:>8.2f}")
    print(f"{'Auxílios':<20} | R$ {aux:>8.2f}")
    print(f"{'Salário Total':<20} | R$ {salarioTotal:>8.2f}")



funcionario = input("Digite o Nome do Funcionario: >_  ")
horasTrabalhadas = int(input("digite as Horas Trabalhadas no Mês: >_ "))
    
turno = input("Digite um turno (M, V, N): ").upper()
validarTurno(turno) 
    
categoria = input("digite uma categoria (O - operario, G - gerente): ").upper()
validarCategoria(categoria)

if categoria in ('G'):
    if turno in ('N'):
        valor = salarioMin * 0.018
    else:
        valor = salarioMin * 0.013
else:
    if turno in ('M','V'):
        valor = salarioMin * 0.013
    else:
        valor = salarioMin * 0.01

salarioIn = horasTrabalhadas * valor

if salarioMin <= 1207.2:
        aux = salarioIn * 0.2
elif salarioIn < 1509:
        aux = salarioIn * 0.15
else:
        aux = salarioIn * 0.05
        
salarioTotal = salarioIn + aux

imprimir_holerite(funcionario, horasTrabalhadas, valor, salarioIn, aux, salarioTotal)
    
    
        