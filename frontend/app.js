const $ = (id) => document.getElementById(id);

const btnAnalise = $("btnAnalise");
const btnMeta = $("btnMeta");
const panelAnalise = $("panelAnalise");
const panelMeta = $("panelMeta");
const result = $("result");

const statusDot = $("statusDot");
const statusText = $("statusText");

function setStatus(text, tone = "neutral") {
  statusText.textContent = text;
  statusDot.classList.remove("ok", "warn", "danger");
  if (tone === "ok") statusDot.classList.add("ok");
  if (tone === "warn") statusDot.classList.add("warn");
  if (tone === "danger") statusDot.classList.add("danger");
}

function formatBRL(n) {
  if (!isFinite(n)) return "R$ 0,00";
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function pct(n) {
  if (!isFinite(n)) return 0;
  return Math.round(n);
}

function readNumber(id) {
  const el = $(id);
  if (!el) return NaN;
  const num = Number(el.value);
  return Number.isFinite(num) ? num : NaN;
}

function requirePositiveNumber(val, label) {
  if (!Number.isFinite(val) || val < 0) {
    throw new Error(`${label}: verifique o valor informado (>= 0).`);
  }
}

function setActive(mode) {
  const isAnalise = mode === "analise";
  if (btnAnalise) btnAnalise.setAttribute("aria-pressed", String(isAnalise));
  if (btnMeta) btnMeta.setAttribute("aria-pressed", String(!isAnalise));
  if (panelAnalise) panelAnalise.classList.toggle("hidden", !isAnalise);
  if (panelMeta) panelMeta.classList.toggle("hidden", isAnalise);
  if (result) result.textContent = "";
  if (statusText && statusDot) setStatus("Pronto", "neutral");
}

// Bootstrap seguro: se algum essencial faltar, não quebra silenciosamente.
try {
  const essentials = [
    [btnAnalise, "btnAnalise"],
    [btnMeta, "btnMeta"],
    [panelAnalise, "panelAnalise"],
    [panelMeta, "panelMeta"],
    [result, "result"],
    [statusDot, "statusDot"],
    [statusText, "statusText"],
  ];

  for (const [el, id] of essentials) {
    if (!el) throw new Error(`Elemento ausente no HTML: #${id}`);
  }

  btnAnalise.addEventListener("click", () => setActive("analise"));
  btnMeta.addEventListener("click", () => setActive("meta"));

  const ajudaEl = $("ajuda");
  if (ajudaEl) {
    ajudaEl.addEventListener("change", () => {
      const opcaoPanel = $("panelOpcaoDicas");
      if (!opcaoPanel) return;
      opcaoPanel.classList.toggle("hidden", ajudaEl.value !== "sim");
    });
  }

  const btnCalcularAnalise = $("btnCalcularAnalise");
  const btnCalcularMeta = $("btnCalcularMeta");
  const btnLimparAnalise = $("btnLimparAnalise");
  const btnLimparMeta = $("btnLimparMeta");

  if (btnCalcularAnalise) btnCalcularAnalise.addEventListener("click", calcularAnalise);
  if (btnCalcularMeta) btnCalcularMeta.addEventListener("click", calcularMeta);

  if (btnLimparAnalise) {
    btnLimparAnalise.addEventListener("click", () => {
      ["nome", "salario", "alimentacao", "transporte", "lazer", "economia", "reserva"].forEach((id) => {
        const el = $(id);
        if (el) el.value = "";
      });
      const ajuda = $("ajuda");
      if (ajuda) ajuda.value = "sim";
      const opcao = $("panelOpcaoDicas");
      if (opcao) opcao.classList.remove("hidden");
      if (result) result.textContent = "";
      setStatus("Pronto", "neutral");
    });
  }

  if (btnLimparMeta) {
    btnLimparMeta.addEventListener("click", () => {
      ["nomeMeta", "meta", "guardar"].forEach((id) => {
        const el = $(id);
        if (el) el.value = "";
      });
      if (result) result.textContent = "";
      setStatus("Pronto", "neutral");
    });
  }
} catch (e) {
  if (result) {
    result.textContent = String(e.message || e);
    setStatus("Não foi possível inicializar", "danger");
  }
  // Evita erro em cascata
  throw e;
}

function dicaPorOpcao(opcao) {
  switch (String(opcao)) {
    case "1":
      return ["- Evite compras por impulso", "- Faça uma lista antes de comprar", "- Compare preços"].join("\n");
    case "2":
      return ["- Anote tudo que você gasta", "- Corte gastos que não são essenciais", "- Defina um limite mensal"].join("\n");
    case "3":
      return [
        "- Guarde pelo menos 10% do que ganha",
        "- Evite gastos desnecessários",
        "- Estabeleça metas de economia",
      ].join("\n");
    case "4":
      return [
        "- Separe gastos fixos e variáveis",
        "- Planeje seu orçamento mensal",
        "- Evite dívidas desnecessárias",
      ].join("\n");
    default:
      return "- Continue monitorando suas despesas e ajustando mensalmente.";
  }
}

function calcularAnalise() {
  const nome = ($("nome")?.value || "").trim();

  const salario = readNumber("salario");
  const alimentacao = readNumber("alimentacao");
  const transporte = readNumber("transporte");
  const lazer = readNumber("lazer");
  const reserva = readNumber("reserva");

  try {
    requirePositiveNumber(salario, "Salário");
    requirePositiveNumber(alimentacao, "Alimentação");
    requirePositiveNumber(transporte, "Transporte");
    requirePositiveNumber(lazer, "Lazer");
    requirePositiveNumber(reserva, "Reserva");

    if (salario === 0) {
      throw new Error("A renda deve ser maior que 0 para gerar a análise.");
    }

    // Regra solicitada: gastos = alimentação + transporte + lazer
    const gastos = alimentacao + transporte + lazer;

    // Economia automática: salário - gastos
    const economiaCalculada = salario - gastos;

    // Atualiza o campo economia no formulário (disabled no HTML)
    const economiaEl = $("economia");
    if (economiaEl) {
      economiaEl.value = Number.isFinite(economiaCalculada)
        ? economiaCalculada.toFixed(2).replace(".", ",")
        : "";
    }

    const porcentagem_comida = pct((alimentacao / salario) * 100);
    const porcentagem_transporte = pct((transporte / salario) * 100);
    const porcentagem_lazer = pct((lazer / salario) * 100);
    const porcentagem_economia = pct((economiaCalculada / salario) * 100);
    const porcentagem_reserva = pct((reserva / salario) * 100);

    const despesasPct = porcentagem_comida + porcentagem_transporte + porcentagem_lazer;

    const ajuda = $("ajuda");
    const dicas = (ajuda?.value || "nao") === "sim";
    const opcaoDicas = $("opcaoDicas")?.value;

    const economiaPct = Math.round((economiaCalculada / salario) * 100);
    const gastosPct = Math.round((gastos / salario) * 100);

    let msg = `${nome ? `Olá, ${nome}!\n` : ""}`;
    msg += "Assistente virtual e seu professor de economia (o MVP em site):\n";
    msg += `— Seu salário: ${formatBRL(salario)}.\n`;
    msg += `— Gastos essenciais (alimentação+transporte+lazer): ${formatBRL(gastos)} (~${gastosPct}% do salário).\n`;
    msg += `— Economia do mês (salário - gastos): ${formatBRL(economiaCalculada)} (${economiaPct}% do salário).\n\n`;

    msg += "Vamos interpretar rapidinho os percentuais:\n";
    msg += `- Alimentação: ${porcentagem_comida}%\n`;
    msg += `- Transporte: ${porcentagem_transporte}%\n`;
    msg += `- Lazer: ${porcentagem_lazer}%\n`;
    msg += `- Economia (calculada): ${porcentagem_economia}%\n`;
    msg += `- Reserva (extra): ${porcentagem_reserva}%\n`;
    msg += `\nSoma (alimentação + transporte + lazer): ${despesasPct}%\n\n`;

    const maiorCategoria = [
      { key: "Alimentação", val: alimentacao },
      { key: "Transporte", val: transporte },
      { key: "Lazer", val: lazer },
    ].sort((a, b) => b.val - a.val)[0];

    const reduzirAlvoPct = Math.max(0, Math.round((despesasPct - 60) * 0.5));

    const proximPasso = (() => {
      if (economiaCalculada < 0) {
        const corte = maiorCategoria.val * 0.2;
        return `Próximo passo (hoje): faça um corte de ~20% em ${maiorCategoria.key} (algo como ${formatBRL(corte)} no mês).`;
      }
      if (gastos > salario * 0.6) {
        return `Próximo passo (esta semana): reduza ${maiorCategoria.key} em cerca de ${reducirAlvoPct || 10}% para aproximar os essenciais de 60%.`;
      }
      return "Próximo passo (próximo mês): mantenha o nível atual e ajuste 1 categoria por vez (bem pequeno mesmo).";
    })();

    if (economiaCalculada < 0 || gastos > salario * 0.6) {
      msg += "⚠️ Atenção: seus essenciais estão pesando mais do que o ideal para gerar folga no mês.";

      if (economiaCalculada < 0) {
        msg += "\nIsso indica que, no modelo, suas despesas essenciais superaram sua renda mensal.";
      } else {
        msg += "\nIsso indica que a soma dos essenciais ficou acima do recomendado para caber no orçamento com economia.";
      }

      msg += "\n\nAjuste simples funciona melhor do que tentar mudar tudo de uma vez.";
      msg += "\n\n";
      msg += proximPasso;

      if (dicas) {
        msg += "\n\nDicas rápidas (professor):\n";
        msg += dicaPorOpcao(opcaoDicas);
      }

      setStatus("Vamos ajustar", "warn");
    } else {
      msg += "✅ Boa notícia: pelo seu cenário, você está conseguindo sobrar com os essenciais dentro do recomendado.";
      msg += "\n\n";
      msg += proximPasso;

      if (dicas) {
        msg += "\n\nDicas para manter e melhorar:\n";
        msg += dicaPorOpcao(opcaoDicas);
      }

      setStatus("Bom andamento", "ok");
    }

    if (result) result.textContent = msg;
  } catch (e) {
    setStatus("Não foi possível concluir", "danger");
    if (result) {
      result.textContent = "Não foi possível concluir sua análise agora. Verifique os valores informados e tente novamente.";
    }
  }
}

function calcularMeta() {
  const nome = ($("nomeMeta")?.value || "").trim();

  const meta = readNumber("meta");
  const guardar = readNumber("guardar");

  try {
    requirePositiveNumber(meta, "Meta");
    requirePositiveNumber(guardar, "Guardar por mês");

    if (guardar === 0) throw new Error("Guardar por mês não pode ser 0.");

    const meses = meta / guardar;

    let msg = `${nome ? `Olá, ${nome}!\n` : ""}`;
    msg += "Vamos calcular sua trajetória:\n";
    msg += `— Sua meta: ${formatBRL(meta)}.\n`;
    msg += `— Você consegue guardar: ${formatBRL(guardar)} por mês.\n\n`;

    msg += `Se esse valor se mantiver, sua meta sai em aproximadamente ${meses.toFixed(0)} mês(es).\n`;
    msg += "\nDica do professor: consistência é o que transforma o número em resultado.";

    if (meta <= guardar) {
      msg += "\n\n✅ Você já está atingindo sua meta (ou chega nela em ~1 mês).";
      setStatus("Meta calculada (atingida)", "ok");
    } else {
      setStatus("Meta calculada", "ok");
    }

    if (result) result.textContent = msg;
  } catch (e) {
    setStatus("Não foi possível concluir", "danger");
    if (result) {
      result.textContent = "Não foi possível concluir o cálculo da sua meta agora. Verifique os valores informados e tente novamente.";
    }
  }
}

