import * as DATA from "./data.js";
import * as UTILS from "./utils.js";

const {
  VERSION,
  SETTINGS,
  CONTEXTS,
  LOOT_TYPE_PROFILES,
  LOOT_TYPE_LINE_MULTIPLIER,
  STACK_MULTIPLIERS,
  PARTY_LEVEL_PROFILES,
  PREFERENCE_WEIGHTS,
  LOOT_TYPE_CATEGORY_WEIGHTS,
  RARITY_ORDER,
  RARITY_RANK,
  RARITY_META,
  RARITY_BY_BONUS,
  BASE_CATEGORY_WEIGHT,
  PROFILE_WEIGHTS,
  MAGIC_CATEGORIES,
  ATTUNEMENT_DEFAULT_CATEGORIES,
  CONSUMABLE_CATEGORIES,
  ANIMAL_TRANSPORT_CATEGORIES,
  SINGLE_QTY_CATEGORIES
} = DATA;
const {
  clamp,
  normalizeContextId,
  gpToCp,
  cpToGp,
  formatNumber,
  formatGp,
  formatCoins,
  escapeHTML,
  mulberry32,
  createRng,
  randomInt32,
  weightedPick,
  gaussianFit,
  uniqueBy,
  rarityRank,
  normalizeRarity,
  parseOptionalBoolean,
  inferScrollRarity,
  inferRarity,
  isMagicEntry,
  isConsumableEntry,
  budgetTier,
  slotCount,
  budgetStackMultiplier,
  minimumLineCount
} = UTILS;
  // -------------------- 4. ПАРСИНГ TSV --------------------

  function parseLootTable(tsv) {
    const lines = String(tsv).replace(/\r/g, '').split('\n');
    const headerIndex = lines.findIndex(line => line.startsWith('ID\tНазвание\tЦена_GP\t'));
    if (headerIndex < 0) throw new Error('В мастер-таблице не найден TSV-заголовок.');

    const headers = lines[headerIndex].split('\t');
    const rawEntries = [];

    for (let i = headerIndex + 1; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) continue;

      const cols = line.split('\t');
      while (cols.length < headers.length) cols.push('');
      if (cols.length > headers.length) {
        const tail = cols.splice(headers.length - 1).join(' ');
        cols.push(tail);
      }

      const row = Object.fromEntries(headers.map((h, idx) => [h, cols[idx] ?? '']));
      const id = String(row.ID ?? '').trim();
      const name = String(row['Название'] ?? '').trim();
      const rawPrice = String(row['Цена_GP'] ?? '').trim();
      const rawType = String(row['Тип_строки'] ?? '').trim().toLowerCase();
      const category = String(row['Категория'] ?? '').trim().toLowerCase();
      const maxQty = Number.parseInt(String(row['Макс_кол-во'] ?? '1').trim(), 10);
      const contexts = String(row['Контексты'] ?? '').trim().split(/\s+/).filter(Boolean).map(normalizeContextId);
      const note = String(row['Примечание'] ?? '').trim();

      let priceGp = null;
      let priceType = rawType || 'priced';
      let baseFormula = null;
      let isPriceless = false;
      const formulaMatch = rawPrice.match(/^BASE\+(\d+(?:\.\d+)?)$/i);
      if (formulaMatch) {
        const bonus = Number(formulaMatch[1]);
        const baseCategory = category === 'magic_armor' ? 'armor' : 'weapon';
        priceType = 'formula';
        baseFormula = { baseCategory, bonus };
      } else if (/^NULL$/i.test(rawPrice)) {
        priceType = 'flavor';
      } else if (/^PRICELESS$/i.test(rawPrice)) {
        priceType = 'flavor';
        isPriceless = true;
      } else {
        priceGp = Number(rawPrice);
      }

      const explicitAttunement = parseOptionalBoolean(row.Attunement);
      const attunement = explicitAttunement == null ? ATTUNEMENT_DEFAULT_CATEGORIES.has(category) : explicitAttunement;
      const minLevelRaw = String(row.MinLevel ?? '').trim();
      const maxLevelRaw = String(row.MaxLevel ?? '').trim();
      const minLevel = minLevelRaw ? Number.parseInt(minLevelRaw, 10) : 1;
      const maxLevel = maxLevelRaw ? Number.parseInt(maxLevelRaw, 10) : 20;
      const explicitRarity = normalizeRarity(row.Rarity);
      const weightRaw = String(row.Weight ?? '').trim();
      const weight = weightRaw === '' ? null : Number(weightRaw);
      const tags = String(row.Tags ?? '').split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
      const rarity = explicitRarity ?? inferRarity({ name, note, category, priceGp, baseFormula, isPriceless });

      rawEntries.push({
        id, name, rawPrice, priceGp, priceType, baseFormula, contexts, category,
        maxQty, priceSource: String(row['Основание_цены'] ?? '').trim(), note,
        isPriceless, attunement, minLevel, maxLevel, rarity, weight, tags,
        rawAttunement: row.Attunement, rawRarity: row.Rarity, sourceIds: [id]
      });
    }

    // Историческая v3 была собрана из двух таблиц, поэтому часть PHB-позиций
    // присутствует дважды под разными ID. v4 сохраняет 1329 исходных строк,
    // но в рабочем пуле объединяет одинаковые ценовые позиции в одну запись.
    const merged = [];
    const index = new Map();
    for (const entry of rawEntries) {
      if (entry.priceType === 'flavor') {
        merged.push(entry);
        continue;
      }
      const key = `${entry.name.toLowerCase()}|${entry.rawPrice}`;
      const prior = index.get(key);
      if (!prior) {
        index.set(key, entry);
        merged.push(entry);
        continue;
      }
      prior.contexts = [...new Set([...prior.contexts, ...entry.contexts])];
      prior.tags = [...new Set([...prior.tags, ...entry.tags])];
      prior.sourceIds.push(entry.id);
      prior.maxQty = Math.max(prior.maxQty, entry.maxQty);
      if ((prior.weight == null || prior.weight === 0) && entry.weight != null) prior.weight = entry.weight;
      prior.attunement = prior.attunement || entry.attunement;
      prior.minLevel = Math.min(prior.minLevel, entry.minLevel);
      prior.maxLevel = Math.max(prior.maxLevel, entry.maxLevel);
    }

    Object.defineProperties(merged, {
      rawRowCount: { value: rawEntries.length, enumerable: false },
      rawEntries: { value: rawEntries, enumerable: false },
      mergedCount: { value: rawEntries.length - merged.length, enumerable: false }
    });
    return merged;
  }

  // -------------------- 5. ВАЛИДАЦИЯ --------------------

  function validateData(entries) {
    const errors = [];
    const ids = new Set();
    const logical = new Set();
    const rawEntries = entries.rawEntries ?? entries;
    const trackedWeightCategories = new Set(['weapon','armor','barding','focus','gear','container','tool','instrument','ammo','consumable']);
    const badGrammar = /^(Обычный|Необычный|Редкий|Очень редкий|Легендарный) магическое\b/i;

    if (entries.rawRowCount !== 1329) errors.push(`Ожидалось 1329 исходных строк, получено ${entries.rawRowCount ?? rawEntries.length}.`);

    for (const [id, ctx] of Object.entries(CONTEXTS)) {
      if (!Number.isFinite(ctx.magicAffinity) || ctx.magicAffinity < 0 || ctx.magicAffinity > 3) errors.push(`Контекст ${id}: magicAffinity должен быть от 0 до 3.`);
    }

    for (const entry of rawEntries) {
      if (!/^L\d{4}$/.test(entry.id)) errors.push(`Некорректный ID: ${entry.id || '(пусто)'}.`);
      if (ids.has(entry.id)) errors.push(`Дубликат ID: ${entry.id}.`);
      ids.add(entry.id);
      if (!entry.name) errors.push(`${entry.id}: пустое название.`);
      if (badGrammar.test(entry.name)) errors.push(`${entry.id}: грамматическая ошибка в названии «${entry.name}».`);
      if (!Number.isInteger(entry.maxQty) || entry.maxQty < 1) errors.push(`${entry.id}: Макс_кол-во должно быть ≥ 1.`);
      for (const ctx of entry.contexts) if (!CONTEXTS[ctx]) errors.push(`${entry.id}: неизвестный контекст ${ctx}.`);
      if (entry.priceType === 'priced' && (!Number.isFinite(entry.priceGp) || entry.priceGp <= 0)) errors.push(`${entry.id}: priced требует цену > 0.`);
      if (entry.priceType === 'formula' && (!entry.baseFormula || !['weapon','armor'].includes(entry.baseFormula.baseCategory))) errors.push(`${entry.id}: некорректная BASE-формула.`);
      if (![true,false].includes(entry.attunement)) errors.push(`${entry.id}: Attunement должен быть boolean.`);
      if (!Number.isInteger(entry.minLevel) || !Number.isInteger(entry.maxLevel) || entry.minLevel > entry.maxLevel) errors.push(`${entry.id}: MinLevel/MaxLevel некорректны.`);
      if (entry.rarity && ![...RARITY_ORDER,'artifact'].includes(entry.rarity)) errors.push(`${entry.id}: неизвестная редкость ${entry.rarity}.`);
      if (entry.weight != null && (!Number.isFinite(entry.weight) || entry.weight < 0)) errors.push(`${entry.id}: Weight должен быть ≥ 0.`);
      if (trackedWeightCategories.has(entry.category)) {
        if (entry.weight == null) errors.push(`${entry.id}: для категории ${entry.category} не заполнен Weight.`);
        if (entry.weight === 0 && !entry.tags.includes('official-weightless')) errors.push(`${entry.id}: Weight = 0 без отметки official-weightless.`);
      }
    }

    for (const entry of entries) {
      if (entry.priceType === 'flavor') continue;
      const key = `${entry.name.toLowerCase()}|${entry.rawPrice}`;
      if (logical.has(key)) errors.push(`Дубликат рабочей позиции имя+цена: ${entry.name} / ${entry.rawPrice}.`);
      logical.add(key);
    }

    if (errors.length) {
      console.error('Svinets | Ошибки данных:', errors);
      throw new Error(`Мастер-таблица не прошла валидацию: ${errors.slice(0,6).join(' | ')}`);
    }
    return { rawRows: entries.rawRowCount, activeEntries: entries.length, merged: entries.mergedCount ?? 0 };
  }

  // -------------------- 6. СЕМЕЙСТВА И ФИЛЬТРЫ --------------------

  function variantFamily(entryOrName) {
    const n = String(typeof entryOrName === 'string' ? entryOrName : entryOrName?.name ?? '').toLowerCase();
    if (/книг|журнал|трактат|устав|хроник|учебник/.test(n)) return 'family:book';
    if (/карта/.test(n)) return 'family:map';
    if (/дух|perfume/.test(n)) return 'family:perfume';
    if (/одежд|костюм|наряд/.test(n)) return 'family:clothes';
    if (/бутыл/.test(n)) return 'family:bottle';
    if (/флакон|vial/.test(n)) return 'family:vial';
    if (/кошел|подсум|pouch/.test(n)) return 'family:pouch';
    if (/сундук|chest/.test(n)) return 'family:chest';
    if (/цеп/.test(n)) return 'family:chain';
    if (/замок|lock/.test(n)) return 'family:lock';
    if (/зеркал|mirror/.test(n)) return 'family:mirror';
    if (/чернил|черниль/.test(n)) return 'family:ink';
    if (/бумаг|пергамент|лист/.test(n)) return 'family:paper';
    if (/ламп|фонар/.test(n)) return 'family:lamp';
    if (/бочк|кадк/.test(n)) return 'family:barrel';
    if (/одеял/.test(n)) return 'family:blanket';
    if (/верёв|верев|канат/.test(n)) return 'family:rope';
    return `name:${n}`;
  }

  function levelAllows(entry, options) {
    const profile = PARTY_LEVEL_PROFILES[options.partyLevel] ?? PARTY_LEVEL_PROFILES.any;
    return entry.minLevel <= profile.max && entry.maxLevel >= profile.min;
  }

  function categoryAllowed(entry, options) {
    if (!options.includeAnimals && ANIMAL_TRANSPORT_CATEGORIES.has(entry.category)) return false;
    if (options.includeAnimals && !options.includeBarding && entry.category === 'barding') return false;
    return true;
  }

  function contextAllows(entry, contextId) {
    return entry.contexts.includes(contextId);
  }

  function effectiveRarityCap(options) {
    const party = PARTY_LEVEL_PROFILES[options.partyLevel] ?? PARTY_LEVEL_PROFILES.any;
    let cap = party.rarityCap;
    if (options.maxRarity && options.maxRarity !== 'any') {
      if (rarityRank(options.maxRarity) < rarityRank(cap)) cap = options.maxRarity;
    }
    if (!options.allowLegendary && cap === 'legendary') cap = 'veryRare';
    return cap;
  }

  function rarityAllowed(entry, options) {
    if (!entry.rarity || entry.rarity === 'artifact') return entry.rarity !== 'artifact';
    return rarityRank(entry.rarity) <= rarityRank(effectiveRarityCap(options));
  }

  // -------------------- 7. ВЕСА ВЫБОРА --------------------

  function contextCategoryWeight(entry, contextId) {
    const base = BASE_CATEGORY_WEIGHT[entry.category] ?? 1;
    const profileName = CONTEXTS[contextId]?.profile ?? 'universal';
    const profile = PROFILE_WEIGHTS[profileName] ?? {};
    return base * (profile[entry.category] ?? 1);
  }

  function preferenceWeight(entry, options) {
    const profile = PREFERENCE_WEIGHTS[options.preference] ?? PREFERENCE_WEIGHTS.balanced;
    return profile[entry.category] ?? 1;
  }

  function lootTypeCategoryWeight(entry, options) {
    const profile = LOOT_TYPE_CATEGORY_WEIGHTS[options.lootType] ?? {};
    return profile[entry.category] ?? 1;
  }

  function consumableBalanceWeight(entry, options) {
    const slider = clamp(Number(options.consumablesSlider) || 50, 0, 100) / 100;
    const isConsumable = isConsumableEntry(entry);
    const factor = isConsumable
      ? 0.25 + 1.5 * slider
      : 0.25 + 1.5 * (1 - slider);
    const partyFactor = isConsumable ? clamp(0.8 + options.partySize * 0.05, 0.85, 1.3) : 1;
    return factor * partyFactor;
  }

  function combinedCategoryWeight(entry, options) {
    return contextCategoryWeight(entry, options.contextId) *
      preferenceWeight(entry, options) *
      lootTypeCategoryWeight(entry, options) *
      consumableBalanceWeight(entry, options);
  }

  // -------------------- 8. МАГИЯ --------------------

  function magicChance(contextId, budgetGp, lootType) {
    const affinity = CONTEXTS[contextId]?.magicAffinity ?? 0.5;
    const base = 0.03 + Math.log10(budgetGp + 1) * 0.055;
    const raw = clamp(base * affinity, 0, 0.58);
    const modifier = LOOT_TYPE_PROFILES[lootType]?.magicModifier ?? 1;
    return clamp(raw * modifier, 0, 0.92);
  }

  function formulaDisplayName(formulaEntry, baseEntry) {
    const rarity = formulaEntry.rarity;
    const meta = RARITY_META[rarity] ?? RARITY_META.common;
    if (formulaEntry.baseFormula.baseCategory === 'armor') {
      return `${meta.masculine} магический доспех: ${baseEntry.name}`;
    }
    return `${meta.neuter} магическое оружие: ${baseEntry.name}`;
  }

  function buildMagicCandidates(entries, options, budgetCp, spendableCp, state) {
    const maxMagicCp = Math.min(spendableCp, Math.floor(budgetCp * 0.70));
    if (maxMagicCp <= 0) return [];

    const contextEntries = entries.filter(entry =>
      contextAllows(entry, options.contextId) &&
      levelAllows(entry, options) &&
      categoryAllowed(entry, options)
    );

    const candidates = [];
    const formulaEntries = contextEntries.filter(entry => entry.priceType === 'formula' && rarityAllowed(entry, options));
    const baseEntries = uniqueBy(
      contextEntries.filter(entry => entry.priceType === 'priced' && !isMagicEntry(entry) && ['weapon', 'armor'].includes(entry.category)),
      entry => `${entry.category}|${entry.name.toLowerCase()}|${entry.priceGp}`
    );

    for (const formula of formulaEntries) {
      const baseCategory = formula.baseFormula.baseCategory;
      const bases = baseEntries.filter(base =>
        base.category === baseCategory && gpToCp(base.priceGp) <= Math.floor(budgetCp * 0.30)
      );
      for (const base of bases) {
        const baseCp = gpToCp(base.priceGp);
        const bonusCp = gpToCp(formula.baseFormula.bonus);
        const priceCp = baseCp + bonusCp;
        if (priceCp > maxMagicCp) continue;
        const name = formulaDisplayName(formula, base);
        const family = variantFamily(base);
        if (options.noDuplicates && state.usedNames.has(name.toLowerCase())) continue;
        if (options.noFamilies && state.usedFamilies.has(family)) continue;
        if (options.useAttunement && formula.attunement && state.attunementCount >= state.attunementLimit) continue;
        candidates.push({
          type: 'formula', entry: formula, base, sourceId: formula.id, baseSourceId: base.id,
          name, priceCp, category: formula.category, rarity: formula.rarity,
          attunement: formula.attunement, weight: base.weight || 0, tags: [...new Set([...formula.tags, ...base.tags])],
          family, formula: { baseCp, bonusCp, totalCp: priceCp }
        });
      }
    }

    for (const entry of contextEntries) {
      if (entry.priceType !== 'priced' || !isMagicEntry(entry)) continue;
      if (!rarityAllowed(entry, options)) continue;
      const priceCp = gpToCp(entry.priceGp);
      if (priceCp <= 0 || priceCp > maxMagicCp) continue;
      const family = variantFamily(entry);
      if (options.noDuplicates && state.usedNames.has(entry.name.toLowerCase())) continue;
      if (options.noFamilies && state.usedFamilies.has(family)) continue;
      if (options.useAttunement && entry.attunement && state.attunementCount >= state.attunementLimit) continue;
      candidates.push({
        type: 'pricedMagic', entry, sourceId: entry.id, baseSourceId: null,
        name: entry.name, priceCp, category: entry.category, rarity: entry.rarity,
        attunement: entry.attunement, weight: entry.weight || 0, tags: entry.tags,
        family, formula: null
      });
    }

    return uniqueBy(candidates, c => `${c.name.toLowerCase()}|${c.priceCp}|${c.rarity ?? ''}`);
  }

  function chooseMagicRarity(candidates, options, rng) {
    const available = new Set(candidates.map(c => c.rarity).filter(r => RARITY_RANK[r] != null));
    if (!available.size) return null;
    const weights = { ...(PARTY_LEVEL_PROFILES[options.partyLevel]?.rarityWeights ?? PARTY_LEVEL_PROFILES.any.rarityWeights) };
    if (!options.allowLegendary) {
      weights.veryRare = (weights.veryRare ?? 0) + (weights.legendary ?? 0);
      weights.legendary = 0;
    }
    const rarities = [...available];
    return weightedPick(rarities, rarity => weights[rarity] ?? 1, rng);
  }

  function chooseMagicItem(entries, options, budgetCp, spendableCp, desiredRemainingCp, state, rng) {
    let candidates = buildMagicCandidates(entries, options, budgetCp, spendableCp, state);
    if (!candidates.length) return null;
    const chosenRarity = chooseMagicRarity(candidates, options, rng);
    if (chosenRarity) candidates = candidates.filter(c => c.rarity === chosenRarity);

    return weightedPick(candidates, candidate => {
      const denominator = Math.max(1, Math.min(spendableCp, Math.max(desiredRemainingCp, Math.floor(budgetCp * 0.2))));
      const ratio = candidate.priceCp / denominator;
      const fit = gaussianFit(ratio, 0.45, 0.22);
      const proxy = { category: candidate.category };
      return fit * combinedCategoryWeight(proxy, options);
    }, rng);
  }

  // -------------------- 9. ОБЫЧНЫЕ ПРЕДМЕТЫ --------------------

  function totalUnitLimit(budgetGp, lootType) {
    const base = [20, 40, 80, 150, 250, 400][budgetTier(budgetGp)];
    if (lootType === 'merchant') return base * 2;
    if (lootType === 'trade') return Math.ceil(base * 0.3);
    if (lootType === 'individual' || lootType === 'trophy') return Math.ceil(base * 0.6);
    return base;
  }

  function merchantStockCap(entry) {
    const caps = {
      consumable: 50, ammo: 40, food: 60, supply: 40, trade_good: 40,
      gear: 50, container: 30, variant: 12, leisure: 16, valuable: 10,
      gemstone: 10, art_object: 6, weapon: 8, armor: 6, tool: 8, instrument: 5,
      focus: 5, animal: 4, tack: 8, barding: 4, vehicle: 3, large_vehicle: 1
    };
    return Math.max(entry.maxQty, caps[entry.category] ?? 8);
  }

  function maxQuantityFor(entry, spendableCp, totalUnits, options, budgetGp = options.budgetGp) {
    const unitCp = gpToCp(entry.priceGp);
    if (unitCp <= 0) return 0;
    const affordable = Math.floor(spendableCp / unitCp);
    if (affordable < 1) return 0;

    let categoryCap;
    if (options.lootType === 'merchant') {
      categoryCap = merchantStockCap(entry);
    } else if (SINGLE_QTY_CATEGORIES.has(entry.category)) {
      categoryCap = 1;
    } else {
      const stackMultiplier = budgetStackMultiplier(budgetGp, entry.category);
      categoryCap = entry.maxQty * stackMultiplier;
    }

    return Math.max(0, Math.min(
      categoryCap,
      affordable,
      totalUnitLimit(budgetGp, options.lootType) - totalUnits
    ));
  }

  function chooseQuantity(entry, spendableCp, totalUnits, options, budgetGp, rng) {
    const cap = maxQuantityFor(entry, spendableCp, totalUnits, options, budgetGp);
    if (cap <= 1) return cap;

    if (options.lootType === 'merchant') {
      const bulky = ['weapon', 'armor', 'tool', 'instrument', 'focus', 'animal', 'tack', 'barding', 'vehicle', 'large_vehicle', 'valuable', 'gemstone', 'art_object'].includes(entry.category);
      const low = bulky ? 0.30 : 0.48;
      const high = bulky ? 0.72 : 0.88;
      return clamp(Math.round(cap * (low + rng() * (high - low))), 1, cap);
    }

    const tier = budgetTier(budgetGp);
    const stackable = Boolean(STACK_MULTIPLIERS[entry.category]);
    if (stackable) {
      const ranges = [[1, 2], [1, 3], [1, 4], [3, 7], [5, 14], [4, 16]];
      let [low, high] = ranges[tier];
      if (isConsumableEntry(entry)) {
        const partyBoost = Math.min(3, Math.floor(Math.max(0, options.partySize - 1) / 2));
        high += partyBoost;
      }
      low = Math.min(low, cap);
      high = Math.min(Math.max(low, high), cap);
      return clamp(low + Math.floor(rng() * (high - low + 1)), 1, cap);
    }

    const consumableBoost = isConsumableEntry(entry) ? clamp((options.partySize - 1) * 0.035, 0, 0.25) : 0;
    const roll = rng();
    if (roll < 0.62 - consumableBoost) return 1;
    if (roll < 0.90 - consumableBoost / 2) return Math.min(2, cap);
    return Math.min(3, cap);
  }

  function minimumUnitTarget(budgetGp, lootType) {
    if (!['chest', 'hoard', 'merchant'].includes(lootType)) return 0;
    return [0, 0, 0, 40, 80, 150][budgetTier(budgetGp)];
  }

  function expandExistingStacks(entries, options, state, budgetCp, targetItemCp, maxItemCp, unitLimit) {
    const desiredUnits = Math.min(unitLimit, minimumUnitTarget(options.budgetGp, options.lootType));
    const targetCp = Math.min(maxItemCp, Math.max(targetItemCp, state.itemsCp));
    if (state.itemsCp >= targetCp && state.totalUnits >= desiredUnits) return;

    const sourceById = new Map(entries.map(entry => [entry.id, entry]));
    const expandable = state.lines
      .map(line => ({ line, entry: sourceById.get(line.sourceId) }))
      .filter(({ line, entry }) => entry?.priceType === 'priced' && !SINGLE_QTY_CATEGORIES.has(entry.category) && line.unitCp > 0)
      .sort((a, b) => a.line.unitCp - b.line.unitCp);

    let guard = 0;
    while ((state.itemsCp < targetCp || state.totalUnits < desiredUnits) && state.totalUnits < unitLimit && guard++ < 5000) {
      let changed = false;
      for (const { line, entry } of expandable) {
        if (state.totalUnits >= unitLimit) break;
        const categoryCap = options.lootType === 'merchant'
          ? merchantStockCap(entry)
          : entry.maxQty * budgetStackMultiplier(options.budgetGp, entry.category);
        const roomByLine = Math.max(0, categoryCap - line.qty);
        if (roomByLine <= 0) continue;
        const roomByUnits = unitLimit - state.totalUnits;
        const roomByBudget = Math.floor(Math.max(0, maxItemCp - state.itemsCp) / line.unitCp);
        if (roomByUnits <= 0 || roomByBudget <= 0) continue;

        const needUnits = Math.max(0, desiredUnits - state.totalUnits);
        const needCp = Math.max(0, targetCp - state.itemsCp);
        const needByValue = needCp > 0 ? Math.ceil(needCp / line.unitCp) : 0;
        let addQty = Math.max(needUnits > 0 ? 1 : 0, needByValue > 0 ? 1 : 0);
        addQty = Math.min(addQty, roomByLine, roomByUnits, roomByBudget);
        if (addQty <= 0) continue;

        line.qty += addQty;
        line.totalCp += line.unitCp * addQty;
        state.itemsCp += line.unitCp * addQty;
        state.totalUnits += addQty;
        if (line.weight) state.totalWeight += line.weight * addQty;
        if (line.attunement) state.attunementCount += addQty;
        changed = true;

        if (state.itemsCp >= targetCp && state.totalUnits >= desiredUnits) break;
      }
      if (!changed) break;
    }
  }

  function rebalanceUnits(entries, options, state, maxItemCp, unitLimit) {
    const desiredUnits = Math.min(unitLimit, minimumUnitTarget(options.budgetGp, options.lootType));
    if (desiredUnits <= 0 || state.totalUnits >= desiredUnits) return;

    const sourceById = new Map(entries.map(entry => [entry.id, entry]));
    const roomFor = (line, entry) => {
      if (!entry || entry.priceType !== 'priced' || SINGLE_QTY_CATEGORIES.has(entry.category)) return 0;
      const cap = options.lootType === 'merchant'
        ? merchantStockCap(entry)
        : entry.maxQty * budgetStackMultiplier(options.budgetGp, entry.category);
      return Math.max(0, cap - line.qty);
    };

    let guard = 0;
    while (state.totalUnits < desiredUnits && guard++ < 2000) {
      const receivers = state.lines
        .map(line => ({ line, entry: sourceById.get(line.sourceId) }))
        .filter(({ line, entry }) => roomFor(line, entry) > 0 && line.unitCp > 0)
        .sort((a, b) => a.line.unitCp - b.line.unitCp);
      if (!receivers.length) break;

      const receiver = receivers[0];
      let budgetRoom = Math.max(0, maxItemCp - state.itemsCp);
      if (budgetRoom < receiver.line.unitCp) {
        const donor = state.lines
          .filter(line => line.qty > 1 && line.unitCp > receiver.line.unitCp)
          .sort((a, b) => b.unitCp - a.unitCp)[0];
        if (!donor) break;
        donor.qty -= 1;
        donor.totalCp -= donor.unitCp;
        state.itemsCp -= donor.unitCp;
        state.totalUnits -= 1;
        if (donor.weight) state.totalWeight -= donor.weight;
        if (donor.attunement) state.attunementCount -= 1;
        budgetRoom = Math.max(0, maxItemCp - state.itemsCp);
      }

      const need = desiredUnits - state.totalUnits;
      const addQty = Math.min(
        need,
        roomFor(receiver.line, receiver.entry),
        unitLimit - state.totalUnits,
        Math.floor(budgetRoom / receiver.line.unitCp)
      );
      if (addQty <= 0) break;
      receiver.line.qty += addQty;
      receiver.line.totalCp += receiver.line.unitCp * addQty;
      state.itemsCp += receiver.line.unitCp * addQty;
      state.totalUnits += addQty;
      if (receiver.line.weight) state.totalWeight += receiver.line.weight * addQty;
      if (receiver.line.attunement) state.attunementCount += addQty;
    }
  }

  function candidateAllowed(entry, options, state, spendableCp, priceFloorCp = 0) {
    if (entry.priceType !== 'priced') return false;
    if (isMagicEntry(entry)) return false;
    if (!contextAllows(entry, options.contextId)) return false;
    if (!levelAllows(entry, options)) return false;
    if (!categoryAllowed(entry, options)) return false;
    const priceCp = gpToCp(entry.priceGp);
    if (priceCp <= 0 || priceCp > spendableCp || priceCp < priceFloorCp) return false;
    const nameKey = entry.name.toLowerCase();
    const family = variantFamily(entry);
    if (options.noDuplicates && state.usedNames.has(nameKey)) return false;
    if (options.noFamilies && state.usedFamilies.has(family)) return false;
    return true;
  }

  function normalItemWeight(entry, options, desiredCp, lineIndex) {
    const priceCp = gpToCp(entry.priceGp);
    const ratio = priceCp / Math.max(1, desiredCp);
    const center = lineIndex === 0 ? 0.30 : lineIndex <= 2 ? 0.20 : 0.11;
    const sigma = lineIndex === 0 ? 0.17 : 0.14;
    return combinedCategoryWeight(entry, options) * gaussianFit(ratio, center, sigma);
  }

  function chooseNormalItem(entries, options, state, spendableCp, desiredCp, lineIndex, rng, relaxFloor = false, requiredUnitFloorCp = 0) {
    const floorRatio = lineIndex <= 1 ? 0.07 : lineIndex <= 3 ? 0.025 : 0.005;
    const softFloorCp = relaxFloor ? 0 : Math.floor(Math.max(0, desiredCp) * floorRatio);
    const priceFloorCp = Math.max(softFloorCp, requiredUnitFloorCp);
    let candidates = entries.filter(entry => candidateAllowed(entry, options, state, spendableCp, priceFloorCp));
    if (!candidates.length && !relaxFloor && requiredUnitFloorCp <= 0) {
      candidates = entries.filter(entry => candidateAllowed(entry, options, state, spendableCp, 0));
    }
    candidates = uniqueBy(candidates, entry => `${entry.name.toLowerCase()}|${entry.priceGp}|${entry.category}`);
    if (options.lootType === 'merchant') {
      return weightedPick(candidates, entry => {
        const unitCp = gpToCp(entry.priceGp);
        const cap = maxQuantityFor(entry, spendableCp, state.totalUnits, options, options.budgetGp);
        const potentialLineCp = unitCp * Math.max(1, cap);
        const ratio = potentialLineCp / Math.max(1, desiredCp);
        // Для склада оцениваем не одну штуку, а реалистичную товарную партию.
        // Это заставляет крупный бюджет заполняться дорогими партиями, а не десятками свечей.
        const fit = gaussianFit(ratio, 0.42, 0.28);
        const unitValueBoost = 0.65 + Math.min(2.5, Math.log10(entry.priceGp + 1) * 0.9);
        const capacityBoost = Math.pow(clamp(ratio, 0.02, 1.5), 2);
        return combinedCategoryWeight(entry, options) * fit * unitValueBoost * capacityBoost;
      }, rng);
    }
    return weightedPick(candidates, entry => normalItemWeight(entry, options, Math.max(1, desiredCp), lineIndex), rng);
  }

  function chooseRepairItem(entries, options, state, spendableCp, deficitCp, rng) {
    let candidates = entries.filter(entry => candidateAllowed(entry, options, state, spendableCp, 0));
    candidates = uniqueBy(candidates, entry => `${entry.name.toLowerCase()}|${entry.priceGp}|${entry.category}`);
    return weightedPick(candidates, entry => {
      const priceCp = gpToCp(entry.priceGp);
      const fit = gaussianFit(priceCp / Math.max(1, deficitCp), 0.75, 0.35);
      return combinedCategoryWeight(entry, options) * fit;
    }, rng);
  }

  function addLineState(state, line) {
    state.lines.push(line);
    state.itemsCp += line.totalCp;
    state.totalUnits += line.qty;
    if (line.attunement) state.attunementCount += line.qty;
    if (line.weight) state.totalWeight += line.weight * line.qty;
    state.usedNames.add(line.name.toLowerCase());
    state.usedFamilies.add(line.family ?? variantFamily(line.name));
  }

  // -------------------- 10. FLAVOR --------------------

  function chooseFlavor(entries, options, rng) {
    const ordinary = entries.filter(entry =>
      entry.priceType === 'flavor' && !entry.isPriceless &&
      contextAllows(entry, options.contextId) && levelAllows(entry, options) && categoryAllowed(entry, options)
    );
    if (!ordinary.length) return null;
    return ordinary[Math.floor(rng() * ordinary.length)];
  }

  // -------------------- 11. ЯДРО ГЕНЕРАЦИИ --------------------

  function sanitizeOptions(raw, { notify = false } = {}) {
    const options = { ...raw };
    options.contextId = CONTEXTS[normalizeContextId(options.contextId)] ? normalizeContextId(options.contextId) : '36K';

    let budgetGp = Number(options.budgetGp);
    if (!Number.isFinite(budgetGp) || budgetGp <= 0) throw new Error('Общая стоимость должна быть больше 0 зм.');
    const originalBudget = budgetGp;
    budgetGp = clamp(budgetGp, SETTINGS.minBudgetGp, SETTINGS.maxBudgetGp);
    if (notify && originalBudget !== budgetGp) ui.notifications.warn(`Бюджет ограничен до ${formatNumber(budgetGp)} зм.`);
    options.budgetGp = budgetGp;

    if (!LOOT_TYPE_PROFILES[options.lootType]) options.lootType = 'chest';
    if (!PARTY_LEVEL_PROFILES[options.partyLevel]) options.partyLevel = 'any';
    options.partySize = clamp(Math.trunc(Number(options.partySize) || 4), 1, 10);
    options.seed = String(options.seed ?? '').trim() === '' ? null : Number(options.seed);
    if (!Number.isFinite(options.seed)) options.seed = null;

    options.magicAllowed = options.magicAllowed !== false;
    options.maxRarity = ['common','uncommon','rare','veryRare','legendary','any'].includes(options.maxRarity) ? options.maxRarity : 'any';
    options.allowLegendary = Boolean(options.allowLegendary);
    options.maxMagicItems = clamp(Math.trunc(Number(options.maxMagicItems) || 0), 0, SETTINGS.maxMagicItems);

    if (!PREFERENCE_WEIGHTS[options.preference]) options.preference = 'balanced';
    options.consumablesSlider = clamp(Number(options.consumablesSlider) || 50, 0, 100);
    options.includeFlavor = options.includeFlavor !== false;
    options.includeAnimals = options.includeAnimals !== false;
    options.includeBarding = options.includeBarding !== false;
    options.useAttunement = options.useAttunement !== false;
    options.useWeightLimit = Boolean(options.useWeightLimit);
    options.maxWeight = Math.max(0, Number(options.maxWeight) || 300);
    options.noDuplicates = options.noDuplicates !== false;
    options.noFamilies = options.noFamilies !== false;
    options.maxLines = clamp(Math.trunc(Number(options.maxLines) || 0), 0, SETTINGS.hardMaxLines);

    options.autoExport = Boolean(options.autoExport);
    options.exportTarget = options.exportTarget === 'world' ? 'world' : 'chat';
    return options;
  }

  function generateLoot(entries, rawOptions) {
    const options = sanitizeOptions(rawOptions);
    const rng = createRng(options.seed);
    const budgetCp = gpToCp(options.budgetGp);
    const lootProfile = LOOT_TYPE_PROFILES[options.lootType];
    const partyProfile = PARTY_LEVEL_PROFILES[options.partyLevel];

    const coinShareTarget = lootProfile.coinShare[0] + rng() * (lootProfile.coinShare[1] - lootProfile.coinShare[0]);
    const targetItemCp = Math.floor(budgetCp * (1 - coinShareTarget));
    const minItemCp = Math.floor(budgetCp * (1 - lootProfile.coinShare[1]));
    const maxItemCp = Math.floor(budgetCp * (1 - lootProfile.coinShare[0]));

    const lineMultiplier = LOOT_TYPE_LINE_MULTIPLIER[options.lootType] ?? 1;
    const autoMaxLines = Math.min(SETTINGS.hardMaxLines, Math.max(0, Math.round(slotCount(options.budgetGp) * lineMultiplier)));
    const maxLines = Math.max(0, Math.min(autoMaxLines, options.maxLines > 0 ? options.maxLines : autoMaxLines));
    const minLines = minimumLineCount(maxLines, options.budgetGp, options.lootType);
    const attunementLimit = options.partySize * 3;

    const state = {
      lines: [], itemsCp: 0, totalUnits: 0, usedNames: new Set(), usedFamilies: new Set(),
      attunementCount: 0, attunementLimit, totalWeight: 0, legendaryCount: 0
    };

    const magicCap = options.magicAllowed
      ? Math.min(lootProfile.maxMagic, options.maxMagicItems, partyProfile.maxMagic, maxLines)
      : 0;
    const initialSpendableCp = Math.max(0, maxItemCp - state.itemsCp);
    const initialMagicCandidates = magicCap > 0
      ? buildMagicCandidates(entries, options, budgetCp, initialSpendableCp, state)
      : [];
    const chance = initialMagicCandidates.length
      ? magicChance(options.contextId, options.budgetGp, options.lootType)
      : 0;

    for (let i = 0; i < magicCap; i++) {
      const attemptChance = clamp(chance * (i === 0 ? 1 : Math.pow(0.67, i)), 0, 0.95);
      if (rng() >= attemptChance) continue;
      const spendableCp = Math.max(0, maxItemCp - state.itemsCp);
      if (spendableCp <= 0) break;
      const desiredRemainingCp = Math.max(0, targetItemCp - state.itemsCp);
      const magic = chooseMagicItem(entries, options, budgetCp, spendableCp, desiredRemainingCp, state, rng);
      if (!magic) continue;
      if (magic.rarity === 'legendary' && state.legendaryCount >= 1) continue;

      const line = {
        name: magic.name, qty: 1, unitCp: magic.priceCp, totalCp: magic.priceCp,
        category: magic.category, magic: true, rarity: magic.rarity, attunement: magic.attunement,
        weight: magic.weight || 0, tags: magic.tags ?? [], formula: magic.formula,
        sourceId: magic.sourceId, baseSourceId: magic.baseSourceId, family: magic.family
      };
      addLineState(state, line);
      if (magic.rarity === 'legendary') state.legendaryCount += 1;
    }

    const unitLimit = totalUnitLimit(options.budgetGp, options.lootType);

    while (state.lines.length < maxLines && state.totalUnits < unitLimit && state.itemsCp < maxItemCp) {
      const desiredRemainingCp = Math.max(0, targetItemCp - state.itemsCp);
      const mustFillLines = state.lines.length < minLines;
      if (!mustFillLines && desiredRemainingCp <= 0) break;
      if (!mustFillLines && budgetCp >= 10000 && desiredRemainingCp < budgetCp * 0.012) break;
      if (!mustFillLines && budgetCp >= 100000 && state.lines.length >= 5 && desiredRemainingCp < budgetCp * 0.035) break;

      let spendableCp = Math.max(0, maxItemCp - state.itemsCp);
      if (spendableCp <= 0) break;
      if (mustFillLines) {
        const remainingRequiredLines = Math.max(1, minLines - state.lines.length);
        const fairLineBudgetCp = Math.max(1, Math.floor(spendableCp / remainingRequiredLines));
        spendableCp = Math.min(spendableCp, Math.max(fairLineBudgetCp, Math.floor(fairLineBudgetCp * 2)));
      }
      const remainingSlots = Math.max(1, maxLines - state.lines.length);
      const mandatoryDeficitCp = Math.max(0, minItemCp - state.itemsCp);
      // Для обычной находки резервируем достаточную цену на оставшиеся строки.
      // Для merchant стоимость набирается количеством в товарной партии, поэтому unit-floor не нужен.
      const requiredUnitFloorCp = options.lootType === 'merchant' ? 0 : Math.ceil(mandatoryDeficitCp / remainingSlots);
      const entry = chooseNormalItem(entries, options, state, spendableCp, Math.max(1, desiredRemainingCp), state.lines.length, rng, mustFillLines, requiredUnitFloorCp);
      if (!entry) break;
      let qty = chooseQuantity(entry, spendableCp, state.totalUnits, options, options.budgetGp, rng);
      if (qty < 1) break;
      const unitCp = gpToCp(entry.priceGp);
      qty = Math.min(qty, Math.floor(spendableCp / unitCp));
      if (qty < 1) break;

      addLineState(state, {
        name: entry.name, qty, unitCp, totalCp: unitCp * qty, category: entry.category,
        magic: false, rarity: null, attunement: false, weight: entry.weight || 0,
        tags: entry.tags, formula: null, sourceId: entry.id, baseSourceId: null,
        family: variantFamily(entry)
      });
    }

    // Для merchant уже выбранные строки можно расширить до размера товарной партии.
    // Это отдельный предохранитель для дорогих складов: вместо добавления сотен разных
    // дешёвых строк увеличивается количество нескольких логичных товаров, но не выше
    // жёстких категорийных cap из merchantStockCap().
    if (options.lootType === 'merchant' && state.itemsCp < minItemCp) {
      const sourceById = new Map(entries.map(entry => [entry.id, entry]));
      const expandable = state.lines
        .filter(line => !line.magic)
        .map(line => ({ line, entry: sourceById.get(line.sourceId) }))
        .filter(pair => pair.entry?.priceType === 'priced')
        .sort((a, b) => b.line.unitCp - a.line.unitCp);

      for (const { line, entry } of expandable) {
        if (state.itemsCp >= minItemCp || state.totalUnits >= unitLimit) break;
        const perLineCap = merchantStockCap(entry);
        const roomByLine = Math.max(0, perLineCap - line.qty);
        const roomByUnits = Math.max(0, unitLimit - state.totalUnits);
        const roomByBudget = Math.floor(Math.max(0, maxItemCp - state.itemsCp) / line.unitCp);
        const needed = Math.ceil(Math.max(0, minItemCp - state.itemsCp) / line.unitCp);
        const addQty = Math.min(roomByLine, roomByUnits, roomByBudget, needed);
        if (addQty <= 0) continue;
        line.qty += addQty;
        line.totalCp += line.unitCp * addQty;
        state.itemsCp += line.unitCp * addQty;
        state.totalUnits += addQty;
        if (line.weight) state.totalWeight += line.weight * addQty;
      }
    }

    // v5: после набора строк разрешаем расширить уже выбранные логичные стаки.
    // Это позволяет крупным кладам достигать целевой доли предметов без сотен новых строк.
    expandExistingStacks(entries, options, state, budgetCp, targetItemCp, maxItemCp, unitLimit);
    rebalanceUnits(entries, options, state, maxItemCp, unitLimit);

    // Корректирующий проход: стараемся удержать долю монет в профиле lootType,
    // но никогда не нарушаем maxLines, динамический лимит единиц и бюджет.
    while (state.itemsCp < minItemCp && state.lines.length < maxLines && state.totalUnits < unitLimit) {
      const deficitCp = minItemCp - state.itemsCp;
      const spendableCp = Math.max(0, maxItemCp - state.itemsCp);
      if (spendableCp <= 0) break;
      const entry = chooseRepairItem(entries, options, state, spendableCp, deficitCp, rng);
      if (!entry) break;
      const unitCp = gpToCp(entry.priceGp);
      let qty = chooseQuantity(entry, spendableCp, state.totalUnits, options, options.budgetGp, rng);
      if (qty < 1) qty = 1;
      const cap = maxQuantityFor(entry, spendableCp, state.totalUnits, options, options.budgetGp);
      qty = Math.min(Math.max(1, qty), Math.max(1, cap));
      addLineState(state, {
        name: entry.name, qty, unitCp, totalCp: unitCp * qty, category: entry.category,
        magic: false, rarity: null, attunement: false, weight: entry.weight || 0,
        tags: entry.tags, formula: null, sourceId: entry.id, baseSourceId: null,
        family: variantFamily(entry)
      });
    }

    const coinsCp = budgetCp - state.itemsCp;
    if (coinsCp < 0 || state.itemsCp + coinsCp !== budgetCp) {
      throw new Error(`Нарушен бюджетный инвариант: ${state.itemsCp} + ${coinsCp} != ${budgetCp}.`);
    }

    const flavor = options.includeFlavor ? chooseFlavor(entries, options, rng) : null;
    const actualCoinShare = budgetCp > 0 ? coinsCp / budgetCp : 1;
    const coinRangeSatisfied = actualCoinShare >= lootProfile.coinShare[0] - 0.000001 &&
      actualCoinShare <= lootProfile.coinShare[1] + 0.000001;

    return {
      version: VERSION,
      options,
      contextId: options.contextId,
      contextName: CONTEXTS[options.contextId].name,
      budgetCp,
      targetItemShare: budgetCp ? targetItemCp / budgetCp : 0,
      magicChance: chance,
      effectiveRarityCap: effectiveRarityCap(options),
      lines: state.lines,
      flavor: flavor ? { name: flavor.name, sourceId: flavor.id, priceless: flavor.isPriceless } : null,
      itemsCp: state.itemsCp,
      coinsCp,
      actualCoinShare,
      coinRangeSatisfied,
      attunementCount: state.attunementCount,
      attunementLimit,
      totalWeight: state.totalWeight,
      weightExceeded: options.useWeightLimit && state.totalWeight > options.maxWeight
    };
  }
export {
  parseLootTable,
  validateData,
  variantFamily,
  levelAllows,
  categoryAllowed,
  contextAllows,
  effectiveRarityCap,
  rarityAllowed,
  sanitizeOptions,
  generateLoot
};
