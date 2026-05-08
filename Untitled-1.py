print('bem vindo ao seu assistente virtual, e professsor de economia, economIA!')

while True:
        salario = float(input('primeiro eu preciso saber o quanto voce recebe de salario, insira aqui:'))
        print("okay!!!")
        alimentacao = float(input("Gasto com alimentação: "))
        transporte = float(input("Gasto com transporte: "))
        lazer = float(input("Gasto com lazer: "))
        economia = float(input('quanto voce economiza por mês: '))
        reserva = float(input('quanto voce guarda para possiveis emergencias: '))
        gasto = alimentacao + transporte + lazer
        porcentagem_comida = int(alimentacao / salario) * 100        
        porcentagem_transporte = int(transporte / salario) * 100
        porcentagem_lazer = int(lazer / salario) * 100
        porcentagem_economia = (economia / salario) * 100
        porcentagem_reserva = (reserva / salario) * 100
        alimentacao_transporte_lazer = (porcentagem_comida + porcentagem_transporte + porcentagem_lazer) 
        divisao_ideal = (porcentagem_comida + porcentagem_transporte + porcentagem_lazer) < 80% salario
        import time 
        for i in range (3):
            print("calculando...")
            time.sleep(1)
        if gasto > salario * 0.6:
            print(f'voce esta gastando {porcentagem_comida}% do seu salario em comida')
            print(f'voce esta gastando {porcentagem_transporte}% do seu salario em transporte')
            print(f'voce esta gastando {porcentagem_lazer}% do seu salario em lazer')
            if porcentagem_comida + porcentagem_transporte + porcentagem_lazer != divisao_ideal:
                print("cuidado!, voce nao esta dividindo corretamente seu dinheiro, e esta gastando mais de 60% em suas despesas")
                decisao = input("voce deseja saber a decisao ideal para voce?, s/n")
            if decisao == 's':
                print("\nSugestão de divisão ideal:")
                print("60% alimentação, transporte e lazer")
                print("20% reserva de emergencia")
                print("20% economia")
                print(f"comparando com a sua divisao:\n{alimentacao_transporte_lazer}% de alimentação, transporte e lazer\n{porcentagem_reserva}% de reserva de emergencia\n{porcentagem_economia} economiza por mes")

            elif decisao == 'n':
                print('ok:(')
            elif (porcentagem_comida + porcentagem_transporte + porcentagem_lazer) <= divisao_ideal:
                print('parabens a sua divisao salarial esta perfeita!, ')
        elif gasto < salario * 0.6:
            print(f'voce esta gastando {porcentagem_comida}% do seu salario em comida')
            print(f'voce esta gastando {porcentagem_transporte}% do seu salario em transporte')
            print(f'voce esta gastando {porcentagem_lazer}% do seu salario em lazer')
            print('parabens voce esta gastando o suficiente em suas despesas')
            break
        ajuda = str(input('voce tambem/ao menos deseja ser ajudado por nossa IA para economizar??, s/n'))
        if ajuda == 's':
            print('1 como gastar menos')
            print("2 como controlar minhas despesas desnecessarias")
            print('3 como economizar dinheiro')
            print('4 como melhorar sua vida financeira')
        elif ajuda == 'n':
            print("okay, encerrando o atendimento")
            break
        opcao = int(input('okay, entao eu a economIA irei te ajudar!!!\nqual opcao te ajudaria?'))
        if opcao == 1:
            print("\nDicas para gastar menos:")
            print("- Evite compras por impulso")
            print("- Faça uma lista antes de comprar")
            print("- Compare preços")
            gostou = input('voce gostou do atendimento? s/n')  

        elif opcao == 2:
            print("\nDicas para controlar despesas:")
            print("- Anote tudo que você gasta")
            print("- Corte gastos que não são essenciais")
            print("- Defina um limite mensal")
            gostou = input('voce gostou do atendimento? s/n')
        elif opcao == 3:
            print("\nDicas para economizar dinheiro:")
            print("- Guarde pelo menos 10%, do que ganha")
            print("- Evite gastos desnecessários")
            print("- Estabeleça metas de economia")
            gostou = input('voce gostou do atendimento? s/n')
        elif opcao == 4:
            print("\nDicas para melhorar sua vida financeira:")
            print("- Separe gastos fixos e variáveis")
            print("- Planeje seu orçamento mensal")
            print("- Evite dívidas desnecessárias")
            gostou = input('voce gostou do atendimento? s/n')
        
        if gostou == 's':
            print('obrigado pelo feedback!')
            break
        elif gostou == 'n':
            print('o que podemos melhorar?')
            print('1 melhorar as dicas\n2 ir direto ao ponto nas respostas\n3 melhorar a interface\n4 melhorar a IA em geral')
            melhorar = int(input('qual opcao representa melhor sua indignacao com nosso atendimento?\n'))
            print("obrigado pelo feedback, procuraremos melhorar nesse quesito!\nencerrando nosso atendimento.")
            break
        else:
            print("Opção inválida.")
            break