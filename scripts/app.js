import { CONTEXTS, CONTEXT_GROUPS, SETTINGS, STRINGS } from "./data.js";
import { escapeHTML, formatCoins, formatGp, formatNumber, localize } from "./utils.js";
import { analyzeContextRichness, budgetPlausibility, generateLoot, isOversizedBudget, regenerateUnlocked, replaceLootLine, sanitizeOptions } from "./generator.js";
import { SVINETS_ASSETS, bindAssetFallback, categoryAsset } from "./assets.js";
import { renderDiagnostics } from "./diagnostics.js";
import { DEFAULT_OPTIONS, getLastOptions, saveLastOptions } from "./settings.js";

const MAGIC_CHOICES = Object.freeze([
  ["automatic", "Автоматически"], ["none", "Без магии"], ["common", "До обычных"],
  ["uncommon", "До необычных"], ["rare", "До редких"], ["veryRare", "До очень редких"], ["legendary", "До легендарных"]
]);
const LEVEL_CHOICES = Object.freeze([["ignore", "Не учитывать"], ["1-4", "1–4"], ["5-10", "5–10"], ["11-16", "11–16"], ["17-20", "17–20"]]);
const COIN_CHOICES = Object.freeze([["automatic", "Автоматически"], ["few", "Мало"], ["medium", "Средне"], ["many", "Много"]]);
const GROUPS = Object.freeze(Object.entries(CONTEXT_GROUPS));

function contextGroupId(contextId) { return CONTEXTS[contextId]?.categoryId ?? "miscellaneous"; }
function selected(value, expected) { return value === expected ? " selected" : ""; }
function checked(value) { return value ? " checked" : ""; }

function placeOptions(categoryId, contextId) {
  return Object.entries(CONTEXTS).filter(([, context]) => context.categoryId === categoryId).map(([id, context]) => `<option value="${id}"${selected(contextId, id)}>${id} — ${escapeHTML(context.name)}</option>`).join("");
}

function buildDialogContent(rawDefaults = {}) {
  const d = { ...DEFAULT_OPTIONS, ...rawDefaults };
  const categoryId = contextGroupId(d.contextId);
  const categoryOptions = GROUPS.map(([key, group]) => `<option value="${key}"${selected(categoryId, key)}>${group.id}. ${escapeHTML(group.label)}</option>`).join("");
  const magicOptions = MAGIC_CHOICES.map(([value, label]) => `<option value="${value}"${selected(d.magicMode, value)}>${label}</option>`).join("");
  const coinOptions = COIN_CHOICES.map(([value, label]) => `<option value="${value}"${selected(d.coinPreference, value)}>${label}</option>`).join("");
  const levelOptions = LEVEL_CHOICES.map(([value, label]) => `<option value="${value}"${selected(d.levelBand, value)}>${label}</option>`).join("");
  return `<div class="svinets-generator" data-svinets-root>
    <header class="svinets-generator__hero"><img src="${SVINETS_ASSETS.logo}" alt="Логотип Svinets"><div><h2>Svinets</h2><p>Правдоподобная добыча по месту, бюджету и магии.</p></div></header>
    <section class="svinets-section svinets-main-fields">
      <label><span>Категория места</span><select name="contextCategory" data-context-category>${categoryOptions}</select></label>
      <label><span>Место</span><select name="contextId" data-context-place>${placeOptions(categoryId, d.contextId)}</select></label>
      <label><span>Общая стоимость</span><div class="svinets-input-with-suffix"><input name="budgetGp" type="number" min="${SETTINGS.minBudgetGp}" max="${SETTINGS.maxBudgetGp}" step="0.01" value="${escapeHTML(d.budgetGp)}" required><span>зм</span></div></label>
      <label><span>Магические предметы</span><select name="magicMode">${magicOptions}</select></label>
    </section>
    <aside class="svinets-live-preview" aria-live="polite"><img src="${SVINETS_ASSETS.actions.random}" alt="" aria-hidden="true"><div><b>Готово к генерации</b><span data-validation>Выберите место и бюджет.</span></div></aside>
    <details class="svinets-advanced"><summary>Дополнительно</summary><div class="svinets-details-body">
      <label><span>Уровень группы для предупреждений</span><select name="levelBand">${levelOptions}</select></label>
      <label><span>Доля монет</span><select name="coinPreference">${coinOptions}</select></label>
      <label><span>Seed для повторяемости</span><input name="seed" type="number" step="1" value="${Number.isFinite(d.seed) ? escapeHTML(d.seed) : ""}" placeholder="случайный"></label>
      <label class="svinets-check"><input name="includeFlavor" type="checkbox"${checked(d.includeFlavor)}><span>Добавлять атмосферные детали</span></label>
      <label class="svinets-check"><input name="useWeightLimit" type="checkbox"${checked(d.useWeightLimit)}><span>Учитывать лимит веса</span></label>
      <label data-weight-row${d.useWeightLimit ? "" : " hidden"}><span>Максимальный вес, фн.</span><input name="maxWeight" type="number" min="1" step="1" value="${escapeHTML(d.maxWeight)}"></label>
      <label class="svinets-check"><input name="autoExport" type="checkbox"${checked(d.autoExport)}><span>После публикации создать предметы мира</span></label>
      <label data-export-row${d.autoExport ? "" : " hidden"}><span>Экспорт</span><select name="exportTarget"><option value="chat"${selected(d.exportTarget, "chat")}>Чат</option><option value="world"${selected(d.exportTarget, "world")}>Чат и предметы мира</option></select></label>
      <button type="button" class="svinets-save" data-save-settings>Сохранить настройки</button>
    </div></details>
  </div>`;
}

