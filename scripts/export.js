import { FLAG_SCOPE, FLAG_KEY, VERSION, STRINGS, RARITY_META, RARITY_RANK } from "./data.js";
import { escapeHTML, formatGp, formatCoins, formatNumber, cpToGp } from "./utils.js";
import { SVINETS_ASSETS, bindAssetFallback, categoryAsset } from "./assets.js";
import { playResultVfx } from "./vfx.js";

function dnd5eItemType(line) {
  if (["weapon", "magic_weapon"].includes(line.category)) return "weapon";
  if (["armor", "magic_armor", "barding", "tack", "focus", "magic_ring", "magic_rod", "magic_staff", "magic_wand", "wondrous"].includes(line.category)) return "equipment";
  if (["consumable", "food", "ammo", "scroll", "magic_potion", "magic_ammo"].includes(line.category)) return "consumable";
  if (["tool", "instrument"].includes(line.category)) return "tool";
  if (line.category === "container") return "container";
  return "loot";
}

function renderItemDescription(line) {
  const parts = [`<p><strong>Источник генератора:</strong> ${escapeHTML(line.sourceId ?? "—")}</p>`, `<p><strong>Стоимость:</strong> ${escapeHTML(formatGp(line.unitCp))}</p>`];
  if (line.magic && line.rarity) parts.push(`<p><strong>Редкость:</strong> ${escapeHTML(RARITY_META[line.rarity]?.label ?? line.rarity)}</p>`);
  if (line.attunement) parts.push("<p><strong>Настройка:</strong> требуется</p>");
  if (line.spells?.length) parts.push(`<p><strong>Заклинания:</strong> ${escapeHTML(line.spells.join(", "))}</p>`);
  if (line.specificSource) parts.push(`<p><strong>Основа:</strong> ${escapeHTML(line.specificSource)}</p>`);
  if (line.sourceValueClass) parts.push(`<p><strong>Ценовой класс:</strong> ${escapeHTML(line.sourceValueClass)}; <strong>источник:</strong> ${escapeHTML(line.source ?? "legacy-table")}</p>`);
  if (line.formula) parts.push(`<p><strong>Формула:</strong> ${escapeHTML(formatGp(line.formula.baseCp))} + ${escapeHTML(formatGp(line.formula.bonusCp))} = ${escapeHTML(formatGp(line.formula.totalCp))}</p>`);
  return parts.join("");
}

function foundryItemData(line) {
  const isDnd5e = globalThis.game?.system?.id === "dnd5e";
  const flags = { generatedBy: "svinets", generatorVersion: VERSION, sourceId: line.sourceId ?? null, sourceValueClass: line.sourceValueClass ?? null, source: line.source ?? null, generatedDisplayName: line.generatedDisplayName ?? line.name, rarity: line.rarity ?? null, attunement: Boolean(line.attunement), weight: Number(line.weight) || 0 };
  if (line.spells?.length) flags.spells = [...line.spells];
  if (line.specificSource) flags.specificSource = line.specificSource;
  const data = { name: line.name, type: isDnd5e ? dnd5eItemType(line) : "loot", flags: { [FLAG_SCOPE]: flags } };
  if (isDnd5e) {
    data.system = { quantity: Math.max(1, Number(line.qty) || 1), price: { value: cpToGp(line.unitCp), denomination: "gp" }, description: { value: renderItemDescription(line) } };
    if (Number(line.weight) > 0) data.system.weight = { value: Number(line.weight), units: "lb" };
    if (line.rarity && RARITY_RANK[line.rarity] != null) data.system.rarity = line.rarity;
    if (line.attunement) data.system.attunement = "required";
  }
  return data;
}

async function exportToWorld(result) {
  const itemData = result.lines.map(foundryItemData);
  if (!itemData.length) { globalThis.ui?.notifications?.warn("В добыче нет ценовых предметов для экспорта."); return []; }
  try {
    const creator = typeof globalThis.Item?.createDocuments === "function" ? globalThis.Item.createDocuments.bind(globalThis.Item) : globalThis.CONFIG?.Item?.documentClass?.createDocuments?.bind(globalThis.CONFIG.Item.documentClass);
    if (!creator) throw new Error("Публичный API создания Item-документов недоступен.");
    const created = await creator(itemData); globalThis.ui?.notifications?.info(`Создано предметов мира: ${created.length}.`); return created;
  } catch (error) { console.error("Svinets | Ошибка экспорта:", error); globalThis.ui?.notifications?.error(`Экспорт не выполнен: ${error.message}`); return []; }
}

const CHAT_GROUPS = Object.freeze({ weapon: "Оружие", magic_weapon: "Оружие", armor: "Доспехи", magic_armor: "Доспехи", barding: "Доспехи", gear: "Снаряжение", container: "Снаряжение", tool: "Снаряжение", instrument: "Снаряжение", focus: "Снаряжение", ammo: "Снаряжение", animal: "Снаряжение", vehicle: "Снаряжение", consumable: "Расходники", food: "Расходники", scroll: "Расходники", magic_potion: "Расходники", magic_ammo: "Расходники", valuable: "Ценности", gemstone: "Ценности", art_object: "Ценности", trade_good: "Ценности", magic_ring: "Магические предметы", magic_rod: "Магические предметы", magic_staff: "Магические предметы", magic_wand: "Магические предметы", wondrous: "Магические предметы" });
const GROUP_ORDER = ["Оружие", "Доспехи", "Снаряжение", "Расходники", "Ценности", "Магические предметы", "Прочее"];
const RARITY_RU = Object.freeze({ common: "обычный", uncommon: "необычный", rare: "редкий", veryRare: "очень редкий", legendary: "легендарный" });

