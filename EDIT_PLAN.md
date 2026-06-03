# Plano de edição — corrigir erro no cálculo (frontend/app.js)

## Informações coletadas
- Repositório pequeno; lógica principal está em `frontend/app.js` e UI em `frontend/index.html`.
- O JavaScript atualmente faz `getElementById` e imediatamente chama métodos como `addEventListener` / `classList` em elementos que podem ser `null` caso algum id não exista.
- Sem acesso ao erro do console do navegador, a correção mais robusta é tornar o bootstrap do script tolerante a ids inexistentes e/ou alertar qual id está faltando.

## Plano
1. Atualizar `frontend/app.js` para:
   - Criar helper `getEl(id)` que lança erro claro quando o elemento não existir.
   - Criar helper `tryBind(id, fn)` (ou equivalente) para não quebrar a página inteira; mostrar mensagem no `#result` e setar status “danger” quando faltar algum elemento.
   - Trocar todas as capturas diretas e usos imediatos (`const btnAnalise = $("btnAnalise")`, etc.) por obtenção validada.
2. Manter a lógica de cálculo (`calcularAnalise`/`calcularMeta`) intacta, apenas garantindo que o script inicial não quebre.
3. (Opcional, se necessário) Garantir que `#economia` exista antes de setar `.value`.

## Arquivos dependentes a editar
- `frontend/app.js` (apenas)

## Follow-up steps
- Abrir `frontend/index.html` no navegador e testar:
  - Clique “Calcular análise” com valores válidos.
  - Clique “Calcular meta”.
  - Validar que, se algum campo não existir, aparece erro amigável ao invés de quebrar.

<ask_followup_question>
Confirmar se pode aplicar essa correção “robusta” em `frontend/app.js` (validação de ids antes de registrar listeners) para eliminar o erro de runtime no clique de cálculo.
</ask_followup_question>