function readDialogForm(form) {
  const el = name => form.elements.namedItem(name);
  const value = name => el(name)?.value;
  const number = name => el(name)?.valueAsNumber;
  const bool = name => Boolean(el(name)?.checked);
  return { contextId: value("contextId"), budgetGp: number("budgetGp"), magicMode: value("magicMode"), coinPreference: value("coinPreference"), levelBand: value("levelBand"), seed: value("seed"), includeFlavor: bool("includeFlavor"), useWeightLimit: bool("useWeightLimit"), maxWeight: number("maxWeight"), autoExport: bool("autoExport"), exportTarget: value("exportTarget") };
}

function validateForm(form) {
  const options = readDialogForm(form); const errors = [];
  if (!Number.isFinite(options.budgetGp) || options.budgetGp < SETTINGS.minBudgetGp || options.budgetGp > SETTINGS.maxBudgetGp) errors.push(`Бюджет: ${SETTINGS.minBudgetGp}–${formatNumber(SETTINGS.maxBudgetGp)} зм.`);
  if (!CONTEXTS[options.contextId]) errors.push("Выберите место находки.");
  if (options.useWeightLimit && (!Number.isFinite(options.maxWeight) || options.maxWeight <= 0)) errors.push("Укажите положительный лимит веса.");
  return errors;
}

