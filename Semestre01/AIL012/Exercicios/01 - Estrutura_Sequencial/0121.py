


print('Digite o valor do salario minimo ')
sal_min = float(input('>_ '))

print('Digite o numero de horas trabalhadas ')
h_trabalho = float(input('>_ '))

print('Digite o numero de horas extras trabalhadas ')
h_extra = float(input('>_ '))


v_horaTrab = sal_min * 0.125
v_horaExtra = sal_min * 0.25

sal_bruto = h_trabalho * v_horaTrab
horas_extras = h_extra * v_horaExtra

total = sal_bruto + horas_extras

print(total)


