
print('bem vindo ao seu assistente virtual, e professsor de economia, economIA!')
nome = input("qual o seu nome?:")
print('1 - analise geral financeira\n2 - meta finaceira')
op = int(input('o que voce quer fazer?'))
if op == 2:
    meta = float(input("Qual valor você deseja juntar? R$ "))
    guardar = float(input("Quanto consegue guardar por mês? R$ "))

    meses = meta / guardar

    print(f"Você levaimadamente {meses:.0f} meses para atingir sua meta.")
    if meta < guardar:
        print("voce ja atingiu sua meta") 
if op == 1:
    while True:
            salario = float(input('primeiro eu preciso saber o quanto voce recebe de salario, insira aqui:'))
            print("okay!!!")
            alimentacao = float(input("Gasto com alimentação: "))
            transporte = float(input("Gasto com transporte: "))
            lazer = float(input("Gasto com lazer: "))
            economia = float(input('quanto voce economiza por mês: '))
            reserva = float(input('quanto voce guarda para possiveis emergencias: '))
            gasto = alimentacao + transporte + lazer + economia + reserva
            porcentagem_comida = int((alimentacao / salario) * 100)            
            porcentagem_transporte = int((transporte / salario) * 100)
            porcentagem_lazer = int((lazer / salario) * 100)
            porcentagem_economia = int((economia / salario) * 100)
            porcentagem_reserva = int((reserva / salario) * 100)
            alimentacao_transporte_lazer = (porcentagem_comida + porcentagem_transporte + porcentagem_lazer) 
            divisao_ideal = (porcentagem_comida + porcentagem_transporte + porcentagem_lazer) < 80% salario
            print("=" * 60)
            import time 
            for i in range (3):
                print("calculando...")
                time.sleep(1)
            if gasto > salario * 0.6:
                print(f'voce esta gastando {porcentagem_comida}% do seu salario em comida por mes')
                print(f'voce esta gastando {porcentagem_transporte}% do seu salario em transporte por mes')
                print(f'voce esta gastando {porcentagem_lazer}% do seu salario em lazer por mes')
                print(f'voce esta economizando {porcentagem_economia}% do seu salario por mes')
                print(f'voce esta guardando {porcentagem_reserva}% do seu salario por mes')
                print("=" * 60)
                print("cuidado!, voce nao esta dividindo corretamente seu dinheiro, e esta gastando mais de 60% em suas despesas")
                decisao = input("voce deseja saber a decisao ideal para voce?, s/n")
                if decisao == 's':
                    print("\nSugestão de divisão ideal:")
                    print("60% alimentação, transporte e lazer")
                    print("20% reserva de emergencia")
                    print("20% economia")
                    print(f"comparando com a sua divisao:\n{alimentacao_transporte_lazer}% de alimentação, transporte e lazer\n{porcentagem_reserva}% de reserva de emergencia\n{porcentagem_economia} economiza por mes")
                    print("=" * 60)
                elif decisao == 'n':
                    print('ok:(')
                elif (porcentagem_comida + porcentagem_transporte + porcentagem_lazer) <= divisao_ideal:
                    print('parabens a sua divisao salarial esta perfeita! ')
                    print("=" * 60)
            elif gasto < salario * 0.6:
                print(f'voce esta gastando {porcentagem_comida}% do seu salario em comida')
                print(f'voce esta gastando {porcentagem_transporte}% do seu salario em transporte')
                print(f'voce esta gastando {porcentagem_lazer}% do seu salario em lazer')
                print(f'voce esta economizando {porcentagem_economia}% do seu salario por mes')
                print(f'voce esta guardando {porcentagem_reserva}% do seu salario por mes')
                print('parabens voce esta gastando o suficiente em suas despesas')
                print("=" * 60)                
                break
            ajuda = str(input('voce tambem/ao menos deseja ser ajudado por nossa IA para economizar??, s/n'))
            if ajuda == 's':
                print('1 como gastar menos')
                print("2 como controlar minhas despesas desnecessarias")
                print('3 como economizar dinheiro')
                print('4 como melhorar sua vida financeira')
                print("=" * 60)
            elif ajuda == 'n':
                print("okay, encerrando o atendimento")
                print("=" * 60)
                break
            opcao = int(input('okay, entao eu a economIA irei te ajudar!!!\nqual opcao te ajudaria?'))
            if opcao == 1:
                print("\nDicas para gastar menos:")
                print("- Evite compras por impulso")
                print("- Faça uma lista antes de comprar")
                print("- Compare preços")
                print("=" * 60)
                gostou = input('voce gostou do atendimento? s/n')  

            elif opcao == 2:
                print("\nDicas para controlar despesas:")
                print("- Anote tudo que você gasta")
                print("- Corte gastos que não são essenciais")
                print("- Defina um limite mensal")
                print("=" * 60)
                gostou = input('voce gostou do atendimento? s/n')
            elif opcao == 3:
                print("\nDicas para economizar dinheiro:")
                print("- Guarde pelo menos 10%, do que ganha")
                print("- Evite gastos desnecessários")
                print("- Estabeleça metas de economia")
                print("=" * 60)
                gostou = input('voce gostou do atendimento? s/n')
            elif opcao == 4:
                print("\nDicas para melhorar sua vida financeira:")
                print("- Separe gastos fixos e variáveis")
                print("- Planeje seu orçamento mensal")
                print("- Evite dívidas desnecessárias")
                print("=" * 60)
                gostou = input('voce gostou do atendimento? s/n')
            
            if gostou == 's':
                print('obrigado pelo feedback!')
                break
            elif gostou == 'n':
                print('o que podemos melhorar?')
                print('1 melhorar as dicas\n2 ir direto ao ponto nas respostas\n3 melhorar a interface\n4 melhorar a IA em geral')
                print("=" * 60)
                melhorar = int(input('qual opcao representa melhor sua indignacao com nosso atendimento?\n'))
                print("obrigado pelo feedback, procuraremos melhorar nesse quesito!\nencerrando nosso atendimento.")
                break
            else:
                print("Opção inválida.")
                break