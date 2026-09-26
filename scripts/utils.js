import {
  RARITY_RANK,
  RARITY_BY_BONUS,
  MAGIC_CATEGORIES,
  CONSUMABLE_CATEGORIES,
  STACK_MULTIPLIERS
} from "./data.js";

function localize(key, fallback) {
  const value = globalThis.game?.i18n?.localize?.(key);
  return value && value !== key ? value : fallback;
}
  // -------------------- 3. УТИЛИТЫ --------------------

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function normalizeContextId(value) {
    return String(value ?? '').trim().toUpperCase().replace(/[К]/g, 'K');
  }

  function gpToCp(gp) {
    return Math.round(Number(gp) * 100);
  }

  function cpToGp(cp) {
    return Number(cp) / 100;
  }

  function formatNumber(value, digits = 2) {
    return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: digits }).format(value);
  }

  function formatGp(cp) {
    return `${formatNumber(cpToGp(cp))} зм`;
  }

  function formatCoins(cp) {
    const safe = Math.max(0, Math.trunc(cp));
    const gp = Math.floor(safe / 100);
    const sp = Math.floor((safe % 100) / 10);
    const copper = safe % 10;
    const parts = [];
    if (gp) parts.push(`${gp} зм`);
    if (sp) parts.push(`${sp} см`);
    if (copper) parts.push(`${copper} мм`);
    return parts.length ? parts.join(', ') : '0 мм';
  }

  function escapeHTML(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function mulberry32(seed) {
    return function rng() {
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function createRng(seed) {
    return Number.isFinite(seed) ? mulberry32(Math.trunc(seed)) : Math.random;
  }

  function randomInt32() {
    return Math.floor(Math.random() * 2_147_483_647);
  }

  function weightedPick(items, weightFn, rng) {
    if (!items.length) return null;
    const weighted = [];
    let total = 0;
    for (const item of items) {
      const weight = Math.max(0, Number(weightFn(item)) || 0);
      if (weight <= 0) continue;
      total += weight;
      weighted.push({ item, cumulative: total });
    }
    if (!weighted.length || total <= 0) return null;
    const roll = rng() * total;
    for (const row of weighted) {
      if (roll < row.cumulative) return row.item;
    }
    return weighted[weighted.length - 1].item;
  }

  function gaussianFit(ratio, center, sigma = 0.16) {
    if (!Number.isFinite(ratio) || ratio <= 0) return 0.003;
    const z = (ratio - center) / sigma;
    return Math.max(0.004, Math.exp(-0.5 * z * z));
  }

  function uniqueBy(items, keyFn) {
    const map = new Map();
    for (const item of items) {
      const key = keyFn(item);
      if (!map.has(key)) map.set(key, item);
    }
    return [...map.values()];
  }

  function rarityRank(id) {
    return RARITY_RANK[id] ?? -1;
  }

  function normalizeRarity(value) {
    const raw = String(value ?? '').trim().toLowerCase().replace(/[\s_-]+/g, '');
    if (!raw) return null;
    const map = {
      common: 'common', uncommon: 'uncommon', rare: 'rare', veryrare: 'veryRare',
      legendary: 'legendary', artifact: 'artifact'
    };
    return map[raw] ?? null;
  }

  function parseOptionalBoolean(value) {
    const raw = String(value ?? '').trim().toLowerCase();
    if (!raw) return null;
    if (['true', '1', 'yes', 'да'].includes(raw)) return true;
    if (['false', '0', 'no', 'нет'].includes(raw)) return false;
    return undefined;
  }

  function inferScrollRarity(name) {
    const n = String(name).toLowerCase();
    if (/заговор|cantrip/.test(n)) return 'common';
    const match = n.match(/(?:^|\s)([1-9])(?:-го|st|nd|rd|th)?\s*(?:уров|level)/i);
    const level = match ? Number(match[1]) : null;
    if (level == null) return null;
    if (level <= 1) return 'common';
    if (level <= 3) return 'uncommon';
    if (level <= 5) return 'rare';
    if (level <= 8) return 'veryRare';
    return 'legendary';
  }

  function inferRarity({ name, note, category, priceGp, baseFormula, isPriceless }) {
    if (isPriceless || category === 'artifact') return 'artifact';
    if (baseFormula) return RARITY_BY_BONUS[baseFormula.bonus] ?? null;

    const magicLike = MAGIC_CATEGORIES.has(category) || category === 'scroll' || /зелье лечения|potion of healing/i.test(name);
    if (!magicLike) return null;

    const blob = `${name} ${note}`.toLowerCase();
    if (/legendary|легендар/.test(blob)) return 'legendary';
    if (/very\s*rare|очень\s*ред/.test(blob)) return 'veryRare';
    if (/uncommon|необыч/.test(blob)) return 'uncommon';
    if (/(?:^|\W)rare(?:\W|$)|(?:^|\W)редк/.test(blob)) return 'rare';
    if (/common|обычн/.test(blob)) return 'common';

    if (category === 'scroll') return inferScrollRarity(name);
    if (/зелье лечения|potion of healing/i.test(name)) return 'common';

    if (category === 'magic_potion') {
      const map = { 50: 'common', 200: 'uncommon', 2000: 'rare', 20000: 'veryRare', 100000: 'legendary' };
      return map[priceGp] ?? null;
    }
    if (category === 'magic_ammo') {
      const map = { 200: 'uncommon', 2000: 'rare', 20000: 'veryRare' };
      return map[priceGp] ?? null;
    }
    if (MAGIC_CATEGORIES.has(category)) {
      const map = { 100: 'common', 400: 'uncommon', 4000: 'rare', 40000: 'veryRare', 200000: 'legendary' };
      return map[priceGp] ?? null;
    }
    return null;
  }

  function isMagicEntry(entry) {
    return entry.priceType === 'formula' || MAGIC_CATEGORIES.has(entry.category) ||
      entry.category === 'scroll' || /зелье лечения|potion of healing/i.test(entry.name);
  }

  function isConsumableEntry(entry) {
    return CONSUMABLE_CATEGORIES.has(entry.category);
  }

  function budgetTier(budgetGp) {
    if (budgetGp < 100) return 0;
    if (budgetGp < 1000) return 1;
    if (budgetGp < 10000) return 2;
    if (budgetGp < 100000) return 3;
    if (budgetGp < 1000000) return 4;
    return 5;
  }

  function slotCount(budgetGp) {
    return [4, 6, 10, 14, 18, 22][budgetTier(budgetGp)];
  }

  function budgetStackMultiplier(budgetGp, category) {
    const tier = budgetTier(budgetGp);
    const row = STACK_MULTIPLIERS[category];
    return row ? row[tier] : 1;
  }

  function minimumLineCount(maxLines, budgetGp, lootType) {
    if (lootType === 'trade' || maxLines <= 0) return 0;
    const ratio = [0.50, 0.60, 0.70, 0.78, 0.82, 0.90][budgetTier(budgetGp)];
    return Math.min(maxLines, Math.max(1, Math.ceil(maxLines * ratio)));
  }


export { localize, clamp, normalizeContextId, gpToCp, cpToGp, formatNumber, formatGp, formatCoins, escapeHTML, mulberry32, createRng, randomInt32, weightedPick, gaussianFit, uniqueBy, rarityRank, normalizeRarity, parseOptionalBoolean, inferScrollRarity, inferRarity, isMagicEntry, isConsumableEntry, budgetTier, slotCount, budgetStackMultiplier, minimumLineCount };
