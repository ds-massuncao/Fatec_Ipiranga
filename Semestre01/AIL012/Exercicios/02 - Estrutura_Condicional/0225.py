# Este programa também calcula o valor de uma gratificação natalina com base em horas extras e faltas.
# Regras:
# 1. A fórmula para calcular H (em minutos) é:
#    H = número de horas extras - (2/3 * número de horas-falta)
#
# 2. O prêmio é determinado pela tabela:
#    | H (MINUTOS)      | PRÊMIO (R$) |
#    |------------------|-------------|
#    | > 2400           | 500         |
#    | 1800 - 2400      | 400         |
#    | 1200 - 1800      | 300         |
#    | 600 - 1200       | 200         |
#    | < 600            | 100         |

# Função para calcular o valor de H
def calcular_horas(horas_extras, horas_falta):
    return horas_extras - (2 / 3 * horas_falta)

# Função para determinar o prêmio com base no valor de H
def determinar_premio(h):
    if h > 2400:
        return 500
    elif 1800 <= h <= 2400:
        return 400
    elif 1200 <= h < 1800:
        return 300
    elif 600 <= h < 1200:
        return 200
    else:
        return 100

# Entrada de dados para cálculo do prêmio
horas_extras = float(input("\nDigite o número de horas extras: "))
horas_falta = float(input("Digite o número de horas-falta: "))

# Cálculo de H e do prêmio
h = calcular_horas(horas_extras, horas_falta)
premio = determinar_premio(h)

# Exibição dos resultados do segundo cálculo
print(f"\nResultados da Gratificação Natalina:")
print(f"Valor de H (em minutos): {h:.2f}")
print(f"Prêmio: R$ {premio:.2f}")