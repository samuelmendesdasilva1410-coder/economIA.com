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
  statusDot.classList.remove("ok","warn","danger");
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
  const v = $(id).value;
  const num = Number(v);
  return Number.isFinite(num) ? num : NaN;
}

function requirePositiveNumber(val, label) {
  if (!Number.isFinite(val) || val < 0) {
    throw new Error(`${label}: informe um número válido (>= 0).`);
  }
}

function setActive(mode) {
  const isAnalise = mode === "analise";
  btnAnalise.setAttribute("aria-pressed", String(isAnalise));
  btnMeta.setAttribute("aria-pressed", String(!isAnalise));
  panelAnalise.classList.toggle("hidden", !isAnalise);
  panelMeta.classList.toggle("hidden", isAnalise);
  result.textContent = "";
  setStatus("Pronto", "neutral");
}

btnAnalise.addEventListener("click", () => setActive("analise"));
btnMeta.addEventListener("click", () => setActive("meta"));

$("ajuda").addEventListener("change", () => {
  $("panelOpcaoDicas").classList.toggle("hidden", $("ajuda").value !== "sim");
});

function dicaPorOpcao(opcao) {
  switch (String(opcao)) {
    case "1":
      return [
        "- Evite compras por impulso",
        "- Faça uma lista antes de comprar",
        "- Compare preços",
      ].join("\n");
    case "2":
      return [
        "- Anote tudo que você gasta",
        "- Corte gastos que não são essenciais",
        "- Defina um limite mensal",
      ].join("\n");
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
  const nome = ($("nome").value || "" ).trim();

  const salario = readNumber("salario");
  const alimentacao = readNumber("alimentacao");
  const transporte = readNumber("transporte");
  const lazer = readNumber("lazer");
  const economia = readNumber("economia");
  const reserva = readNumber("reserva");

  try {
    requirePositiveNumber(salario, "Salário");
    requirePositiveNumber(alimentacao, "Alimentação");
    requirePositiveNumber(transporte, "Transporte");
    requirePositiveNumber(lazer, "Lazer");
    requirePositiveNumber(economia, "Economia");
    requirePositiveNumber(reserva, "Reserva");

    if (salario === 0) {
      throw new Error("Salário não pode ser 0 para calcular percentuais.");
    }

    const gasto = alimentacao + transporte + lazer + economia + reserva;

    const porcentagem_comida = pct((alimentacao / salario) * 100);
    const porcentagem_transporte = pct((transporte / salario) * 100);
    const porcentagem_lazer = pct((lazer / salario) * 100);
    const porcentagem_economia = pct((economia / salario) * 100);
    const porcentagem_reserva = pct((reserva / salario) * 100);

    const despesasPct = porcentagem_comida + porcentagem_transporte + porcentagem_lazer;
    const ideal60 = despesasPct < 80; // segue a intenção do seu script (corrigindo o bug do código)

    // Texto base
    let msg = `${nome ? `Olá, ${nome}!\n` : ""}`;
    msg += `Seu salário é ${formatBRL(salario)}.\n`;
    msg += `Gastos do mês (aprox.): ${formatBRL(gasto)} (${Math.round((gasto / salario) * 100)}% do salário).\n\n`;
    msg += `Percentuais: \n`;
    msg += `- Alimentação: ${porcentagem_comida}%\n`;
    msg += `- Transporte: ${porcentagem_transporte}%\n`;
    msg += `- Lazer: ${porcentagem_lazer}%\n`;
    msg += `- Economia: ${porcentagem_economia}%\n`;
    msg += `- Reserva: ${porcentagem_reserva}%\n`;
    msg += `\nSoma (alimentação + transporte + lazer): ${despesasPct}%\n`;

    const dicas = $("ajuda").value === "sim";
    const opcaoDicas = $("opcaoDicas").value;

    if (gasto > salario * 0.6) {
      msg += "\n⚠️ Atenção: suas despesas aparentam estar acima do recomendado.\n";
      msg += "Conferindo com a regra do seu script: a soma de (comida + transporte + lazer) ficou além do ideal.\n";

      if (!ideal60) {
        msg += "\nSugestão (divisão ideal):\n";
        msg += "- 60% alimentação, transporte e lazer\n";
        msg += "- 20% reserva de emergência\n";
        msg += "- 20% economia\n";
      } else {
        msg += "\nSua soma de despesas está perto do ideal, mas revise os valores para otimizar.\n";
      }

      if (dicas) {
        msg += "\nDicas para ajuste:\n";
        msg += dicaPorOpcao(opcaoDicas);
      }

      setStatus("Análise pronta (atenção)", "warn");
    } else {
      msg += "\n✅ Parabéns: suas despesas parecem estar dentro do recomendado.\n";
      if (dicas) {
        msg += "\nDicas para manter e melhorar:\n";
        msg += dicaPorOpcao(opcaoDicas);
      }
      setStatus("Análise pronta", "ok");
    }

    result.textContent = msg;
  } catch (e) {
    setStatus("Erro", "danger");
    result.textContent = `Falha ao calcular: ${e.message}`;
  }
}

function calcularMeta() {
  const nome = ($("nomeMeta").value || "").trim();

  const meta = readNumber("meta");
  const guardar = readNumber("guardar");

  try {
    requirePositiveNumber(meta, "Meta");
    requirePositiveNumber(guardar, "Guardar por mês");

    if (guardar === 0) throw new Error("Guardar por mês não pode ser 0.");

    const meses = meta / guardar;

    let msg = `${nome ? `Olá, ${nome}!\n` : ""}`;
    msg += `Sua meta é ${formatBRL(meta)}.\n`;
    msg += `Você consegue guardar ${formatBRL(guardar)} por mês.\n\n`;

    msg += `Você levará aproximadamente ${meses.toFixed(0)} meses para atingir sua meta.\n`;

    if (meta <= guardar) {
      msg += "✅ Você já atingiu sua meta (ou ela será atingida em 1 mês).";
      setStatus("Meta calculada (atingida)", "ok");
    } else {
      setStatus("Meta calculada", "ok");
    }

    result.textContent = msg;
  } catch (e) {
    setStatus("Erro", "danger");
    result.textContent = `Falha ao calcular: ${e.message}`;
  }
}

$("btnCalcularAnalise").addEventListener("click", calcularAnalise);
$("btnCalcularMeta").addEventListener("click", calcularMeta);

$("btnLimparAnalise").addEventListener("click", () => {
  ["nome","salario","alimentacao","transporte","lazer","economia","reserva"].forEach(id => $(id).value = "");
  $("ajuda").value = "sim";
  $("panelOpcaoDicas").classList.remove("hidden");
  result.textContent = "";
  setStatus("Pronto", "neutral");
});

$("btnLimparMeta").addEventListener("click", () => {
  ["nomeMeta","meta","guardar"].forEach(id => $(id).value = "");
  result.textContent = "";
  setStatus("Pronto", "neutral");
});

