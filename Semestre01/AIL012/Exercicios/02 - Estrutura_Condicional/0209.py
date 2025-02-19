


print('Digite o saldo médio do ano')
saldo_medio = float(input('R$_'))

if saldo_medio <=200:

    credito = saldo_medio *1.10
    print(f'Com saldo médio de R${saldo_medio:.2f}, seu credito é de R${credito:.2f}')

elif 200.01 < saldo_medio <= 300:

    credito = saldo_medio *1.20
    print(f'Com saldo médio de R${saldo_medio:.2f}, seu credito é de R${credito:.2f}')

elif 300.01 < saldo_medio <= 400:

    credito = saldo_medio *1.25
    print(f'Com saldo médio de R${saldo_medio:.2f}, seu credito é de R${credito:.2f}')

elif saldo_medio > 400.01:

    credito = saldo_medio *1.30
    print(f'Com saldo médio de R${saldo_medio:.2f}, seu credito é de R${credito:.2f}')

else:

    print(f'O seu saldo é negativo. Você tem credito')