function bindDialogControls(scope = globalThis.document, entries = []) {
  const root = scope?.querySelector?.("[data-svinets-root]") ?? globalThis.document?.querySelector?.("[data-svinets-root]"); if (!root || root.dataset.bound === "true") return;
  root.dataset.bound = "true"; const form = root.closest("form"); if (!form) return;
  bindAssetFallback(root);
  const update = () => {
    const options = readDialogForm(form); const errors = validateForm(form); const context = CONTEXTS[options.contextId];
    const validation = root.querySelector("[data-validation]");
    const richness = entries.length && context ? analyzeContextRichness(entries, options.contextId) : { richness: "adequate" };
    const oversized = isOversizedBudget(options.budgetGp, options.levelBand);
    const plausibility = context ? budgetPlausibility(options.contextId, options.budgetGp || 0) : { status: "normal" };
    if (validation) { validation.className = `svinets-validation ${errors.length ? "is-danger" : richness.richness === "poor" || oversized || plausibility.status !== "normal" ? "is-warning" : "is-success"}`; validation.textContent = errors[0] ?? (plausibility.warning ?? (richness.richness === "poor" ? "Для этого места бюджет выглядит необычно большим." : oversized ? "Стоимость выше обычного диапазона группы." : `${context?.name ?? "Место"} · ${formatNumber(options.budgetGp || 0)} зм.`)); }
    root.closest(".application, .dialog")?.querySelectorAll?.("button[data-action='ok']").forEach(button => { button.disabled = errors.length > 0; });
  };
  form.elements.contextCategory?.addEventListener("change", event => { const categoryId = event.currentTarget.value; const current = form.elements.contextId.value; const next = Object.entries(CONTEXTS).find(([id, context]) => context.categoryId === categoryId && id === current) ?? Object.entries(CONTEXTS).find(([, context]) => context.categoryId === categoryId); if (next) { form.elements.contextId.value = next[0]; root.querySelector("[data-context-place]").replaceChildren(...new DOMParser().parseFromString(`<select>${placeOptions(categoryId, next[0])}</select>`, "text/html").querySelector("select").children); } update(); });
  form.elements.useWeightLimit?.addEventListener("change", event => { root.querySelector("[data-weight-row]").hidden = !event.currentTarget.checked; update(); });
  form.elements.autoExport?.addEventListener("change", event => { root.querySelector("[data-export-row]").hidden = !event.currentTarget.checked; update(); });
  root.querySelector("[data-save-settings]")?.addEventListener("click", async () => { const errors = validateForm(form); if (errors.length) return globalThis.ui?.notifications?.error(errors[0]); await saveLastOptions(sanitizeOptions(readDialogForm(form))); globalThis.ui?.notifications?.info("Svinets | Настройки сохранены."); });
  form.addEventListener("input", update); form.addEventListener("change", update); update();
}

function recomputeResult(result, lines) {
  const itemsCp = lines.reduce((sum, line) => sum + line.totalCp, 0);
  return { ...result, lines, itemsCp, coinsCp: result.budgetCp - itemsCp, actualCoinShare: result.budgetCp ? (result.budgetCp - itemsCp) / result.budgetCp : 1, coinRangeSatisfied: (result.budgetCp - itemsCp) >= 0 };
}

function mergeLocked(next, current, locked) {
  const lines = [...next.lines];
  for (const index of locked) if (current.lines[index]) lines[index] = { ...current.lines[index] };
  while (lines.length && lines.reduce((sum, line) => sum + line.totalCp, 0) > next.budgetCp) {
    const removable = lines.findIndex((line, index) => !locked.has(index));
    if (removable < 0) break;
    lines.splice(removable, 1);
  }
  return recomputeResult(next, lines);
}

function previewLine(line, index, locked) {
  return `<li class="svinets-preview-line${locked.has(index) ? " is-locked" : ""}"><img src="${categoryAsset(line)}" alt="" aria-hidden="true"><span><strong>${escapeHTML(line.name)}</strong><small>${line.qty > 1 ? `× ${line.qty} · ` : ""}${escapeHTML(formatGp(line.totalCp))}</small></span><button type="button" data-lock-line="${index}" title="Закрепить строку" aria-label="Закрепить строку">${locked.has(index) ? "🔒" : "🔓"}</button><button type="button" data-replace-line="${index}" title="Заменить строку" aria-label="Заменить строку">↻</button></li>`;
}

function buildPreviewContent(result, locked = new Set()) {
  return `<div class="svinets-preview-root" data-preview-root><header class="svinets-preview__header"><img src="${SVINETS_ASSETS.logo}" alt="Svinets"><div><h2>Предпросмотр добычи</h2><p>${escapeHTML(result.contextName)} · ${formatNumber(result.budgetCp / 100)} зм</p></div></header><div class="svinets-preview__actions"><button type="button" data-reroll>Перегенерировать незакреплённое</button><span data-preview-budget>Предметы ${escapeHTML(formatGp(result.itemsCp))} · Монеты ${escapeHTML(formatCoins(result.coinsCp))}</span></div><ol class="svinets-preview-lines">${result.lines.map((line, index) => previewLine(line, index, locked)).join("")}</ol>${result.flavors?.length ? `<p class="svinets-flavors"><b>Атмосфера:</b> ${result.flavors.map(item => escapeHTML(item.name)).join(" · ")}</p>` : ""}${renderDiagnostics(result)}</div>`;
}

