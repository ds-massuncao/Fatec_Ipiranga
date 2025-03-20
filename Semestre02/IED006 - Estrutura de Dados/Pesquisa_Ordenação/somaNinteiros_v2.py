# analise algoritmica 

import time

def somaN_v2(n):
  inicio = time.time()
  somatorio = 0

  for i in range(1,n+1):
    somatorio +=1
  fim = time.time()

return somatorio, fim-inicio

for i in range(5):
  print("soma %d requereu %10.7f segundos" %somaN_v2(10))
