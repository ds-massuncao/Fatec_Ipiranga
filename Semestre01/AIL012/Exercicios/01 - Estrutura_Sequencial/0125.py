


print('Digite a hora')
hora = int(input('>_ '))

print('Digite os minutos ')
minutos = int(input('>_ '))


h_min = hora * 60
total_min = minutos + h_min
total_seg = total_min *60

print(f'Total de minutos {total_min}, total de segundos {total_seg}')