function lineHtml(line, index, compact) {
  const qty = line.qty > 1 ? ` × ${line.qty}` : "";
  if (compact) return `<li class="svinets-item svinets-item--compact"><img src="${categoryAsset(line)}" alt="" aria-hidden="true"><span><strong>${index}. ${escapeHTML(line.name)}</strong>${escapeHTML(qty)}<small>${escapeHTML(formatGp(line.totalCp))}</small></span></li>`;
  const tags = [line.rarity ? `[${RARITY_RU[line.rarity] ?? line.rarity}]` : "", line.attunement ? "[настройка]" : ""].filter(Boolean).join(" ");
  const details = line.qty > 1 ? `${formatGp(line.unitCp)} за шт. = ${formatGp(line.totalCp)}` : formatGp(line.totalCp);
  const formula = line.formula ? `<small>База ${escapeHTML(formatGp(line.formula.baseCp))} + магия ${escapeHTML(formatGp(line.formula.bonusCp))}</small>` : "";
  const magicInfo = line.magic ? `<button type="button" class="svinets-info-button" data-magic-info="${escapeHTML(line.sourceId ?? "")}" title="Подробнее о магии" aria-label="Подробнее о магии"><i class="fa-solid fa-circle-info" aria-hidden="true"></i></button>` : "";
  return `<li class="svinets-item"><img src="${categoryAsset(line)}" alt="" aria-hidden="true"><span><strong>${index}. ${escapeHTML(line.name)}</strong>${escapeHTML(qty)} ${magicInfo}<em>${escapeHTML(tags)}</em><small>${escapeHTML(details)}</small>${formula}${line.spells?.length ? `<small>Заклинания: ${escapeHTML(line.spells.join(", "))}</small>` : ""}</span></li>`;
}

function renderLootChat(result, { compact = result.lines.length > 20 } = {}) {
  const grouped = new Map(GROUP_ORDER.map(group => [group, []]));
  result.lines.forEach(line => (grouped.get(CHAT_GROUPS[line.category] ?? "Прочее") ?? grouped.get("Прочее")).push(line));
  let counter = 1;
  const blocks = GROUP_ORDER.map(group => { const lines = grouped.get(group); if (!lines.length) return ""; return `<section class="svinets-chat-group"><h3><img src="${categoryAsset(lines[0])}" alt="" aria-hidden="true">${escapeHTML(group)}</h3><ol>${lines.map(line => lineHtml(line, counter++, compact)).join("")}</ol></section>`; }).join("");
  const flavors = result.flavors?.length ? `<section class="svinets-flavors"><h3>Атмосферные находки</h3><p>${result.flavors.map(flavor => escapeHTML(flavor.name)).join(" · ")} <small>(без цены)</small></p></section>` : "";
  const empty = !result.lines.length ? `<div class="svinets-empty"><img src="${SVINETS_ASSETS.actions.empty}" alt="Пустая находка"><strong>Ничего ценного не найдено</strong><span>Монеты всё ещё входят в бюджет.</span></div>` : "";
  const attunement = result.options.useAttunement ? `<span>Настройка: ${result.attunementCount} / ${result.attunementLimit}</span>` : "";
  const weight = result.options.useWeightLimit ? `<span>Вес: ${formatNumber(result.totalWeight)} фн.${result.weightExceeded ? " · лимит превышен" : ""}</span>` : "";
  return `<article class="svinets-card" data-svinets-card><header class="svinets-card__header"><img src="${SVINETS_ASSETS.logo}" alt="Svinets"><div><h2>${escapeHTML(STRINGS.loot)}</h2><p>${escapeHTML(result.contextId)} · ${escapeHTML(result.contextName)}</p></div><span class="svinets-rarity-badge">v6</span></header><div class="svinets-card__meta"><span>Бюджет <b>${escapeHTML(formatGp(result.budgetCp))}</b></span><span>Предметы <b>${escapeHTML(formatGp(result.itemsCp))}</b></span><span>Монеты <b>${escapeHTML(formatCoins(result.coinsCp))}</b></span></div>${blocks || empty}${flavors}<footer class="svinets-card__footer">${attunement}${weight}<span>Итого: <b>${escapeHTML(formatGp(result.budgetCp))}</b></span></footer></article>`;
}

function bindChatCard(html) {
  const root = html?.querySelector?.("[data-svinets-card]") ?? html;
  bindAssetFallback(root);
  playResultVfx(root, { options: {}, lines: [] });
  root?.querySelectorAll?.("[data-magic-info]").forEach(button => button.addEventListener("click", () => globalThis.ui?.notifications?.info(`Источник магии: ${button.dataset.magicInfo}`)));
}

async function postLoot(result) {
  if (result.itemsCp + result.coinsCp !== result.budgetCp) { console.error("Svinets | Нарушен бюджетный инвариант перед публикацией.", result); globalThis.ui?.notifications?.error("Ошибка данных: нарушен бюджетный инвариант."); return null; }
  return globalThis.ChatMessage.create({ user: globalThis.game.user.id, speaker: globalThis.ChatMessage.getSpeaker({ alias: "GM" }), content: renderLootChat(result), flags: { [FLAG_SCOPE]: { [FLAG_KEY]: { version: VERSION, options: result.options } } } });
}

export { dnd5eItemType, renderItemDescription, foundryItemData, exportToWorld, renderLootChat, bindChatCard, postLoot };
