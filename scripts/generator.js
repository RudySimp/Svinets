import * as DATA from "./data.js";
import * as UTILS from "./utils.js";

const {
  VERSION,
  SETTINGS,
  CONTEXTS,
  STACK_MULTIPLIERS,
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
  SINGLE_QTY_CATEGORIES,
  RICHNESS_PROFILES
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

const MAGIC_MODE_CAPS = Object.freeze({ automatic: null, none: -1, common: 'common', uncommon: 'uncommon', rare: 'rare', veryRare: 'veryRare', legendary: 'legendary' });
const PROFILE_BY_RICHNESS = Object.freeze({ poor: { id: 'poor', lineMultiplier: 0.55, maxMagic: 1, magicModifier: 0.55, unitFactor: 0.55 }, normal: { id: 'normal', lineMultiplier: 0.85, maxMagic: 2, magicModifier: 0.85, unitFactor: 0.85 }, rich: { id: 'rich', lineMultiplier: 1.15, maxMagic: 3, magicModifier: 1.15, unitFactor: 1.0 }, treasure: { id: 'treasure', lineMultiplier: 1.35, maxMagic: 4, magicModifier: 1.35, unitFactor: 1.15 } });

function deriveGenerationProfile(contextId, budgetGp) {
  const context = DATA.CONTEXTS[contextId] ?? DATA.CONTEXTS['50K'];
  const richness = context.richness ?? 'normal';
  const meta = RICHNESS_PROFILES[richness] ?? RICHNESS_PROFILES.normal;
  const base = PROFILE_BY_RICHNESS[richness] ?? PROFILE_BY_RICHNESS.normal;
  const scale = budgetGp > meta.softMax ? 1.12 : budgetGp < meta.softMin ? 0.82 : 1;
  return { ...base, contextId: context.id, richness, coinRange: [...(context.coinRange ?? meta.coinRange)], categoryWeights: context.categoryWeights ?? {}, highValueFactor: meta.highValue * scale, magicAffinity: context.magicAffinity ?? 0.5, lineMultiplier: base.lineMultiplier * scale };
}

function stackPolicyFor(category, name = "") {
  const normalized = String(name).toLowerCase();
  if (SINGLE_QTY_CATEGORIES.has(category) || /подзорн|корон|диадем|ожерель|браслет|брош|статуэт|произведен/.test(normalized)) return "single";
  if (["trade_good", "raw_material", "precious_material", "large_vehicle"].includes(category)) return "bulk";
  if (["ammo", "food", "consumable", "magic_ammo", "gemstone", "magic_potion"].includes(category)) return "stackable";
  return "small";
}

function mundaneFocusName(name) {
  const replacements = new Map([
    ["Магический кристалл", "Кристалл-фокус"],
    ["Магическая сфера", "Сфера-фокус"],
    ["Магический жезл", "Арканный жезл-фокус"],
    ["Магический посох", "Арканный посох-фокус"],
    ["Магическая палочка", "Арканная палочка-фокус"],
    ["Ветка омелы", "Ветка омелы — друидический фокус"],
    ["Деревянный друидский посох", "Друидический посох-фокус"],
    ["Тисовая палочка", "Друидическая палочка-фокус"],
    ["Священный амулет", "Священный символ-амулет"],
    ["Священная эмблема", "Священный символ-эмблема"],
    ["Реликварий", "Священный символ-реликварий"]
  ]);
  return replacements.get(name) ?? String(name).replace(/^Магическ(?:ий|ая|ое)\s+/iu, "Арканный ") + (/-фокус$/iu.test(name) ? "" : "-фокус");
}

function sourceValueClassFor(category, name = "") {
  if (category === 'gemstone') return 'gemstone';
  if (category === 'art_object') {
    const normalized = String(name).toLowerCase();
    if (/кольц|ожерел|диадем|корон|браслет|брош|серьг|цеп/.test(normalized)) return 'jewelry';
    if (/релик|священ|саркофаг|мощ/.test(normalized)) return 'relic';
    return 'art_object';
  }
  if (category === 'trade_good') return 'trade_good';
  if (category !== 'valuable') return null;
  const normalized = String(name).toLowerCase();
  if (/ювелир|кольц|ожерел|диадем|корон|браслет|брош|серьг|цеп/.test(normalized)) return 'jewelry';
  if (/релик|священ|древн|саркофаг|мощ/.test(normalized)) return 'relic';
  return 'valuable';
}
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
        sourceValueClass: ['valuable', 'gemstone', 'art_object', 'trade_good'].includes(category) ? category : null,
        source: String(row['РћСЃРЅРѕРІР°РЅРёРµ_С†РµРЅС‹'] ?? '').trim() || 'legacy-table',
        generatedDisplayName: null,
        rawAttunement: row.Attunement, rawRarity: row.Rarity, sourceIds: [id]
      });
    }

    // Историческая v3 была собрана из двух таблиц, поэтому часть PHB-позиций
    // присутствует дважды под разными ID. v4 сохраняет 1329 исходных строк,
    // но в рабочем пуле объединяет одинаковые ценовые позиции в одну запись.
    for (const entry of rawEntries) {
      if (entry.category === 'focus') {
        entry.legacyName = entry.name;
        entry.name = mundaneFocusName(entry.name);
      }
      entry.maxNaturalQty = Number.isFinite(entry.maxQty) ? entry.maxQty : 1;
      entry.stackPolicy = stackPolicyFor(entry.category, entry.name);
      entry.source = entry.priceSource || entry.source || 'legacy-table';
      entry.sourceValueClass = sourceValueClassFor(entry.category, entry.name);
    }

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
      if (entry.category === 'focus' && /магическ/iu.test(entry.name)) errors.push(`Обычный focus не должен быть назван магическим: ${entry.name}.`);
      if (entry.priceType === 'priced' && (!Number.isFinite(entry.priceGp) || entry.priceGp < 0 || !entry.source)) errors.push(`Ценовая строка без корректного source: ${entry.id}.`);
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
    // Group level is advisory only in v6; it must not alter physical contents.
    return true;
  }

  function categoryAllowed(entry, options) {
    if (!options.includeAnimals && ANIMAL_TRANSPORT_CATEGORIES.has(entry.category)) return false;
    if (options.includeAnimals && !options.includeBarding && entry.category === 'barding') return false;
    return true;
  }

  function contextAllows(entry, contextId) {
    const context = CONTEXTS[contextId];
    if (entry.contexts.includes(contextId) || Boolean(context?.legacyId && entry.contexts.includes(context.legacyId))) return true;
    if (context && (context.richness === 'rich' || context.richness === 'treasure') && ['valuable', 'gemstone', 'art_object', 'trade_good'].includes(entry.category)) {
      const valueFallback = { dungeon: '36K', burial: '39K', lair: '43K', nobility: '26K', religion: '28K', knowledge: '32K', maritime: '46K' }[context.categoryId];
      if (valueFallback && entry.contexts.includes(valueFallback)) return true;
    }
    return false;
  }

  function effectiveRarityCap(options) {
    let cap = options.magicMode === 'automatic' ? 'legendary' : (MAGIC_MODE_CAPS[options.magicMode] ?? 'legendary');
    if (cap === -1) return 'common';
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
    const context = CONTEXTS[contextId] ?? CONTEXTS['50K'];
    const weights = context.categoryWeights ?? {};
    const alias = MAGIC_CATEGORIES.has(entry.category) ? 'magic'
      : ['valuable', 'gemstone', 'art_object', 'jewelry', 'relic'].includes(entry.category) ? (entry.category === 'jewelry' || entry.category === 'relic' ? entry.category : entry.category)
        : ['gear', 'variant', 'focus', 'container'].includes(entry.category) ? 'gear' : entry.category;
    return base * (weights[entry.category] ?? weights[alias] ?? 1);
  }

  function consumableBalanceWeight(entry, options) {
    const slider = clamp(Number(options.consumablesSlider) || 50, 0, 100) / 100;
    const isConsumable = isConsumableEntry(entry);
    const factor = isConsumable
      ? 0.25 + 1.5 * slider
      : 0.25 + 1.5 * (1 - slider);
    return factor;
  }

  function combinedCategoryWeight(entry, options) {
    return contextCategoryWeight(entry, options.contextId) * consumableBalanceWeight(entry, options);
  }

  // -------------------- 8. МАГИЯ --------------------

  const VALUE_CARRIER_CATEGORIES = new Set(['valuable', 'gemstone', 'jewelry', 'art_object', 'relic', 'precious_material', 'trade_good', 'high_value_trade_good']);
  const VALUE_DISPLAY_PREFIXES = Object.freeze({
    gemstone: ['Резной драгоценный камень', 'Коллекционный самоцвет', 'Огранённый камень'],
    art_object: ['Старинное произведение искусства', 'Церемониальный художественный предмет', 'Редкая коллекционная работа'],
    valuable: ['Ценная реликвия', 'Ювелирная ценность', 'Драгоценный церемониальный предмет'],
    jewelry: ['Золотая диадема', 'Церемониальное ожерелье', 'Инкрустированный браслет'],
    relic: ['Древняя храмовая реликвия', 'Погребальная реликвия', 'Освящённый реликварий'],
    trade_good: ['Партия дорогого торгового товара', 'Запечатанный ценный груз', 'Редкий коммерческий материал']
  });

  function valueDisplayName(entry, rng) {
    if (!VALUE_CARRIER_CATEGORIES.has(entry.category)) return entry.name;
    const valueClass = entry.sourceValueClass ?? entry.category;
    const pool = VALUE_DISPLAY_PREFIXES[valueClass] ?? VALUE_DISPLAY_PREFIXES[entry.category] ?? ['Ценная находка'];
    const prefix = pool[Math.floor(rng() * pool.length)];
    return `${prefix} — ${entry.name}`;
  }

  function legacyGenericMagicName(rarity, category, baseName = null) {
    const meta = RARITY_META[rarity] ?? RARITY_META.common;
    if (category === 'magic_weapon') return `${meta.neuter} магическое ${baseName ?? 'оружие'}`;
    if (category === 'magic_armor') return `${meta.feminine} магическая ${baseName ?? 'броня'}`;
    if (category === 'magic_ring' || category === 'scroll' || category === 'magic_potion') return `${meta.neuter} магическое ${category === 'magic_ring' ? 'кольцо' : category === 'scroll' ? 'свиток' : 'зелье'}`;
    if (category === 'wondrous') return `${meta.neuter} магический предмет`;
    if (category === 'magic_wand') return `${meta.feminine} магическая палочка`;
    if (category === 'magic_staff') return `${meta.masculine} магический посох`;
    if (category === 'magic_rod') return `${meta.masculine} магический жезл`;
    if (category === 'magic_ammo') return `${meta.plural} магические боеприпасы`;
    return `${meta.masculine} магический предмет`;
  }

  // Keep all generated magic names abstract and grammatically aligned with
  // the item category. This declaration intentionally supersedes the legacy
  // formatter above while old table data remains untouched.
  function genericMagicNameBase(rarity, category, baseName = null) {
    const meta = RARITY_META[rarity] ?? RARITY_META.common;
    if (category === 'magic_weapon') return `${meta.masculine} магический ${baseName ?? 'предмет'}`;
    if (category === 'magic_armor') return `${meta.feminine} магическая ${baseName ?? 'броня'}`;
    if (category === 'magic_ring') return `${meta.neuter} магическое кольцо`;
    if (category === 'magic_potion') return `${meta.neuter} магическое зелье`;
    if (category === 'scroll') return `${meta.masculine} магический свиток`;
    if (category === 'wondrous') return `${meta.masculine} магический предмет`;
    if (category === 'magic_wand') return `${meta.feminine} магическая палочка`;
    if (category === 'magic_staff') return `${meta.masculine} магический посох`;
    if (category === 'magic_rod') return `${meta.masculine} магический жезл`;
    if (category === 'magic_ammo') return `${meta.plural} магические боеприпасы`;
    if (category === 'magic_amulet') return `${meta.masculine} магический амулет`;
    if (category === 'magic_cloak') return `${meta.masculine} магический плащ`;
    if (category === 'magic_helm') return `${meta.masculine} магический шлем`;
    if (category === 'magic_belt') return `${meta.masculine} магический пояс`;
    if (category === 'magic_instrument') return `${meta.masculine} магический музыкальный инструмент`;
    if (category === 'magic_focus') return `${meta.masculine} магический фокус`;
    return `${meta.masculine} магический предмет`;
  }

  function magicMagicAdjective(meta, baseName) {
    const noun = String(baseName ?? "").trim();
    if (/(ы|и)$/iu.test(noun)) return { rarity: meta.plural, magic: "магические" };
    if (/(а|я)$/iu.test(noun)) return { rarity: meta.feminine, magic: "магическая" };
    return { rarity: meta.masculine, magic: "магический" };
  }

  function genericMagicName(rarity, category, baseName = null) {
    const meta = RARITY_META[rarity] ?? RARITY_META.common;
    if (category === 'magic_weapon') { const adjective = magicMagicAdjective(meta, baseName); return `${adjective.rarity} ${adjective.magic} ${baseName ?? 'предмет'}`; }
    if (category === 'magic_armor') { const adjective = magicMagicAdjective(meta, baseName); return `${adjective.rarity} ${adjective.magic} ${baseName ?? 'броня'}`; }
    if (category === 'magic_ring') return `${meta.neuter} магическое кольцо`;
    if (category === 'magic_potion') return `${meta.neuter} магическое зелье`;
    if (category === 'scroll') return `${meta.masculine} магический свиток`;
    if (category === 'wondrous') return `${meta.masculine} магический предмет`;
    if (category === 'magic_wand') return `${meta.feminine} магическая палочка`;
    if (category === 'magic_staff') return `${meta.masculine} магический посох`;
    if (category === 'magic_rod') return `${meta.masculine} магический жезл`;
    if (category === 'magic_ammo') return `${meta.plural} магические боеприпасы`;
    if (category === 'magic_amulet') return `${meta.masculine} магический амулет`;
    if (category === 'magic_cloak') return `${meta.masculine} магический плащ`;
    if (category === 'magic_helm') return `${meta.masculine} магический шлем`;
    if (category === 'magic_belt') return `${meta.masculine} магический пояс`;
    if (category === 'magic_instrument') return `${meta.masculine} магический музыкальный инструмент`;
    if (category === 'magic_focus') return `${meta.masculine} магический фокус`;
    return `${meta.masculine} магический предмет`;
  }

  function magicChance(contextId, budgetGp, profile) {
    const affinity = CONTEXTS[contextId]?.magicAffinity ?? 0.5;
    const base = 0.03 + Math.log10(budgetGp + 1) * 0.055;
    const raw = clamp(base * affinity, 0, 0.58);
    const modifier = profile?.magicModifier ?? 1;
    return clamp(raw * modifier, 0, 0.92);
  }

  function formulaDisplayName(formulaEntry, baseEntry) {
    const rarity = formulaEntry.rarity;
    const meta = RARITY_META[rarity] ?? RARITY_META.common;
    if (formulaEntry.baseFormula.baseCategory === 'armor') return genericMagicName(rarity, 'magic_armor', baseEntry.name.toLowerCase());
    return genericMagicName(rarity, 'magic_weapon', baseEntry.name.toLowerCase());
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
          family, formula: { baseCp, bonusCp, totalCp: priceCp }, sourceValueClass: null, source: formula.priceSource || 'legacy-table'
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
        name: genericMagicName(entry.rarity, entry.category), priceCp, category: entry.category, rarity: entry.rarity,
        attunement: entry.attunement, weight: entry.weight || 0, tags: entry.tags,
        family, formula: null, sourceValueClass: null, source: entry.priceSource || 'legacy-table'
      });
    }

    return uniqueBy(candidates, c => `${c.name.toLowerCase()}|${c.priceCp}|${c.rarity ?? ''}`);
  }

  function chooseMagicRarity(candidates, options, rng) {
    const available = new Set(candidates.map(c => c.rarity).filter(r => RARITY_RANK[r] != null));
    if (!available.size) return null;
    const weights = Object.fromEntries([...RARITY_ORDER].map((rarity, index) => [rarity, 6 - index]));
    const requested = MAGIC_MODE_CAPS[options.magicMode];
    if (requested && requested !== -1) {
      for (const rarity of RARITY_ORDER) if (rarityRank(rarity) > rarityRank(requested)) weights[rarity] = 0;
    }
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

  function totalUnitLimit(budgetGp, profile) {
    const base = [20, 40, 80, 150, 250, 400][budgetTier(budgetGp)];
    return Math.ceil(base * (profile?.unitFactor ?? 1));
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
    const stackPolicy = entry.stackPolicy ?? stackPolicyFor(entry.category, entry.name);
    if (stackPolicy === 'single') {
      categoryCap = 1;
    } else if (options._profile.richness === 'rich' || options._profile.richness === 'treasure') {
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
      totalUnitLimit(budgetGp, options._profile) - totalUnits
    ));
  }

  function chooseQuantity(entry, spendableCp, totalUnits, options, budgetGp, rng) {
    const cap = maxQuantityFor(entry, spendableCp, totalUnits, options, budgetGp);
    if (cap <= 1) return cap;

    if (options._profile.richness === 'rich' || options._profile.richness === 'treasure') {
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
      }
      low = Math.min(low, cap);
      high = Math.min(Math.max(low, high), cap);
      return clamp(low + Math.floor(rng() * (high - low + 1)), 1, cap);
    }

    const consumableBoost = 0;
    const roll = rng();
    if (roll < 0.62 - consumableBoost) return 1;
    if (roll < 0.90 - consumableBoost / 2) return Math.min(2, cap);
    return Math.min(3, cap);
  }

  function minimumUnitTarget(budgetGp, profile) {
    if (!['rich', 'treasure'].includes(profile?.richness)) return 0;
    return [0, 8, 15, 30, 55, 90][budgetTier(budgetGp)];
  }

  function expandExistingStacks(entries, options, state, budgetCp, targetItemCp, maxItemCp, unitLimit) {
    const desiredUnits = Math.min(unitLimit, minimumUnitTarget(options.budgetGp, options._profile));
    const targetCp = Math.min(maxItemCp, Math.max(targetItemCp, state.itemsCp));
    if (state.itemsCp >= targetCp && state.totalUnits >= desiredUnits) return;

    const sourceById = new Map(entries.map(entry => [entry.id, entry]));
    const expandable = state.lines
      .map(line => ({ line, entry: sourceById.get(line.sourceId) }))
      .filter(({ line, entry }) => entry?.priceType === 'priced' && (entry.stackPolicy ?? stackPolicyFor(entry.category, entry.name)) !== 'single' && line.unitCp > 0)
      .sort((a, b) => a.line.unitCp - b.line.unitCp);

    let guard = 0;
    while ((state.itemsCp < targetCp || state.totalUnits < desiredUnits) && state.totalUnits < unitLimit && guard++ < 5000) {
      let changed = false;
      for (const { line, entry } of expandable) {
        if (state.totalUnits >= unitLimit) break;
        const categoryCap = options._profile.richness === 'rich' || options._profile.richness === 'treasure'
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
    const desiredUnits = Math.min(unitLimit, minimumUnitTarget(options.budgetGp, options._profile));
    if (desiredUnits <= 0 || state.totalUnits >= desiredUnits) return;

    const sourceById = new Map(entries.map(entry => [entry.id, entry]));
    const roomFor = (line, entry) => {
      if (!entry || entry.priceType !== 'priced' || (entry.stackPolicy ?? stackPolicyFor(entry.category, entry.name)) === 'single') return 0;
      const cap = options._profile.richness === 'rich' || options._profile.richness === 'treasure'
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
    if (options._profile.richness === 'rich' || options._profile.richness === 'treasure') {
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
    line.stackPolicy ??= stackPolicyFor(line.category, line.name);
    line.maxNaturalQty ??= line.stackPolicy === 'single' ? 1 : Math.max(1, Number(line.qty) || 1);
    state.lines.push(line);
    state.itemsCp += line.totalCp;
    state.totalUnits += line.qty;
    if (line.attunement) state.attunementCount += line.qty;
    if (line.weight) state.totalWeight += line.weight * line.qty;
    state.usedNames.add(line.name.toLowerCase());
    state.usedFamilies.add(line.family ?? variantFamily(line.name));
  }

  function repairHighCoinShare(entries, options, state, budgetCp, minItemCp, maxItemCp, unitLimit, rng) {
    const profile = options._profile;
    const targetCp = Math.min(maxItemCp, Math.floor(budgetCp * (1 - (profile.coinRange[0] + profile.coinRange[1]) / 2)));
    const startCp = state.itemsCp;
    let guard = 0;
    while (state.itemsCp < Math.max(minItemCp, targetCp) && state.lines.length < Math.min(SETTINGS.hardMaxLines, 24) && guard++ < 24) {
      const spendableCp = Math.max(0, maxItemCp - state.itemsCp);
      if (spendableCp <= 0) break;
      const deficitCp = Math.max(1, Math.max(minItemCp, targetCp) - state.itemsCp);
      const candidates = entries.filter(entry => VALUE_CARRIER_CATEGORIES.has(entry.category) && candidateAllowed(entry, options, state, spendableCp, 0));
      if (!candidates.length) break;
      const entry = weightedPick(candidates, candidate => {
        const priceCp = gpToCp(candidate.priceGp);
        const fit = gaussianFit(priceCp / Math.max(1, deficitCp), 0.45, 0.35);
        const categoryWeight = contextCategoryWeight(candidate, options.contextId);
        return fit * categoryWeight * (1 + profile.highValueFactor);
      }, rng);
      if (!entry) break;
      const unitCp = gpToCp(entry.priceGp);
      const cap = maxQuantityFor(entry, spendableCp, state.totalUnits, options, options.budgetGp);
      let qty = Math.min(cap, unitLimit - state.totalUnits, Math.floor(spendableCp / unitCp), Math.max(1, Math.ceil(deficitCp / unitCp)));
      if (qty < 1) {
        // If the unit safety cap is full, replace one cheap filler line with
        // a value carrier instead of abandoning the repair pass.
        const donorIndex = state.lines.findIndex(line => !line.magic && line.unitCp < unitCp && !VALUE_CARRIER_CATEGORIES.has(line.category));
        if (donorIndex < 0 || spendableCp < unitCp) break;
        const donor = state.lines[donorIndex];
        donor.qty -= 1;
        donor.totalCp -= donor.unitCp;
        state.itemsCp -= donor.unitCp;
        state.totalUnits -= 1;
        state.totalWeight -= donor.weight || 0;
        if (donor.qty <= 0) {
          state.lines.splice(donorIndex, 1);
          state.usedNames.delete(donor.name.toLowerCase());
          state.usedFamilies.delete(donor.family ?? variantFamily(donor.name));
        }
        qty = 1;
      }
      const displayName = valueDisplayName(entry, rng);
      addLineState(state, { name: displayName, generatedDisplayName: displayName, qty, unitCp, totalCp: unitCp * qty, category: entry.category, magic: false, rarity: null, attunement: false, weight: entry.weight || 0, tags: entry.tags, formula: null, sourceId: entry.id, baseSourceId: null, family: variantFamily(entry), sourceValueClass: entry.sourceValueClass ?? entry.category, source: entry.source ?? 'legacy-table' });
    }
    return { attempted: guard > 0, iterations: guard, repaired: guard, addedValueCp: state.itemsCp - startCp, itemsCp: state.itemsCp, targetCp };
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

  const SCROLL_SPELLS = Object.freeze({
    0: ['Mage Hand', 'Light', 'Minor Illusion', 'Prestidigitation'],
    1: ['Magic Missile', 'Shield', 'Cure Wounds', 'Detect Magic', 'Sleep'],
    2: ['Misty Step', 'Invisibility', 'Hold Person', 'Lesser Restoration'],
    3: ['Fireball', 'Counterspell', 'Fly', 'Haste'],
    4: ['Dimension Door', 'Greater Invisibility', 'Polymorph'],
    5: ['Cone of Cold', 'Hold Monster', 'Teleportation Circle'],
    6: ['Chain Lightning', 'Disintegrate', 'Mass Suggestion'],
    7: ['Plane Shift', 'Reverse Gravity', 'Teleport'],
    8: ['Dominate Monster', 'Maze', 'Mind Blank'],
    9: ['Wish', 'Time Stop', 'True Polymorph']
  });

  function inferSpellLevel(name) {
    const match = String(name ?? '').match(/(?:^|\s)([1-9])(?:-го|st|nd|rd|th)?\s*(?:уров|level)/i);
    return match ? clamp(Number(match[1]), 0, 9) : 1;
  }

  function pickDistinct(values, count, rng) {
    const pool = [...values];
    const picked = [];
    while (pool.length && picked.length < count) {
      const index = Math.floor(rng() * pool.length);
      picked.push(pool.splice(index, 1)[0]);
    }
    return picked;
  }

  function decorateSpecialLines(lines, options, rng) {
    for (const line of lines) {
      if (line.category === 'scroll') {
        const spellPool = SCROLL_SPELLS[inferSpellLevel(line.name)] ?? SCROLL_SPELLS[1];
        line.spells = pickDistinct(spellPool, Math.max(1, line.qty), rng);
      } else if (!line.spells) line.spells = [];
      if (options.useSpecificMagic && line.magic && !line.specificSource) {
        line.specificSource = line.sourceId ?? null;
      }
    }
  }

  function chooseFlavors(entries, options, rng) {
    const ordinary = entries.filter(entry =>
      entry.priceType === 'flavor' && !entry.isPriceless &&
      contextAllows(entry, options.contextId) && levelAllows(entry, options) && categoryAllowed(entry, options)
    );
    if (!ordinary.length) return [];
    const count = options.budgetGp < 100 ? (rng() < 0.5 ? 0 : 1)
      : options.budgetGp < 10000 ? 1
        : options.budgetGp < 100000 ? 1 + (rng() < 0.5 ? 1 : 0)
          : 2 + Math.floor(rng() * 2);
    return pickDistinct(ordinary, Math.min(count, ordinary.length), rng).map(entry => ({
      name: entry.name,
      sourceId: entry.id,
      priceless: entry.isPriceless
    }));
  }

  function analyzeContextRichness(entries, contextId) {
    const count = entries.filter(entry =>
      entry.priceType === 'priced' && Number(entry.priceGp) > 20 && contextAllows(entry, contextId)
    ).length;
    return { count, richness: count < 20 ? 'poor' : 'adequate' };
  }

  function isOversizedBudget(budgetGp, levelBand = 'ignore') {
    const levelNumeric = { '1-4': 3, '5-10': 7, '11-16': 13, '17-20': 18 }[levelBand];
    if (!levelNumeric) return false;
    return budgetGp > 2000 * levelNumeric * 3;
  }

  function budgetPlausibility(contextId, budgetGp) {
    const context = CONTEXTS[normalizeContextId(contextId)] ?? CONTEXTS['50K'];
    const recommended = context.recommendedBudget ?? { softMin: 1, softMax: Infinity };
    const softMax = Number(recommended.softMax) || Infinity;
    const ratio = softMax > 0 ? budgetGp / softMax : 1;
    const status = ratio > 8 ? 'absurd' : ratio > 2 ? 'high' : 'normal';
    return {
      status,
      ratio,
      recommended,
      warning: status === 'normal' ? null : `Р‘СЋРґР¶РµС‚ РґР»СЏ «${context.name}» РІС‹С€Рµ РѕР±С‹С‡РЅРѕРіРѕ РґРёР°РїР°Р·РѕРЅР°.`
    };
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

    options.contextId = DATA.CONTEXTS[options.contextId] ? options.contextId : '50K';
    options.levelBand = ['ignore', '1-4', '5-10', '11-16', '17-20'].includes(options.levelBand)
      ? options.levelBand
      : (['1-4', '5-10', '11-16', '17-20'].includes(options.partyLevel) ? options.partyLevel : 'ignore');
    options.seed = String(options.seed ?? '').trim() === '' ? null : Number(options.seed);
    if (!Number.isFinite(options.seed)) options.seed = null;

    const migratedMagic = options.magicMode ?? (options.magicAllowed === false ? 'none' : null);
    const oldRarity = ['common', 'uncommon', 'rare', 'veryRare', 'legendary'].includes(options.maxRarity) ? options.maxRarity : 'automatic';
    options.magicMode = ['automatic', 'none', 'common', 'uncommon', 'rare', 'veryRare', 'legendary'].includes(migratedMagic) ? migratedMagic : oldRarity;
    options.coinPreference = ['automatic', 'few', 'medium', 'many'].includes(options.coinPreference) ? options.coinPreference : 'automatic';
    const allowLegendary = options.magicMode === 'legendary' || (options.magicMode === 'automatic' && options.budgetGp >= 100_000 && ['rich', 'treasure'].includes(deriveGenerationProfile(options.contextId, options.budgetGp).richness));
    options.maxMagicItems = SETTINGS.maxMagicItems;
    options.consumablesSlider = 50;
    options.includeFlavor = options.includeFlavor !== false;
    options.includeAnimals = true;
    options.includeBarding = true;
    options.useAttunement = options.useAttunement !== false;
    options.useWeightLimit = Boolean(options.useWeightLimit);
    options.maxWeight = Math.max(0, Number(options.maxWeight) || 300);
    options.noDuplicates = true;
    options.noFamilies = true;
    options.maxLines = clamp(Math.trunc(Number(options.maxLines) || 0), 0, SETTINGS.hardMaxLines);

    options.autoExport = Boolean(options.autoExport);
    options.exportTarget = options.exportTarget === 'world' ? 'world' : 'chat';
    options.uiMode = 'simple';
    options.useSpecificMagic = true;
    // Legacy saved settings are read only for migration and must not leak
    // back into the active result model or Foundry flags.
    for (const key of [
      'lootType', 'partySize', 'preference', 'composition', 'partyLevel', 'maxRarity', 'magicAllowed',
      'allowLegendary', 'maxMagicItems', 'consumablesSlider', 'includeAnimals', 'includeBarding',
      'noDuplicates', 'noFamilies', 'uiMode', 'useSpecificMagic'
    ]) delete options[key];
    const profile = deriveGenerationProfile(options.contextId, options.budgetGp);
    const coinShift = { few: -0.10, medium: 0, many: 0.12 }[options.coinPreference] ?? 0;
    if (coinShift) {
      profile.coinRange = [
        clamp(profile.coinRange[0] + coinShift, 0.01, 0.9),
        clamp(profile.coinRange[1] + coinShift, 0.05, 0.95)
      ];
      if (profile.coinRange[1] < profile.coinRange[0]) profile.coinRange[1] = profile.coinRange[0];
    }
    Object.defineProperties(options, {
      allowLegendary: { value: allowLegendary, enumerable: false },
      maxMagicItems: { value: SETTINGS.maxMagicItems, enumerable: false },
      consumablesSlider: { value: 50, enumerable: false },
      includeAnimals: { value: true, enumerable: false },
      includeBarding: { value: true, enumerable: false },
      noDuplicates: { value: true, enumerable: false },
      noFamilies: { value: true, enumerable: false },
      uiMode: { value: 'simple', enumerable: false },
      useSpecificMagic: { value: true, enumerable: false }
    });
    Object.defineProperty(options, '_profile', { value: profile, enumerable: false });
    return options;
  }

  function generateLoot(entries, rawOptions) {
    const options = sanitizeOptions(rawOptions);
    const rng = createRng(options.seed);
    const budgetCp = gpToCp(options.budgetGp);
    const lootProfile = options._profile;

    const coinShareTarget = lootProfile.coinRange[0] + rng() * (lootProfile.coinRange[1] - lootProfile.coinRange[0]);
    const targetItemCp = Math.floor(budgetCp * (1 - coinShareTarget));
    const minItemCp = Math.floor(budgetCp * (1 - lootProfile.coinRange[1]));
    const maxItemCp = Math.floor(budgetCp * (1 - lootProfile.coinRange[0]));

    const lineMultiplier = options._profile.lineMultiplier;
    const autoMaxLines = Math.min(SETTINGS.hardMaxLines, Math.max(0, Math.ceil(slotCount(options.budgetGp) * lineMultiplier)));
    const maxLines = Math.max(0, Math.min(autoMaxLines, options.maxLines > 0 ? options.maxLines : autoMaxLines));
    const minLines = minimumLineCount(maxLines, options.budgetGp, options._profile.richness);
    const attunementLimit = 3;

    const state = {
      lines: [], itemsCp: 0, totalUnits: 0, usedNames: new Set(), usedFamilies: new Set(),
      attunementCount: 0, attunementLimit, totalWeight: 0, legendaryCount: 0
    };

    const magicCap = options.magicMode === 'none' ? 0 : Math.min(lootProfile.maxMagic, maxLines);
    const initialSpendableCp = Math.max(0, maxItemCp - state.itemsCp);
    const initialMagicCandidates = magicCap > 0
      ? buildMagicCandidates(entries, options, budgetCp, initialSpendableCp, state)
      : [];
    const chance = initialMagicCandidates.length
      ? magicChance(options.contextId, options.budgetGp, options._profile)
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
        name: magic.name, generatedDisplayName: magic.name, qty: 1, unitCp: magic.priceCp, totalCp: magic.priceCp,
        category: magic.category, magic: true, rarity: magic.rarity, attunement: magic.attunement,
        weight: magic.weight || 0, tags: magic.tags ?? [], formula: magic.formula,
        sourceId: magic.sourceId, baseSourceId: magic.baseSourceId, family: magic.family,
        sourceValueClass: magic.sourceValueClass ?? null, source: magic.source ?? 'legacy-table'
      };
      addLineState(state, line);
      if (magic.rarity === 'legendary') state.legendaryCount += 1;
    }

    const unitLimit = totalUnitLimit(options.budgetGp, options._profile);

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
      // Для богатых контекстов стоимость может набираться ограниченной партией.
      const requiredUnitFloorCp = options._profile.richness === 'rich' || options._profile.richness === 'treasure' ? 0 : Math.ceil(mandatoryDeficitCp / remainingSlots);
      const entry = chooseNormalItem(entries, options, state, spendableCp, Math.max(1, desiredRemainingCp), state.lines.length, rng, mustFillLines, requiredUnitFloorCp);
      if (!entry) break;
      let qty = chooseQuantity(entry, spendableCp, state.totalUnits, options, options.budgetGp, rng);
      if (qty < 1) break;
      const unitCp = gpToCp(entry.priceGp);
      qty = Math.min(qty, Math.floor(spendableCp / unitCp));
      if (qty < 1) break;

      const displayName = valueDisplayName(entry, rng);
      addLineState(state, {
        name: displayName, generatedDisplayName: displayName, qty, unitCp, totalCp: unitCp * qty, category: entry.category,
        magic: false, rarity: null, attunement: false, weight: entry.weight || 0,
        tags: entry.tags, formula: null, sourceId: entry.id, baseSourceId: null,
        family: variantFamily(entry), sourceValueClass: entry.sourceValueClass, source: entry.source
      });
    }

    // Для богатых контекстов расширяем только стакаемые строки.
    // Это отдельный предохранитель для дорогих складов: вместо добавления сотен разных
    // дешёвых строк увеличивается количество нескольких логичных товаров, но не выше
    // жёстких категорийных ограничений.
    // Стековый проход после набора строк расширяет уже выбранные логичные стаки.
    // Это позволяет крупным кладам достигать целевой доли предметов без сотен новых строк.
    expandExistingStacks(entries, options, state, budgetCp, targetItemCp, maxItemCp, unitLimit);
    rebalanceUnits(entries, options, state, maxItemCp, unitLimit);
    const highValueRepair = repairHighCoinShare(entries, options, state, budgetCp, minItemCp, maxItemCp, unitLimit, rng);

    // v6 unit floor: when the first pass selected only single-quantity gear,
    // add the cheapest context-appropriate stackable line while respecting all caps.
    const desiredUnits = Math.min(unitLimit, minimumUnitTarget(options.budgetGp, options._profile));
    if (state.totalUnits < desiredUnits) {
      const stackable = entries
        .filter(entry => entry.priceType === 'priced' && entry.maxQty > 1 && !isMagicEntry(entry) &&
          contextAllows(entry, options.contextId) && levelAllows(entry, options) && categoryAllowed(entry, options) &&
          rarityAllowed(entry, options))
        .filter(entry => candidateAllowed(entry, options, state, Math.max(0, maxItemCp - state.itemsCp)))
        .sort((a, b) => a.priceGp - b.priceGp);
      for (const entry of stackable) {
        if (state.lines.length >= maxLines || state.totalUnits >= desiredUnits) break;
        const unitCp = gpToCp(entry.priceGp);
        const roomByBudget = Math.floor(Math.max(0, maxItemCp - state.itemsCp) / unitCp);
        const cap = maxQuantityFor(entry, Math.max(0, maxItemCp - state.itemsCp), state.totalUnits, options, options.budgetGp);
        const qty = Math.min(desiredUnits - state.totalUnits, roomByBudget, cap);
        if (qty < 1) continue;
        addLineState(state, { name: entry.name, qty, unitCp, totalCp: unitCp * qty, category: entry.category, magic: false, rarity: null, attunement: false, weight: entry.weight || 0, tags: entry.tags, formula: null, sourceId: entry.id, baseSourceId: null, family: variantFamily(entry) });
      }
      let replacementGuard = 0;
      while (state.totalUnits < desiredUnits && stackable.length && replacementGuard++ < 3) {
        const entry = stackable.find(candidate => !state.usedNames.has(candidate.name.toLowerCase()));
        if (!entry) break;
        const unitCp = gpToCp(entry.priceGp);
        const roomByBudget = Math.floor(Math.max(0, maxItemCp - state.itemsCp) / unitCp);
        const cap = maxQuantityFor(entry, Math.max(0, maxItemCp - state.itemsCp), state.totalUnits, options, options.budgetGp);
        const qty = Math.min(desiredUnits - state.totalUnits, roomByBudget, cap);
        const replaceIndex = state.lines.findIndex(line => !line.magic && line.qty === 1);
        if (qty > 0 && replaceIndex >= 0) {
          const prior = state.lines[replaceIndex];
          state.itemsCp -= prior.totalCp;
          state.totalUnits -= prior.qty;
          state.totalWeight -= (prior.weight || 0) * prior.qty;
          state.usedNames.delete(prior.name.toLowerCase());
          state.usedFamilies.delete(prior.family);
          const replacement = { name: entry.name, qty, unitCp, totalCp: unitCp * qty, category: entry.category, magic: false, rarity: null, attunement: false, weight: entry.weight || 0, tags: entry.tags, formula: null, sourceId: entry.id, baseSourceId: null, family: variantFamily(entry) };
          state.lines[replaceIndex] = replacement;
          addLineState(state, replacement);
          state.lines.splice(state.lines.lastIndexOf(replacement), 1);
        } else break;
      }
      if (state.totalUnits < desiredUnits) {
        const receiver = state.lines.filter(line => !line.magic && line.unitCp > 0).sort((a, b) => a.unitCp - b.unitCp)[0];
        if (receiver) {
          const addQty = Math.min(desiredUnits - state.totalUnits, unitLimit - state.totalUnits, Math.floor(Math.max(0, maxItemCp - state.itemsCp) / receiver.unitCp));
          if (addQty > 0) {
            receiver.qty += addQty;
            receiver.totalCp += receiver.unitCp * addQty;
            state.itemsCp += receiver.unitCp * addQty;
            state.totalUnits += addQty;
            if (receiver.weight) state.totalWeight += receiver.weight * addQty;
          }
        }
      }
    }

    // Корректирующий проход удерживает долю монет в диапазоне контекста,
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

    decorateSpecialLines(state.lines, options, rng);
    const flavors = options.includeFlavor ? chooseFlavors(entries, options, rng) : [];
    const flavor = flavors[0] ?? null;
    const actualCoinShare = budgetCp > 0 ? coinsCp / budgetCp : 1;
    const coinRangeSatisfied = actualCoinShare >= lootProfile.coinRange[0] - 0.000001 &&
      actualCoinShare <= lootProfile.coinRange[1] + 0.000001;
    const names = state.lines.map(line => line.name.toLowerCase());
    const duplicateCount = names.length - new Set(names).size;
    const contextMismatch = state.lines.some(line => {
      const source = entries.find(entry => entry.id === line.sourceId);
      return source && !contextAllows(source, options.contextId);
    });
    const magicFocusCollision = state.lines.some(line => line.category === 'focus' && !line.magic && /магическ/iu.test(line.name));
    const cheapFiller = options.budgetGp >= 10_000 && state.lines.length > 4 && state.lines.filter(line => line.totalCp <= budgetCp * 0.01).length > state.lines.length * 0.6;
    const coinDistance = actualCoinShare < lootProfile.coinRange[0] ? lootProfile.coinRange[0] - actualCoinShare : actualCoinShare > lootProfile.coinRange[1] ? actualCoinShare - lootProfile.coinRange[1] : 0;
    const coinShareStatus = coinDistance <= 0.000001 ? 'good' : coinDistance <= 0.10 ? 'warning' : 'severe';
    const plausibility = budgetPlausibility(options.contextId, options.budgetGp);
    const qualityFlags = { excessiveDuplicates: duplicateCount > 0, cheapFiller, contextMismatch, magicFocusCollision };

    return {
      version: VERSION,
      options,
      contextId: options.contextId,
      contextName: CONTEXTS[options.contextId].name,
      budgetCp,
      targetItemShare: budgetCp ? targetItemCp / budgetCp : 0,
      coinRange: lootProfile.coinRange,
      magicChance: chance,
      effectiveRarityCap: effectiveRarityCap(options),
      lines: state.lines,
      flavors,
      flavor,
      itemsCp: state.itemsCp,
      coinsCp,
      actualCoinShare,
      coinRangeSatisfied,
      attunementCount: state.attunementCount,
      attunementLimit,
      totalWeight: state.totalWeight,
      weightExceeded: options.useWeightLimit && state.totalWeight > options.maxWeight,
      maxLinesUsed: maxLines,
      unitLimit,
      magicCap,
      contextRichness: analyzeContextRichness(entries, options.contextId),
      budgetPlausibility: budgetPlausibility(options.contextId, options.budgetGp),
      oversizedBudget: isOversizedBudget(options.budgetGp, options.levelBand),
      highValueRepair,
      coinShareStatus,
      contextBudgetStatus: plausibility.status,
      generationRepair: { attempted: highValueRepair.attempted, iterations: highValueRepair.iterations, addedValueCp: highValueRepair.addedValueCp },
      qualityFlags
    };
  }

  function rebuildEditedResult(result, lines, overrides = {}) {
    const safeLines = lines.filter(Boolean).map(line => ({ ...line }));
    const itemsCp = safeLines.reduce((sum, line) => sum + line.totalCp, 0);
    if (itemsCp > result.budgetCp) throw new Error('Редактирование preview превысило исходный бюджет.');
    const coinsCp = result.budgetCp - itemsCp;
    const coinRange = result.coinRange ?? [0, 1];
    const actualCoinShare = result.budgetCp > 0 ? coinsCp / result.budgetCp : 1;
    const coinDistance = actualCoinShare < coinRange[0] ? coinRange[0] - actualCoinShare : actualCoinShare > coinRange[1] ? actualCoinShare - coinRange[1] : 0;
    const names = safeLines.map(line => line.name.toLowerCase());
    const qualityFlags = {
      ...(result.qualityFlags ?? {}),
      excessiveDuplicates: names.length > new Set(names).size,
      magicFocusCollision: safeLines.some(line => line.category === 'focus' && !line.magic && /магическ/iu.test(line.name))
    };
    return {
      ...result,
      ...overrides,
      lines: safeLines,
      itemsCp,
      coinsCp,
      actualCoinShare,
      coinRangeSatisfied: actualCoinShare >= coinRange[0] - 0.000001 && actualCoinShare <= coinRange[1] + 0.000001,
      coinShareStatus: coinDistance <= 0.000001 ? 'good' : coinDistance <= 0.10 ? 'warning' : 'severe',
      qualityFlags,
      attunementCount: safeLines.reduce((sum, line) => sum + (line.attunement ? line.qty : 0), 0),
      totalWeight: safeLines.reduce((sum, line) => sum + (Number(line.weight) || 0) * line.qty, 0)
    };
  }

  function childSeed(result, operation) {
    const base = Number(result.options?.seed);
    return (Number.isFinite(base) ? base : 0) + Math.max(1, Number(operation) || 1);
  }

  function regenerateUnlocked(entries, result, lockedIndices = [], operation = 1) {
    const locked = new Set([...lockedIndices].filter(index => Number.isInteger(index) && result.lines[index]));
    const fixedCp = [...locked].reduce((sum, index) => sum + result.lines[index].totalCp, 0);
    const remainingCp = result.budgetCp - fixedCp;
    if (remainingCp <= 0) return rebuildEditedResult(result, [...locked].sort((a, b) => a - b).map(index => result.lines[index]));

    const generated = generateLoot(entries, {
      ...result.options,
      budgetGp: cpToGp(remainingCp),
      seed: childSeed(result, operation)
    });
    const lockedNames = new Set([...locked].map(index => result.lines[index].name.toLowerCase()));
    const pool = generated.lines.filter(line => !lockedNames.has(line.name.toLowerCase())).map(line => ({ ...line }));
    const combined = [];
    const length = Math.max(result.lines.length, locked.size + pool.length);
    for (let index = 0; index < length; index += 1) {
      if (locked.has(index)) combined[index] = { ...result.lines[index] };
      else if (pool.length) combined[index] = pool.shift();
    }
    combined.push(...pool);
    return rebuildEditedResult(result, combined, { flavors: generated.flavors, flavor: generated.flavor });
  }

  function replaceLootLine(entries, result, lineIndex, operation = 1) {
    const oldLine = result.lines[lineIndex];
    if (!oldLine) return result;
    const availableCp = oldLine.totalCp + result.coinsCp;
    const minCp = Math.floor(oldLine.totalCp * 0.60);
    const maxCp = Math.min(availableCp, Math.ceil(oldLine.totalCp * 1.40));
    const existingNames = new Set(result.lines.filter((_line, index) => index !== lineIndex).map(line => line.name.toLowerCase()));
    let replacement = null;

    for (let attempt = 0; attempt < 12 && !replacement; attempt += 1) {
      const candidateResult = generateLoot(entries, {
        ...result.options,
        budgetGp: result.budgetCp / 100,
        seed: childSeed(result, operation * 31 + attempt)
      });
      replacement = candidateResult.lines.find(line =>
        line.totalCp >= minCp && line.totalCp <= maxCp &&
        line.name !== oldLine.name && line.sourceId !== oldLine.sourceId && !existingNames.has(line.name.toLowerCase())
      ) ?? null;
    }

    const lines = [...result.lines];
    if (replacement) lines[lineIndex] = { ...replacement };
    else lines.splice(lineIndex, 1);
    return rebuildEditedResult(result, lines, { replacementFound: Boolean(replacement) });
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
  analyzeContextRichness,
  isOversizedBudget,
  budgetPlausibility,
  sanitizeOptions,
  generateLoot,
  regenerateUnlocked,
  replaceLootLine
};
