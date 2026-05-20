historico = []
saldo = 0
while True:
    valor = int(input('insiar um valor'))

    saldo += valor

    resgidyro = 'voce depositou' +  str(saldo)

    historico.append(resgidyro)

    resgidyro2 = 'voce depositou' +  str(saldo)

    historico.append(resgidyro2)

    break
print(historico)
for transaces in historico:
    print('->' + transaces)