function replacePreviewRoot(scope, state, entries, generate) {
  const root = scope.querySelector("[data-preview-root]"); if (!root) return;
  const fragment = document.createRange().createContextualFragment(buildPreviewContent(state.result, state.locked)); const next = fragment.firstElementChild; root.replaceWith(next); bindPreviewControls(scope, state, entries, generate);
}

function bindPreviewControls(scope, state, entries, generate) {
  const root = scope.querySelector("[data-preview-root]"); if (!root || root.dataset.bound === "true") return; root.dataset.bound = "true";
  bindAssetFallback(root);
  root.querySelectorAll("[data-lock-line]").forEach(button => button.addEventListener("click", () => { const index = Number(button.dataset.lockLine); if (state.locked.has(index)) state.locked.delete(index); else state.locked.add(index); replacePreviewRoot(scope, state, entries, generate); }));
  root.querySelectorAll("[data-replace-line]").forEach(button => button.addEventListener("click", () => { const index = Number(button.dataset.replaceLine); if (state.locked.has(index)) return; state.result = replaceLootLine(entries, state.result, index, ++state.revision); if (!state.result.replacementFound) globalThis.ui?.notifications?.warn("Подходящая замена не найдена; стоимость строки возвращена в монеты."); replacePreviewRoot(scope, state, entries, generate); }));
  root.querySelector("[data-reroll]")?.addEventListener("click", () => { state.result = regenerateUnlocked(entries, state.result, state.locked, ++state.revision); replacePreviewRoot(scope, state, entries, generate); });
}

async function showPreview(result, entries, generate = options => generateLoot(entries, options)) {
  const DialogV2 = globalThis.foundry?.applications?.api?.DialogV2; if (!DialogV2?.prompt) return result;
  const state = { result, locked: new Set(), revision: 0 };
  return DialogV2.prompt({ window: { title: "Svinets | Предпросмотр" }, classes: ["svinets-dialog"], content: buildPreviewContent(state.result), modal: true, rejectClose: false, render: (_event, dialog) => bindPreviewControls(dialog.element, state, entries, generate), ok: { label: "Опубликовать в чат", icon: "fa-solid fa-message", callback: () => state.result }, buttons: [{ action: "cancel", label: "Отмена", callback: () => null }] });
}

async function askOptions(entries = []) {
  const defaults = { ...DEFAULT_OPTIONS, ...getLastOptions() }; const strings = { title: localize("SVINETS.Title", STRINGS.title), generate: localize("SVINETS.Generate", STRINGS.generate), cancel: localize("SVINETS.Cancel", STRINGS.cancel) }; const DialogV2 = globalThis.foundry?.applications?.api?.DialogV2; if (!DialogV2?.prompt) throw new Error("Для генератора требуется foundry.applications.api.DialogV2 из Foundry v12.");
  return DialogV2.prompt({ window: { title: strings.title, icon: "fa-solid fa-coins" }, classes: ["svinets-dialog"], content: buildDialogContent(defaults), modal: true, rejectClose: false, render: (_event, dialog) => bindDialogControls(dialog.element, entries), ok: { label: strings.generate, icon: "fa-solid fa-dice", callback: (_event, button) => sanitizeOptions(readDialogForm(button.form), { notify: true }) }, buttons: [{ action: "cancel", label: strings.cancel, callback: () => null }] });
}

async function openGenerator(entries = []) { if (!globalThis.game?.user?.isGM) { globalThis.ui?.notifications?.warn(localize("SVINETS.NotGM", "Генератор лута доступен только Мастеру.")); return null; } return askOptions(entries); }

export { buildDialogContent, readDialogForm, validateForm, bindDialogControls, buildPreviewContent, showPreview, askOptions, openGenerator, contextGroupId };
