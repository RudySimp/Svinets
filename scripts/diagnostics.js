import { formatGp, formatNumber } from "./utils.js";

function coinDiagnostic(result) {
  const range = result.coinRange ?? result.options?._profile?.coinRange ?? [0, 1];
  const share = Number(result.actualCoinShare) || 0;
  const distance = share < range[0] ? range[0] - share : share > range[1] ? share - range[1] : 0;
  const status = distance <= 0.000001 ? "success" : distance <= 0.10 ? "warning" : "danger";
  return { status, share, range, label: `${Math.round(share * 100)}% (цель ${Math.round(range[0] * 100)}–${Math.round(range[1] * 100)}%)` };
}

function lootRating(result) {
  const coin = coinDiagnostic(result);
  let score = coin.status === "success" ? 3 : coin.status === "warning" ? 2 : 1;
  if (result.weightExceeded) score -= 1;
  if (result.oversizedBudget || result.budgetPlausibility?.status === "absurd") score -= 1;
  if (score >= 3) return { status: "success", label: "Норма" };
  if (score === 2) return { status: "warning", label: "Допустимо" };
  return { status: "danger", label: "Требует внимания" };
}

function diagnosticRows(result) {
  const coin = coinDiagnostic(result);
  const magicCount = result.lines.filter(line => line.magic).length;
  const plausibility = result.budgetPlausibility ?? { status: "normal" };
  const repair = result.highValueRepair ?? { repaired: 0 };
  return [
    { label: "Монеты", value: coin.label, status: coin.status },
    { label: "Диапазон бюджета", value: plausibility.status, status: plausibility.status === "normal" ? "neutral" : "warning" },
    { label: "Строки", value: `${result.lines.length}`, status: "neutral" },
    { label: "Единицы", value: `${formatNumber(result.lines.reduce((sum, line) => sum + line.qty, 0))}`, status: "neutral" },
    { label: "Магия", value: `${magicCount}`, status: "neutral" },
    { label: "Предметы", value: formatGp(result.itemsCp), status: "neutral" },
    { label: "High-value repair", value: `${repair.repaired}`, status: "neutral" },
    { label: "Вес", value: `${formatNumber(result.totalWeight)} фн.`, status: result.weightExceeded ? "danger" : "neutral" }
  ];
}

function renderDiagnostics(result, { compact = false } = {}) {
  const rating = lootRating(result);
  const rows = diagnosticRows(result);
  return `<section class="svinets-diagnostics${compact ? " svinets-diagnostics--compact" : ""}" aria-label="Диагностика результата">
    <header class="svinets-diagnostics__header"><strong>Диагностика</strong><span class="svinets-status svinets-status--${rating.status}">${rating.label}</span></header>
    <div class="svinets-diagnostics__grid">${rows.map(row => `<span class="svinets-diagnostic svinets-diagnostic--${row.status}"><b>${row.label}</b>${row.value}</span>`).join("")}</div>
    ${result.budgetPlausibility?.warning ? `<p class="svinets-diagnostic--danger">⚠ ${result.budgetPlausibility.warning}</p>` : ""}
  </section>`;
}

export { coinDiagnostic, lootRating, diagnosticRows, renderDiagnostics };
