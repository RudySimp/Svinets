/**
 * Svinets static data migrated from the legacy loot table.
 * The legacy table is intentionally kept byte-for-byte equivalent in content.
 */
  const VERSION = '6.0.0';
  const FLAG_SCOPE = 'svinets';
  const FLAG_KEY = 'lootGeneratorV6';
  const LAST_OPTIONS_KEY = 'loot-generator-v6-last-options';

  const SETTINGS = Object.freeze({
    minBudgetGp: 0.01,
    maxBudgetGp: 1_000_000_000,
    hardMaxLines: 24,
    maxMagicItems: 5
  });

  const STRINGS = Object.freeze({
    title: 'Генератор лута',
    generate: 'Сгенерировать',
    saveSettings: 'Сохранить настройки',
    cancel: 'Отмена',
    loot: '⚔ Генератор лута',
    placeSection: '1. Где найден лут',
    typeSection: '2. Что это за лут',
    budgetSection: '3. Сколько это стоит',
    partySection: '4. Партия',
    magicSection: '5. Магия',
    compositionSection: '6. Состав лута',
    limitsSection: '7. Ограничения',
    extraSection: '8. Дополнительно'
  });

  const CONTEXTS = Object.freeze({
  "1K": {
    "name": "Бедный жилой дом",
    "magicAffinity": 0.15,
    "profile": "domestic"
  },
  "2K": {
    "name": "Обычный городской дом",
    "magicAffinity": 0.2,
    "profile": "domestic"
  },
  "3K": {
    "name": "Богатый городской дом",
    "magicAffinity": 0.55,
    "profile": "wealthy"
  },
  "4K": {
    "name": "Дворянское поместье",
    "magicAffinity": 0.9,
    "profile": "wealthy"
  },
  "5K": {
    "name": "Заброшенный дом",
    "magicAffinity": 0.3,
    "profile": "abandoned"
  },
  "6K": {
    "name": "Дом ремесленника",
    "magicAffinity": 0.3,
    "profile": "workshop"
  },
  "7K": {
    "name": "Дом торговца",
    "magicAffinity": 0.55,
    "profile": "merchant"
  },
  "8K": {
    "name": "Дом учёного или мага",
    "magicAffinity": 1.6,
    "profile": "magic_home"
  },
  "9K": {
    "name": "Постоялый двор",
    "magicAffinity": 0.25,
    "profile": "inn"
  },
  "10K": {
    "name": "Таверна",
    "magicAffinity": 0.2,
    "profile": "tavern"
  },
  "11K": {
    "name": "Магазин обычных товаров",
    "magicAffinity": 0.25,
    "profile": "shop"
  },
  "12K": {
    "name": "Оружейная лавка",
    "magicAffinity": 0.6,
    "profile": "weapon_shop"
  },
  "13K": {
    "name": "Алхимическая лавка",
    "magicAffinity": 1.0,
    "profile": "alchemy"
  },
  "14K": {
    "name": "Магическая лавка",
    "magicAffinity": 2.6,
    "profile": "magic_shop"
  },
  "15K": {
    "name": "Склад",
    "magicAffinity": 0.3,
    "profile": "warehouse"
  },
  "16K": {
    "name": "Рыночный склад или торговый обоз",
    "magicAffinity": 0.35,
    "profile": "merchant"
  },
  "17K": {
    "name": "Мастерская ремесленника",
    "magicAffinity": 0.35,
    "profile": "workshop"
  },
  "18K": {
    "name": "Кузница",
    "magicAffinity": 0.45,
    "profile": "forge"
  },
  "19K": {
    "name": "Ферма или сельское хозяйство",
    "magicAffinity": 0.15,
    "profile": "farm"
  },
  "20K": {
    "name": "Мельница или хозяйственная постройка",
    "magicAffinity": 0.15,
    "profile": "farm"
  },
  "21K": {
    "name": "Казарма",
    "magicAffinity": 0.45,
    "profile": "military"
  },
  "22K": {
    "name": "Военный лагерь",
    "magicAffinity": 0.45,
    "profile": "military"
  },
  "23K": {
    "name": "Оружейная или арсенал",
    "magicAffinity": 0.75,
    "profile": "armory"
  },
  "24K": {
    "name": "Сторожевая башня",
    "magicAffinity": 0.35,
    "profile": "military"
  },
  "25K": {
    "name": "Крепость или замок",
    "magicAffinity": 1.1,
    "profile": "fortress"
  },
  "26K": {
    "name": "Дворец",
    "magicAffinity": 1.55,
    "profile": "wealthy"
  },
  "27K": {
    "name": "Тюрьма или темница",
    "magicAffinity": 0.2,
    "profile": "prison"
  },
  "28K": {
    "name": "Храм",
    "magicAffinity": 1.1,
    "profile": "religious"
  },
  "29K": {
    "name": "Монастырь",
    "magicAffinity": 1.0,
    "profile": "religious"
  },
  "30K": {
    "name": "Святилище или культовое место",
    "magicAffinity": 1.7,
    "profile": "religious_magic"
  },
  "31K": {
    "name": "Библиотека или архив",
    "magicAffinity": 0.85,
    "profile": "archive"
  },
  "32K": {
    "name": "Академия или школа магии",
    "magicAffinity": 2.1,
    "profile": "magic_academic"
  },
  "33K": {
    "name": "Лаборатория мага или алхимика",
    "magicAffinity": 2.2,
    "profile": "alchemy_magic"
  },
  "34K": {
    "name": "Обычное подземелье",
    "magicAffinity": 0.75,
    "profile": "dungeon"
  },
  "35K": {
    "name": "Древнее подземелье",
    "magicAffinity": 1.45,
    "profile": "ancient_dungeon"
  },
  "36K": {
    "name": "Сундук или тайник в подземелье",
    "magicAffinity": 1.8,
    "profile": "treasure"
  },
  "37K": {
    "name": "Пещера",
    "magicAffinity": 0.35,
    "profile": "cave"
  },
  "38K": {
    "name": "Шахта",
    "magicAffinity": 0.3,
    "profile": "mine"
  },
  "39K": {
    "name": "Гробница",
    "magicAffinity": 1.6,
    "profile": "tomb"
  },
  "40K": {
    "name": "Склеп или катакомбы",
    "magicAffinity": 1.3,
    "profile": "tomb"
  },
  "41K": {
    "name": "Руины",
    "magicAffinity": 0.9,
    "profile": "ruins"
  },
  "42K": {
    "name": "Логово бандитов",
    "magicAffinity": 0.55,
    "profile": "bandit"
  },
  "43K": {
    "name": "Логово чудовища",
    "magicAffinity": 1.2,
    "profile": "monster"
  },
  "44K": {
    "name": "Лагерь путешественников или наёмников",
    "magicAffinity": 0.4,
    "profile": "camp"
  },
  "45K": {
    "name": "Поле боя",
    "magicAffinity": 0.55,
    "profile": "battlefield"
  },
  "46K": {
    "name": "Торговый корабль",
    "magicAffinity": 0.55,
    "profile": "trade_ship"
  },
  "47K": {
    "name": "Военный корабль",
    "magicAffinity": 0.6,
    "profile": "war_ship"
  },
  "48K": {
    "name": "Пиратский корабль",
    "magicAffinity": 0.8,
    "profile": "pirate_ship"
  },
  "49K": {
    "name": "Кораблекрушение",
    "magicAffinity": 0.7,
    "profile": "shipwreck"
  },
  "50K": {
    "name": "Разное / универсальный контекст",
    "magicAffinity": 1.0,
    "profile": "universal"
  }
});

  const LEGACY_LOOT_TYPE_PROFILES = Object.freeze({
    individual: { label: 'Индивидуальный', coinShare: [0.40, 0.70], maxMagic: 1, magicModifier: 0.6, extraCoinBias: 1.0 },
    chest:      { label: 'Сундук / тайник', coinShare: [0.20, 0.45], maxMagic: 2, magicModifier: 1.0, extraCoinBias: 1.0 },
    hoard:      { label: 'Клад / сокровищница', coinShare: [0.10, 0.35], maxMagic: 3, magicModifier: 1.4, extraCoinBias: 0.9 },
    merchant:   { label: 'Товарный запас / склад', coinShare: [0.05, 0.25], maxMagic: 2, magicModifier: 0.9, extraCoinBias: 0.7 },
    trophy:     { label: 'Трофей с тела босса', coinShare: [0.30, 0.60], maxMagic: 1, magicModifier: 1.1, extraCoinBias: 1.2 },
    trade:      { label: 'Торговая сделка', coinShare: [0.70, 0.95], maxMagic: 0, magicModifier: 1.0, extraCoinBias: 1.5 }
  });

  const LEGACY_LOOT_TYPE_LINE_MULTIPLIER = Object.freeze({
    individual: 0.4,
    chest:      0.9,
    hoard:      1.2,
    merchant:   1.4,
    trophy:     0.6,
    trade:      0.3
  });

  const STACK_MULTIPLIERS = Object.freeze({
    consumable:   [2, 4, 7, 12, 20, 30],
    ammo:         [2, 4, 7, 12, 20, 30],
    food:         [2, 4, 7, 12, 20, 30],
    trade_good:   [3, 6, 12, 24, 40, 60],
    scroll:       [1, 3, 5, 8, 12, 16],
    magic_potion: [1, 3, 5, 8, 12, 16],
    magic_ammo:   [1, 3, 5, 8, 12, 16],
    gemstone:     [2, 4, 7, 12, 18, 28],
    valuable:     [1, 3, 4, 6, 10, 14],
    art_object:   [1, 3, 4, 6, 10, 14],
    container:    [1, 3, 4, 5, 7, 10],
    gear:         [1, 3, 4, 5, 7, 10]
  });

  const LEGACY_PARTY_LEVEL_PROFILES = Object.freeze({
    '1-4':   { label: '1–4',   min: 1,  max: 4,  rarityCap: 'uncommon', maxMagic: 2, rarityWeights: { common: 60, uncommon: 35, rare: 5,  veryRare: 0,  legendary: 0 } },
    '5-10':  { label: '5–10',  min: 5,  max: 10, rarityCap: 'rare',     maxMagic: 3, rarityWeights: { common: 35, uncommon: 40, rare: 20, veryRare: 5,  legendary: 0 } },
    '11-16': { label: '11–16', min: 11, max: 16, rarityCap: 'veryRare', maxMagic: 3, rarityWeights: { common: 15, uncommon: 30, rare: 35, veryRare: 18, legendary: 2 } },
    '17-20': { label: '17–20', min: 17, max: 20, rarityCap: 'legendary', maxMagic: 4, rarityWeights: { common: 5,  uncommon: 15, rare: 30, veryRare: 35, legendary: 15 } },
    any:     { label: 'Любой',  min: 1,  max: 20, rarityCap: 'legendary', maxMagic: 5, rarityWeights: { common: 25, uncommon: 30, rare: 25, veryRare: 15, legendary: 5 } }
  });

  const LEGACY_PREFERENCE_WEIGHTS = Object.freeze({
    balanced: {},
    combat:      { weapon: 2.0, armor: 1.8, ammo: 1.7, magic_weapon: 1.7, magic_armor: 1.6, consumable: 1.2, food: 0.6, leisure: 0.4, instrument: 0.4, valuable: 0.8 },
    utility:     { gear: 1.8, tool: 1.7, container: 1.4, variant: 1.3, focus: 1.2, weapon: 0.6, armor: 0.6 },
    magical:     { focus: 1.8, scroll: 1.8, magic_ring: 1.4, magic_rod: 1.4, magic_staff: 1.4, magic_wand: 1.4, wondrous: 1.4, magic_potion: 1.2, magic_weapon: 1.3, magic_armor: 1.3, weapon: 0.8, armor: 0.8 },
    consumables: { consumable: 2.2, ammo: 1.8, food: 1.4, magic_potion: 1.5, scroll: 1.3, magic_ammo: 1.5 },
    valuables:   { valuable: 2.0, gemstone: 1.8, art_object: 1.8, trade_good: 1.5, trinket: 1.2, weapon: 0.7, armor: 0.7, gear: 0.7 }
  });

  const LEGACY_LOOT_TYPE_CATEGORY_WEIGHTS = Object.freeze({
    individual: { gear: 1.35, food: 1.2, weapon: 1.05, ammo: 1.05, valuable: 0.7, art_object: 0.45, gemstone: 0.6, trade_good: 0.5, large_vehicle: 0.02 },
    chest:      { valuable: 1.35, gemstone: 1.3, art_object: 1.2, gear: 1.0, weapon: 1.0, armor: 0.9, container: 0.65 },
    hoard:      { valuable: 1.8, gemstone: 2.1, art_object: 2.0, trade_good: 1.25, weapon: 0.9, armor: 0.9, gear: 0.65, food: 0.25 },
    merchant:   { trade_good: 2.1, gear: 1.35, container: 1.35, variant: 1.5, food: 1.25, tool: 1.25, valuable: 1.15, weapon: 1.0, armor: 0.9 },
    trophy:     { valuable: 1.8, gemstone: 1.55, art_object: 1.45, weapon: 1.25, armor: 1.1, gear: 0.6, food: 0.2 },
    trade:      { trade_good: 2.2, valuable: 2.0, gemstone: 1.7, art_object: 1.5, gear: 0.45, food: 0.55, weapon: 0.35, armor: 0.35 }
  });

  const RARITY_ORDER = Object.freeze(['common', 'uncommon', 'rare', 'veryRare', 'legendary']);
  const RARITY_RANK = Object.freeze(Object.fromEntries(RARITY_ORDER.map((r, i) => [r, i])));
  const RARITY_META = Object.freeze({
    common:    { label: 'Обычный',      neuter: 'Обычное',      masculine: 'Обычный',      feminine: 'Обычная',      plural: 'Обычные',      bonusGp: 100,    color: '#777' },
    uncommon:  { label: 'Необычный',    neuter: 'Необычное',    masculine: 'Необычный',    feminine: 'Необычная',    plural: 'Необычные',    bonusGp: 400,    color: '#2f8f46' },
    rare:      { label: 'Редкий',       neuter: 'Редкое',       masculine: 'Редкий',       feminine: 'Редкая',       plural: 'Редкие',       bonusGp: 4000,   color: '#2866b2' },
    veryRare:  { label: 'Очень редкий', neuter: 'Очень редкое', masculine: 'Очень редкий', feminine: 'Очень редкая', plural: 'Очень редкие', bonusGp: 40000,  color: '#7c3fb1' },
    legendary: { label: 'Легендарный',  neuter: 'Легендарное',  masculine: 'Легендарный',  feminine: 'Легендарная',  plural: 'Легендарные',  bonusGp: 200000, color: '#b56a16' }
  });

  const RARITY_BY_BONUS = Object.freeze({
    100: 'common',
    400: 'uncommon',
    4000: 'rare',
    40000: 'veryRare',
    200000: 'legendary'
  });

  const BASE_CATEGORY_WEIGHT = Object.freeze({
    weapon: 0.95, armor: 0.78, tool: 1.00, leisure: 0.55, instrument: 0.52,
    consumable: 0.95, gear: 1.15, container: 0.72, valuable: 0.95, food: 1.05,
    ammo: 0.88, focus: 0.65, scroll: 0.58, animal: 0.24, vehicle: 0.18,
    large_vehicle: 0.055, barding: 0.18, tack: 0.35, supply: 0.75, variant: 1.18,
    gemstone: 0.92, art_object: 0.82, trade_good: 1.0, trinket: 0.7,
    magic_weapon: 0.8, magic_armor: 0.75, magic_potion: 0.9, magic_ring: 0.65,
    magic_rod: 0.55, magic_staff: 0.55, magic_wand: 0.6, wondrous: 0.75,
    magic_ammo: 0.7, artifact: 0.01
  });

  const PROFILE_WEIGHTS = Object.freeze({
    domestic:        { food: 1.55, gear: 1.45, container: 1.25, leisure: 1.10, variant: 1.35, weapon: 0.45, armor: 0.18, tool: 0.80, valuable: 0.65 },
    wealthy:         { valuable: 1.65, art_object: 1.6, gemstone: 1.45, variant: 1.45, gear: 1.05, instrument: 1.15, weapon: 0.75, armor: 0.65, food: 0.85 },
    abandoned:       { gear: 1.25, container: 1.1, weapon: 0.7, tool: 0.55, food: 0.35, variant: 1.15 },
    workshop:        { tool: 2.2, gear: 1.5, container: 1.1, variant: 1.2, weapon: 0.65, armor: 0.45 },
    merchant:        { trade_good: 1.8, valuable: 1.45, gear: 1.3, container: 1.25, variant: 1.45, food: 0.85, weapon: 0.85, armor: 0.65 },
    inn:             { food: 1.85, leisure: 1.55, instrument: 1.1, gear: 1.05, variant: 1.35, weapon: 0.55, armor: 0.25 },
    tavern:          { food: 2.1, leisure: 1.8, instrument: 1.2, gear: 0.95, variant: 1.25, weapon: 0.5, armor: 0.2 },
    shop:            { gear: 1.6, tool: 1.35, container: 1.35, food: 1.1, variant: 1.4, trade_good: 1.5, valuable: 1.05 },
    weapon_shop:     { weapon: 2.35, armor: 1.35, ammo: 1.7, gear: 0.6, tool: 0.8 },
    alchemy:         { consumable: 2.2, tool: 1.7, container: 1.25, gear: 1.0, focus: 0.85, variant: 1.2 },
    magic_shop:      { focus: 1.45, scroll: 1.35, consumable: 1.15, valuable: 1.15, variant: 1.2, gear: 0.85, magic_potion: 1.4, wondrous: 1.4 },
    warehouse:       { container: 1.55, gear: 1.35, trade_good: 1.5, food: 1.0, tool: 0.9, variant: 1.25, weapon: 0.65 },
    forge:           { weapon: 1.85, armor: 1.45, tool: 2.0, gear: 1.15, variant: 1.05 },
    farm:            { food: 1.85, gear: 1.45, tool: 1.25, animal: 0.9, supply: 1.2, variant: 1.0, weapon: 0.35, armor: 0.1 },
    military:        { weapon: 1.7, armor: 1.25, ammo: 1.45, gear: 1.25, tool: 0.8, food: 0.85, variant: 1.1 },
    armory:          { weapon: 2.4, armor: 2.1, ammo: 1.9, gear: 0.55, tool: 0.75 },
    fortress:        { weapon: 1.6, armor: 1.4, ammo: 1.35, gear: 1.1, valuable: 1.0, variant: 1.1, vehicle: 0.7, animal: 0.6 },
    prison:          { gear: 1.5, container: 1.2, weapon: 0.8, tool: 0.8, variant: 1.1 },
    religious:       { focus: 1.65, gear: 1.05, valuable: 1.15, variant: 1.25, scroll: 1.05, weapon: 0.5, art_object: 1.2 },
    religious_magic: { focus: 1.8, valuable: 1.3, scroll: 1.25, variant: 1.2, gear: 0.9, art_object: 1.3 },
    archive:         { variant: 1.9, gear: 1.15, tool: 1.2, focus: 0.75, scroll: 1.25, weapon: 0.2, armor: 0.1 },
    magic_home:      { focus: 1.4, scroll: 1.2, tool: 1.3, variant: 1.3, gear: 1.0, wondrous: 1.2 },
    magic_academic:  { focus: 1.65, scroll: 1.55, tool: 1.45, variant: 1.25, gear: 0.9, wondrous: 1.2 },
    alchemy_magic:   { consumable: 1.65, tool: 1.65, focus: 1.25, scroll: 1.1, variant: 1.2, container: 1.2, magic_potion: 1.4 },
    dungeon:         { weapon: 1.15, armor: 0.95, gear: 1.25, valuable: 1.1, container: 1.15, variant: 1.1, food: 0.45, gemstone: 1.1 },
    ancient_dungeon: { valuable: 1.3, gemstone: 1.35, art_object: 1.25, weapon: 1.1, armor: 1.0, focus: 1.1, scroll: 1.0, variant: 1.15, gear: 0.9 },
    treasure:        { valuable: 1.8, gemstone: 1.9, art_object: 1.8, weapon: 1.15, armor: 1.0, focus: 1.05, scroll: 1.0, container: 0.65, variant: 1.15, gear: 0.7 },
    cave:            { gear: 1.2, weapon: 0.95, tool: 0.8, food: 0.45, animal: 0.35, variant: 0.8 },
    mine:            { tool: 1.8, gear: 1.35, weapon: 0.75, container: 0.9, variant: 0.85, gemstone: 1.35 },
    tomb:            { valuable: 1.55, gemstone: 1.45, art_object: 1.5, focus: 1.25, weapon: 0.9, armor: 0.8, scroll: 1.1, container: 1.0, variant: 1.15, food: 0.15 },
    ruins:           { gear: 1.0, valuable: 1.15, art_object: 1.15, weapon: 0.85, armor: 0.7, variant: 1.0, tool: 0.65 },
    bandit:          { weapon: 1.55, armor: 1.05, gear: 1.3, food: 0.9, valuable: 0.9, variant: 1.15, ammo: 1.25 },
    monster:         { valuable: 1.2, gemstone: 1.2, weapon: 0.85, armor: 0.65, gear: 0.65, food: 0.35, variant: 0.7 },
    camp:            { gear: 1.55, food: 1.4, weapon: 1.2, armor: 0.75, tool: 0.95, ammo: 1.0, variant: 1.0 },
    battlefield:     { weapon: 1.9, armor: 1.65, ammo: 1.45, gear: 0.8, tool: 0.45, food: 0.2, variant: 0.8 },
    trade_ship:      { variant: 1.65, gear: 1.3, container: 1.35, tool: 1.1, valuable: 1.15, trade_good: 1.55, food: 1.0, weapon: 0.75, large_vehicle: 0.15 },
    war_ship:        { weapon: 1.65, armor: 1.2, ammo: 1.45, gear: 1.35, variant: 1.45, tool: 1.0, large_vehicle: 0.15 },
    pirate_ship:     { weapon: 1.55, gear: 1.35, valuable: 1.25, gemstone: 1.2, variant: 1.45, ammo: 1.15, container: 1.2, large_vehicle: 0.12 },
    shipwreck:       { gear: 1.25, variant: 1.35, container: 1.1, weapon: 0.8, valuable: 1.15, art_object: 1.15, large_vehicle: 0.03 },
    universal:       {}
  });

  const MAGIC_CATEGORIES = new Set([
    'magic_weapon', 'magic_armor', 'magic_potion', 'magic_ring', 'magic_rod',
    'magic_staff', 'magic_wand', 'wondrous', 'magic_ammo', 'scroll', 'artifact'
  ]);

  const ATTUNEMENT_DEFAULT_CATEGORIES = new Set([
    'magic_ring', 'magic_rod', 'magic_staff', 'magic_wand', 'wondrous'
  ]);

  const CONSUMABLE_CATEGORIES = new Set([
    'consumable', 'ammo', 'food', 'magic_potion', 'scroll', 'magic_ammo'
  ]);

  const ANIMAL_TRANSPORT_CATEGORIES = new Set([
    'animal', 'vehicle', 'large_vehicle', 'tack', 'barding', 'supply'
  ]);

  const SINGLE_QTY_CATEGORIES = new Set([
    'armor', 'tool', 'focus', 'instrument', 'animal', 'vehicle', 'large_vehicle',
    'barding', 'tack', 'magic_ring', 'magic_rod', 'magic_staff', 'magic_wand',
    'wondrous', 'magic_weapon', 'magic_armor'
  ]);

  const CATEGORY_LABELS = Object.freeze({
    weapon: 'Оружие', armor: 'Доспехи', tool: 'Инструменты', leisure: 'Игры и досуг',
    instrument: 'Музыкальные инструменты', consumable: 'Расходники', gear: 'Снаряжение',
    container: 'Контейнеры', valuable: 'Ценности', food: 'Еда и напитки', ammo: 'Боеприпасы',
    focus: 'Фокусы', scroll: 'Свитки', animal: 'Животные', vehicle: 'Транспорт',
    large_vehicle: 'Крупный транспорт', barding: 'Бардинг', tack: 'Упряжь и седла',
    supply: 'Припасы', variant: 'Тематические варианты', gemstone: 'Драгоценные камни',
    art_object: 'Предметы искусства', trade_good: 'Торговые товары', trinket: 'Безделушки',
    magic_weapon: 'Магическое оружие', magic_armor: 'Магические доспехи',
    magic_potion: 'Магические зелья', magic_ring: 'Магические кольца', magic_rod: 'Магические жезлы',
    magic_staff: 'Магические посохи', magic_wand: 'Магические палочки', wondrous: 'Чудесные предметы',
    magic_ammo: 'Магические боеприпасы'
  });

  const CONTEXT_GROUPS = Object.freeze({
    housing: { id: '01', label: 'Жильё' },
    trade: { id: '02', label: 'Торговля' },
    craft: { id: '03', label: 'Ремесло и производство' },
    military: { id: '04', label: 'Военные объекты' },
    nobility: { id: '05', label: 'Власть и знать' },
    religion: { id: '06', label: 'Религия' },
    knowledge: { id: '07', label: 'Магия и знания' },
    dungeon: { id: '08', label: 'Подземелья' },
    burial: { id: '09', label: 'Погребения' },
    crime: { id: '10', label: 'Преступный мир' },
    lair: { id: '11', label: 'Логова существ' },
    wilderness: { id: '12', label: 'Дикая местность' },
    travel: { id: '13', label: 'Путешествия и караваны' },
    maritime: { id: '14', label: 'Море и корабли' },
    battlefield: { id: '15', label: 'Поле боя' },
    miscellaneous: { id: '16', label: 'Разное' }
  });

  const RICHNESS_PROFILES = Object.freeze({
    poor: { coinRange: [0.35, 0.65], highValue: 0.25, softMin: 1, softMax: 5_000 },
    normal: { coinRange: [0.20, 0.45], highValue: 0.55, softMin: 250, softMax: 25_000 },
    rich: { coinRange: [0.10, 0.35], highValue: 0.85, softMin: 1_000, softMax: 100_000 },
    treasure: { coinRange: [0.05, 0.30], highValue: 1.15, softMin: 5_000, softMax: 500_000 }
  });

  const CONTEXT_CATEGORY_PROFILES = Object.freeze({
    domestic: { food: 5, gear: 5, container: 4, clothing: 3, valuable: 1.2, jewelry: 0.8, magic: 0.4, weapon: 1, armor: 0.5 },
    wealthy: { jewelry: 9, art_object: 8, valuable: 7, gemstone: 6, clothing: 6, document: 4, weapon: 2, magic: 2.5, gear: 1 },
    workshop: { tool: 8, gear: 7, trade_good: 6, container: 4, weapon: 3, armor: 2, valuable: 1, food: 2 },
    merchant: { trade_good: 8, gear: 6, container: 5, valuable: 5, jewelry: 3, gemstone: 3, food: 3, weapon: 2 },
    military: { weapon: 8, armor: 7, ammo: 8, supply: 7, gear: 5, food: 4, valuable: 1, jewelry: 0.5, magic: 1.5 },
    armory: { weapon: 9, armor: 9, ammo: 8, gear: 3, valuable: 1, magic: 2 },
    religious: { relic: 8, jewelry: 7, art_object: 6, valuable: 6, focus: 5, scroll: 4, magic: 4, weapon: 2 },
    knowledge: { document: 8, scroll: 7, magic: 6, tool: 5, focus: 5, valuable: 3, gear: 2 },
    dungeon: { gemstone: 8, jewelry: 8, art_object: 7, relic: 6, magic: 6, weapon: 4, armor: 3, scroll: 4, consumable: 2, gear: 0.5, food: 0 },
    burial: { relic: 9, jewelry: 8, gemstone: 7, art_object: 7, magic: 6, weapon: 4, armor: 3, food: 0.1 },
    crime: { weapon: 7, gear: 6, valuable: 5, trade_good: 5, jewelry: 4, ammo: 5, magic: 2 },
    lair: { gemstone: 8, valuable: 7, trophy: 6, weapon: 4, armor: 3, food: 3, gear: 2, magic: 4 },
    wilderness: { food: 7, gear: 6, tool: 5, animal: 5, gemstone: 3, valuable: 2, magic: 1 },
    travel: { trade_good: 7, gear: 6, food: 6, container: 5, weapon: 4, ammo: 4, valuable: 3 },
    maritime: { trade_good: 8, gear: 6, container: 6, weapon: 5, ammo: 5, valuable: 5, gemstone: 4, food: 5, magic: 2 },
    battlefield: { weapon: 9, armor: 8, ammo: 8, supply: 5, gear: 4, valuable: 2, magic: 2 },
    universal: { valuable: 3, gemstone: 3, art_object: 3, trade_good: 3, weapon: 3, armor: 3, magic: 3, gear: 3 }
  });

  const CONTEXT_GROUP_BY_ID = Object.freeze({
    '1K': 'housing', '2K': 'housing', '3K': 'housing', '4K': 'nobility', '5K': 'housing', '6K': 'craft', '7K': 'trade', '8K': 'knowledge', '9K': 'housing', '10K': 'trade', '11K': 'trade', '12K': 'trade', '13K': 'craft', '14K': 'knowledge', '15K': 'trade', '16K': 'travel', '17K': 'craft', '18K': 'craft', '19K': 'wilderness', '20K': 'craft', '21K': 'military', '22K': 'military', '23K': 'military', '24K': 'military', '25K': 'nobility', '26K': 'nobility', '27K': 'military', '28K': 'religion', '29K': 'religion', '30K': 'religion', '31K': 'knowledge', '32K': 'knowledge', '33K': 'knowledge', '34K': 'dungeon', '35K': 'dungeon', '36K': 'dungeon', '37K': 'lair', '38K': 'craft', '39K': 'burial', '40K': 'burial', '41K': 'dungeon', '42K': 'crime', '43K': 'lair', '44K': 'travel', '45K': 'battlefield', '46K': 'maritime', '47K': 'maritime', '48K': 'maritime', '49K': 'maritime', '50K': 'miscellaneous'
  });

  const NEW_CONTEXTS = Object.freeze([
    ['51K', 'Ювелирная лавка', 'trade', 'rich', 1.7, 'merchant'], ['52K', 'Казначейство или банк', 'trade', 'treasure', 1.4, 'treasure'], ['53K', 'Сейф торговца', 'trade', 'rich', 1.5, 'merchant'], ['54K', 'Богатый торговый склад', 'trade', 'rich', 1.2, 'merchant'], ['55K', 'Сокровищница храма', 'religion', 'treasure', 1.8, 'religious'],
    ['56K', 'Спальня дворянина', 'nobility', 'rich', 1.3, 'wealthy'], ['57K', 'Кабинет дворянина', 'nobility', 'rich', 1.1, 'wealthy'], ['58K', 'Комната прислуги', 'housing', 'normal', 0.4, 'domestic'], ['59K', 'Караульный пост', 'military', 'normal', 0.4, 'military'], ['60K', 'Хранилище конфискованных вещей', 'military', 'rich', 1.0, 'fortress'],
    ['61K', 'Зал гильдии', 'trade', 'rich', 0.9, 'merchant'], ['62K', 'Воровская гильдия', 'crime', 'rich', 1.1, 'bandit'], ['63K', 'Тайник контрабандистов', 'crime', 'rich', 0.9, 'bandit'],
    ['64K', 'Кабинет мага', 'knowledge', 'rich', 2.0, 'magic_home'], ['65K', 'Хранилище мага', 'knowledge', 'treasure', 2.5, 'magic_shop'], ['66K', 'Магический архив', 'knowledge', 'rich', 2.2, 'magic_academic'], ['67K', 'Алхимическая лаборатория', 'knowledge', 'rich', 1.8, 'alchemy_magic'], ['68K', 'Друидское святилище', 'religion', 'rich', 1.4, 'religious_magic'], ['69K', 'Логово некроманта', 'lair', 'treasure', 2.5, 'religious_magic'],
    ['70K', 'Заброшенная башня', 'dungeon', 'rich', 1.0, 'ruins'], ['71K', 'Древний храм', 'religion', 'treasure', 1.8, 'religious_magic'], ['72K', 'Драконья сокровищница', 'lair', 'treasure', 2.2, 'treasure'], ['73K', 'Логово великана', 'lair', 'rich', 1.2, 'monster'], ['74K', 'Лагерь гоблинов', 'lair', 'normal', 0.5, 'bandit'], ['75K', 'Лагерь орков', 'lair', 'normal', 0.7, 'bandit'], ['76K', 'Гробница нежити', 'burial', 'treasure', 1.8, 'tomb'],
    ['77K', 'Кабинет начальника шахты', 'craft', 'rich', 0.8, 'mine'], ['78K', 'Склад руды', 'craft', 'rich', 0.7, 'mine'], ['79K', 'Торговый караван', 'travel', 'rich', 0.8, 'merchant'], ['80K', 'Повозка торговца', 'travel', 'normal', 0.6, 'merchant'], ['81K', 'Брошенная повозка', 'travel', 'normal', 0.35, 'travel'],
    ['82K', 'Капитанская каюта торгового корабля', 'maritime', 'rich', 1.1, 'trade_ship'], ['83K', 'Трюм торгового корабля', 'maritime', 'rich', 0.8, 'trade_ship'], ['84K', 'Капитанская каюта пиратского корабля', 'maritime', 'rich', 1.3, 'pirate_ship'], ['85K', 'Пиратский тайник', 'maritime', 'treasure', 1.4, 'pirate_ship'], ['86K', 'Оружейная военного корабля', 'maritime', 'normal', 0.8, 'war_ship'], ['87K', 'Капитанская каюта затонувшего корабля', 'maritime', 'rich', 1.0, 'shipwreck'], ['88K', 'Трюм кораблекрушения', 'maritime', 'normal', 0.7, 'shipwreck'], ['89K', 'Офицерская палатка на поле боя', 'battlefield', 'rich', 0.8, 'battlefield'], ['90K', 'Тело павшего офицера', 'battlefield', 'normal', 0.8, 'battlefield']
  ].map(([id, name, group, richness, magicAffinity, profile]) => ({ id, name, categoryId: group, richness, magicAffinity, profile })));

  const RICHNESS_BY_PROFILE = Object.freeze({ domestic: 'poor', abandoned: 'poor', prison: 'poor', farm: 'poor', tavern: 'normal', inn: 'normal', workshop: 'normal', forge: 'normal', military: 'normal', armory: 'normal', battlefield: 'normal', dungeon: 'normal', cave: 'normal', mine: 'normal', camp: 'normal', bandit: 'normal', monster: 'normal', trade_ship: 'rich', war_ship: 'normal', pirate_ship: 'rich', shipwreck: 'rich', wealthy: 'rich', merchant: 'rich', weapon_shop: 'rich', alchemy: 'rich', magic_shop: 'rich', warehouse: 'rich', fortress: 'rich', religious: 'rich', religious_magic: 'rich', archive: 'rich', magic_home: 'rich', magic_academic: 'rich', alchemy_magic: 'rich', ancient_dungeon: 'rich', ruins: 'rich', tomb: 'rich', treasure: 'treasure', universal: 'normal' });
  const contextWeights = profile => Object.freeze({ ...(CONTEXT_CATEGORY_PROFILES[profile] ?? CONTEXT_CATEGORY_PROFILES.universal) });
  const NEW_CONTEXT_LEGACY_FALLBACK = Object.freeze({ trade: '16K', nobility: '26K', housing: '2K', military: '21K', religion: '28K', knowledge: '32K', dungeon: '35K', burial: '39K', crime: '42K', lair: '43K', craft: '38K', travel: '44K', maritime: '46K', battlefield: '45K' });
  const enrichContext = (id, context) => {
    const profile = context.profile ?? 'universal';
    const richness = context.richness ?? RICHNESS_BY_PROFILE[profile] ?? 'normal';
    const group = context.categoryId ?? CONTEXT_GROUP_BY_ID[id] ?? 'miscellaneous';
    const richnessMeta = RICHNESS_PROFILES[richness];
    return Object.freeze({ ...context, id, legacyId: context.legacyId ?? (id === '50K' || !id.endsWith('K') ? id : (id in CONTEXT_GROUP_BY_ID ? id : NEW_CONTEXT_LEGACY_FALLBACK[group] ?? '50K')), categoryId: group, description: context.description ?? context.name, richness, categoryWeights: context.categoryWeights ?? contextWeights(profile), coinRange: context.coinRange ?? richnessMeta.coinRange, tags: context.tags ?? [], excludeTags: context.excludeTags ?? [], recommendedBudget: context.recommendedBudget ?? { softMin: richnessMeta.softMin, softMax: richnessMeta.softMax } });
  };
  const CONTEXTS_V6 = Object.freeze({
    ...Object.fromEntries(Object.entries(CONTEXTS).map(([id, context]) => [id, enrichContext(id, { ...context, categoryId: CONTEXT_GROUP_BY_ID[id] })])),
    ...Object.fromEntries(NEW_CONTEXTS.map(context => [context.id, enrichContext(context.id, context)]))
  });

  // -------------------- 2. МАСТЕР-ТАБЛИЦА --------------------

  const LOOT_TSV = String.raw`MASTER LOOT TABLE v4 — D&D 5e 2024 / Foundry VTT
1329 raw rows. Removed IDs: L0844, L0845, L0901, L0902, L0903, L0904, L0905; grammar and tracked weights cleaned for final release.

ID	Название	Цена_GP	Контексты	Тип_строки	Категория	Макс_кол-во	Основание_цены	Примечание	Attunement	MinLevel	MaxLevel	Rarity	Weight	Tags
L0001	Дубинка	0.1	1К 2К 5К 9К 10К 19К 20К 22К 27К 34К 37К 41К 42К 43К 44К 46К 48К 49К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0002	Кинжал	2	1К 2К 3К 4К 5К 6К 7К 8К 9К 10К 11К 12К 18К 21К 22К 23К 25К 26К 27К 34К 35К 36К 39К 40К 41К 42К 44К 45К 46К 47К 48К 49К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						1	
L0003	Большая дубина	0.2	5К 19К 20К 22К 34К 37К 41К 42К 43К 44К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						10	
L0004	Ручной топор	5	1К 2К 5К 6К 11К 12К 17К 18К 19К 20К 21К 22К 23К 34К 37К 38К 41К 42К 43К 44К 45К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0005	Метательное копьё	0.5	12К 21К 22К 23К 24К 25К 34К 35К 42К 43К 44К 45К 47К 48К	priced	weapon	2	Официальная базовая цена D&D 5e 2024						2	
L0006	Лёгкий молот	2	6К 12К 17К 18К 21К 22К 23К 34К 38К 42К 44К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0007	Булава	5	12К 21К 22К 23К 25К 28К 29К 30К 34К 35К 36К 39К 40К 42К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						4	
L0008	Боевой посох	0.2	1К 2К 5К 8К 28К 29К 30К 32К 33К 34К 35К 37К 39К 40К 41К 43К 44К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						4	
L0009	Серп	1	1К 2К 6К 11К 17К 19К 20К 37К 44К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0010	Копьё	1	12К 19К 21К 22К 23К 24К 25К 34К 35К 37К 39К 41К 42К 43К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						3	
L0011	Дротик	0.05	12К 21К 22К 23К 24К 34К 42К 44К 45К 47К 48К	priced	weapon	3	Официальная базовая цена D&D 5e 2024						0.25	
L0012	Лёгкий арбалет	25	3К 4К 7К 12К 21К 22К 23К 24К 25К 34К 35К 36К 42К 44К 45К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						5	
L0013	Короткий лук	25	12К 19К 21К 22К 23К 24К 34К 35К 37К 42К 43К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0014	Праща	0.1	1К 2К 5К 19К 22К 34К 37К 42К 43К 44К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0015	Боевой топор	10	4К 12К 18К 21К 22К 23К 25К 34К 35К 36К 39К 41К 42К 44К 45К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						4	
L0016	Цеп	10	12К 21К 22К 23К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0017	Глефа	20	12К 21К 22К 23К 24К 25К 26К 34К 35К 36К 39К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						6	
L0018	Секира	30	4К 12К 18К 21К 22К 23К 25К 34К 35К 36К 39К 41К 42К 43К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						7	
L0019	Двуручный меч	50	4К 12К 21К 22К 23К 25К 26К 34К 35К 36К 39К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						6	
L0020	Алебарда	20	12К 21К 22К 23К 24К 25К 26К 34К 35К 36К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						6	
L0021	Ланс	10	4К 21К 22К 23К 25К 26К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						6	
L0022	Длинный меч	15	3К 4К 12К 21К 22К 23К 25К 26К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						3	
L0023	Кувалда	10	6К 12К 17К 18К 21К 22К 23К 34К 35К 38К 42К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						10	
L0024	Моргенштерн	15	12К 21К 22К 23К 25К 34К 35К 36К 39К 40К 42К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						4	
L0025	Пика	5	21К 22К 23К 24К 25К 34К 35К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						18	
L0026	Рапира	25	3К 4К 7К 12К 25К 26К 36К 42К 44К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0027	Скимитар	25	7К 12К 21К 22К 23К 34К 35К 36К 42К 44К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						3	
L0028	Короткий меч	10	3К 4К 12К 21К 22К 23К 25К 34К 35К 36К 39К 40К 42К 44К 45К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0029	Трезубец	5	12К 22К 23К 34К 35К 37К 43К 44К 46К 47К 48К 49К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						4	
L0030	Боевой молот	15	4К 12К 18К 21К 22К 23К 25К 34К 35К 36К 38К 39К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						5	
L0031	Боевой клевец	5	12К 18К 21К 22К 23К 25К 34К 35К 38К 42К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0032	Кнут	2	1К 3К 4К 7К 12К 19К 21К 22К 26К 27К 42К 44К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						3	
L0033	Духовая трубка	10	7К 12К 13К 22К 33К 34К 37К 42К 43К 44К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						1	
L0034	Ручной арбалет	75	3К 4К 7К 12К 21К 23К 25К 26К 36К 42К 44К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						3	
L0035	Тяжёлый арбалет	50	12К 21К 22К 23К 24К 25К 34К 35К 36К 42К 44К 45К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						18	
L0036	Длинный лук	50	3К 4К 12К 21К 22К 23К 24К 25К 34К 35К 36К 42К 44К 45К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						2	
L0037	Мушкет	500	3К 4К 12К 21К 23К 25К 26К 36К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						10	
L0038	Пистолет	250	3К 4К 7К 12К 21К 23К 25К 26К 36К 42К 46К 47К 48К	priced	weapon	1	Официальная базовая цена D&D 5e 2024						3	
L0039	Стёганый доспех	5	12К 21К 22К 23К 34К 42К 44К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						8	
L0040	Кожаный доспех	10	3К 12К 21К 22К 23К 34К 35К 36К 37К 42К 43К 44К 45К 46К 48К	priced	armor	1	Официальная базовая цена D&D 5e 2024						10	
L0041	Клёпаный кожаный доспех	45	4К 12К 21К 22К 23К 25К 34К 35К 36К 42К 44К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						13	
L0042	Шкурный доспех	10	12К 22К 34К 35К 37К 42К 43К 44К	priced	armor	1	Официальная базовая цена D&D 5e 2024						12	
L0043	Кольчужная рубаха	50	4К 12К 21К 22К 23К 25К 34К 35К 36К 42К 44К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						20	
L0044	Чешуйчатый доспех	50	12К 21К 22К 23К 25К 34К 35К 36К 42К 44К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						45	
L0045	Кираса	400	4К 12К 21К 23К 25К 26К 35К 36К 39К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						20	
L0046	Полулаты	750	4К 12К 23К 25К 26К 35К 36К 39К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						40	
L0047	Кольчатый доспех	30	12К 21К 22К 23К 25К 34К 35К 42К 44К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						40	
L0048	Кольчуга	75	4К 12К 21К 22К 23К 25К 34К 35К 36К 39К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						55	
L0049	Наборный доспех	200	4К 12К 21К 23К 25К 26К 35К 36К 39К 45К	priced	armor	1	Официальная базовая цена D&D 5e 2024						60	
L0050	Латы	1500	4К 12К 23К 25К 26К 35К 36К 39К	priced	armor	1	Официальная базовая цена D&D 5e 2024						65	
L0051	Щит	10	3К 4К 12К 21К 22К 23К 24К 25К 26К 28К 34К 35К 36К 42К 44К 45К 47К	priced	armor	1	Официальная базовая цена D&D 5e 2024						6	
L0052	Набор алхимика	50	3К 7К 8К 13К 14К 15К 17К 32К 33К 35К 36К	priced	tool	1	Официальная базовая цена D&D 5e 2024						8	
L0053	Принадлежности пивовара	20	6К 9К 10К 15К 17К 20К 46К	priced	tool	1	Официальная базовая цена D&D 5e 2024						9	
L0054	Принадлежности каллиграфа	10	3К 4К 7К 8К 17К 26К 28К 29К 31К 32К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0055	Инструменты плотника	8	1К 2К 6К 15К 17К 19К 20К 21К 22К 25К 46К 47К 48К	priced	tool	1	Официальная базовая цена D&D 5e 2024						6	
L0056	Инструменты картографа	15	4К 7К 8К 17К 21К 22К 25К 26К 31К 32К 44К 46К 47К 48К	priced	tool	1	Официальная базовая цена D&D 5e 2024						6	
L0057	Инструменты сапожника	5	6К 11К 17К 21К 22К 25К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0058	Кухонная утварь	1	1К 2К 3К 4К 6К 9К 10К 17К 19К 20К 21К 22К 25К 26К 28К 29К 44К 46К 47К	priced	tool	1	Официальная базовая цена D&D 5e 2024						8	
L0059	Инструменты стеклодува	30	6К 7К 13К 14К 17К 32К 33К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0060	Инструменты ювелира	25	3К 4К 7К 14К 17К 25К 26К 32К 33К	priced	tool	1	Официальная базовая цена D&D 5e 2024						2	
L0061	Инструменты кожевника	5	6К 11К 12К 17К 21К 22К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0062	Инструменты каменщика	10	6К 17К 25К 26К 28К 29К 34К 38К 41К	priced	tool	1	Официальная базовая цена D&D 5e 2024						8	
L0063	Принадлежности художника	10	3К 4К 6К 17К 26К 28К 29К 31К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0064	Инструменты гончара	10	6К 11К 17К 19К 20К	priced	tool	1	Официальная базовая цена D&D 5e 2024						3	
L0065	Инструменты кузнеца	20	6К 12К 17К 18К 21К 22К 23К 25К 47К	priced	tool	1	Официальная базовая цена D&D 5e 2024						8	
L0066	Инструменты жестянщика	50	3К 6К 8К 12К 17К 18К 23К 32К 33К	priced	tool	1	Официальная базовая цена D&D 5e 2024						10	
L0067	Инструменты ткача	1	1К 2К 3К 4К 6К 11К 17К 25К 26К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0068	Инструменты резчика по дереву	1	1К 2К 6К 11К 12К 17К 19К 20К 28К 29К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0069	Набор для грима	25	3К 4К 7К 9К 10К 25К 26К 42К 44К 46К 48К	priced	tool	1	Официальная базовая цена D&D 5e 2024						3	
L0070	Набор для подделки документов	15	3К 4К 7К 8К 25К 26К 31К 42К 46К 48К	priced	tool	1	Официальная базовая цена D&D 5e 2024						5	
L0071	Набор травника	5	1К 2К 6К 8К 11К 13К 17К 19К 28К 29К 33К 37К 44К	priced	tool	1	Официальная базовая цена D&D 5e 2024						3	
L0072	Инструменты навигатора	25	7К 15К 16К 31К 44К 46К 47К 48К 49К	priced	tool	1	Официальная базовая цена D&D 5e 2024						2	
L0073	Набор отравителя	50	3К 7К 13К 14К 27К 33К 36К 42К 48К	priced	tool	1	Официальная базовая цена D&D 5e 2024						2	
L0074	Воровские инструменты	25	3К 5К 7К 27К 34К 35К 36К 41К 42К 44К 46К 48К	priced	tool	1	Официальная базовая цена D&D 5e 2024						1	
L0075	Игральные кости	0.1	1К 2К 3К 9К 10К 21К 22К 27К 42К 44К 46К 47К 48К	priced	leisure	1	Официальная базовая цена D&D 5e 2024							
L0076	Драконьи шахматы	1	3К 4К 7К 9К 10К 25К 26К 31К	priced	leisure	1	Официальная базовая цена D&D 5e 2024							
L0077	Игральные карты	0.5	1К 2К 3К 7К 9К 10К 21К 22К 42К 44К 46К 47К 48К	priced	leisure	1	Официальная базовая цена D&D 5e 2024							
L0078	Три-Дракона	1	3К 4К 7К 9К 10К 25К 26К 46К	priced	leisure	1	Официальная базовая цена D&D 5e 2024							
L0079	Волынка	30	3К 4К 9К 10К 25К 26К 44К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						6	
L0080	Барабан	6	9К 10К 21К 22К 25К 28К 29К 44К 46К 47К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						3	
L0081	Цимбалы	25	3К 4К 9К 10К 25К 26К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						10	
L0082	Флейта	2	1К 2К 3К 4К 9К 10К 19К 28К 29К 44К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						1	
L0083	Рог	3	21К 22К 24К 25К 44К 46К 47К 48К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						2	
L0084	Лютня	35	3К 4К 9К 10К 25К 26К 44К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						2	
L0085	Лира	30	3К 4К 9К 10К 25К 26К 28К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						2	
L0086	Флейта Пана	12	2К 3К 9К 10К 19К 29К 37К 44К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						2	
L0087	Шалмей	2	2К 3К 9К 10К 21К 22К 44К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						1	
L0088	Виола	30	3К 4К 9К 10К 25К 26К	priced	instrument	1	Официальная базовая цена D&D 5e 2024						1	
L0089	Кислота	25	7К 8К 13К 14К 15К 32К 33К 35К 36К	priced	consumable	2	Официальная базовая цена D&D 5e 2024						1	
L0090	Алхимический огонь	50	7К 8К 13К 14К 21К 23К 32К 33К 35К 36К 42К	priced	consumable	2	Официальная базовая цена D&D 5e 2024						1	
L0091	Противоядие	50	3К 4К 7К 11К 13К 14К 25К 26К 28К 29К 33К 36К 44К 46К	priced	consumable	2	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0092	Рюкзак	2	1К 2К 3К 5К 11К 15К 16К 21К 22К 34К 35К 42К 44К 46К 47К 48К 49К	priced	gear	1	Официальная базовая цена D&D 5e 2024						5	
L0093	Шарики-подшипники	1	11К 17К 18К 21К 23К 34К 36К 42К 44К	priced	gear	2	Официальная базовая цена D&D 5e 2024						2	
L0094	Бочка	2	1К 2К 7К 9К 10К 15К 16К 19К 20К 21К 22К 25К 46К 47К 48К 49К	priced	container	2	Официальная базовая цена D&D 5e 2024						70	
L0095	Корзина	0.4	1К 2К 6К 7К 11К 15К 16К 19К 20К	priced	container	2	Официальная базовая цена D&D 5e 2024						2	
L0096	Спальный мешок	1	1К 2К 11К 15К 21К 22К 34К 42К 44К 46К 47К	priced	gear	2	Официальная базовая цена D&D 5e 2024						7	
L0097	Колокольчик	1	1К 2К 3К 4К 7К 9К 10К 11К 19К 20К 25К 26К 28К 29К 46К	priced	gear	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0098	Одеяло	0.5	1К 2К 3К 4К 9К 11К 15К 19К 21К 22К 25К 26К 44К 46К 47К	priced	gear	2	Официальная базовая цена D&D 5e 2024						3	
L0099	Блок и снасти	1	15К 16К 17К 18К 20К 21К 22К 23К 25К 38К 46К 47К 48К	priced	gear	1	Официальная базовая цена D&D 5e 2024						5	
L0100	Книга	25	2К 3К 4К 7К 8К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К	priced	valuable	1	Официальная базовая цена D&D 5e 2024							
L0101	Стеклянная бутылка	2	1К 2К 3К 4К 7К 9К 10К 11К 13К 14К 15К 17К 33К 46К	priced	container	2	Официальная базовая цена D&D 5e 2024						2	
L0102	Ведро	0.05	1К 2К 6К 9К 10К 11К 15К 17К 18К 19К 20К 21К 22К 25К 46К	priced	gear	2	Официальная базовая цена D&D 5e 2024						2	
L0103	Калтропы	1	21К 22К 23К 24К 25К 27К 34К 36К 42К 44К 45К	priced	gear	2	Официальная базовая цена D&D 5e 2024						2	
L0104	Свеча	0.01	1К 2К 3К 4К 5К 7К 8К 9К 10К 11К 25К 26К 28К 29К 31К 32К 34К 35К 39К 40К	priced	gear	3	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0105	Футляр для арбалетных болтов	1	12К 21К 22К 23К 34К 36К 42К 44К 45К	priced	gear	1	Официальная базовая цена D&D 5e 2024						1	
L0106	Тубус для карты или свитка	1	3К 4К 7К 8К 21К 25К 26К 28К 29К 31К 32К 34К 35К 36К 46К 47К	priced	gear	1	Официальная базовая цена D&D 5e 2024						1	
L0107	Цепь	5	6К 11К 15К 17К 18К 21К 22К 23К 25К 27К 34К 38К 42К 46К 47К 48К	priced	gear	1	Официальная базовая цена D&D 5e 2024						10	
L0108	Сундук	5	1К 2К 3К 4К 7К 8К 15К 16К 25К 26К 28К 29К 31К 32К 34К 35К 39К 40К 46К 47К 48К	priced	container	1	Официальная базовая цена D&D 5e 2024						25	
L0109	Набор альпиниста	25	7К 11К 21К 22К 34К 35К 37К 38К 41К 44К	priced	gear	1	Официальная базовая цена D&D 5e 2024						12	
L0110	Богатая одежда	15	3К 4К 7К 9К 25К 26К 36К 46К	priced	valuable	2	Официальная базовая цена D&D 5e 2024							
L0111	Дорожная одежда	2	1К 2К 3К 5К 9К 11К 21К 22К 42К 44К 46К 47К 48К	priced	gear	2	Официальная базовая цена D&D 5e 2024						4	
L0112	Сумка компонентов	25	3К 4К 8К 14К 25К 26К 28К 29К 32К 33К 35К 36К 39К 40К	priced	gear	1	Официальная базовая цена D&D 5e 2024						2	
L0113	Костюм	5	3К 4К 9К 10К 25К 26К 42К 44К 46К	priced	valuable	1	Официальная базовая цена D&D 5e 2024							
L0114	Лом	2	5К 6К 11К 15К 17К 18К 21К 22К 23К 27К 34К 38К 41К 42К 44К 46К 47К	priced	gear	1	Официальная базовая цена D&D 5e 2024						5	
L0115	Фляга	0.02	1К 2К 3К 5К 9К 10К 11К 15К 19К 21К 22К 34К 42К 44К 46К 47К 48К	priced	gear	2	Официальная базовая цена D&D 5e 2024						1	
L0116	Крюк-кошка	2	11К 17К 21К 22К 23К 24К 25К 34К 35К 37К 38К 41К 42К 44К 46К 47К 48К	priced	gear	1	Официальная базовая цена D&D 5e 2024						4	
L0117	Набор лекаря	5	1К 2К 3К 4К 7К 11К 13К 21К 22К 25К 26К 28К 29К 33К 44К 46К 47К	priced	consumable	2	Официальная базовая цена D&D 5e 2024						3	
L0118	Святая вода	25	3К 4К 7К 14К 25К 26К 28К 29К 30К 35К 36К 39К 40К	priced	consumable	2	Официальная базовая цена D&D 5e 2024						1	
L0119	Охотничий капкан	5	1К 5К 11К 15К 19К 22К 34К 37К 42К 43К 44К	priced	gear	1	Официальная базовая цена D&D 5e 2024						25	
L0120	Чернила	10	3К 4К 7К 8К 14К 25К 26К 28К 29К 31К 32К 33К	priced	gear	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0121	Перо для письма	0.02	2К 3К 4К 7К 8К 25К 26К 28К 29К 31К 32К	priced	gear	2	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0122	Кувшин	0.02	1К 2К 3К 4К 6К 9К 10К 11К 15К 19К 20К 25К 26К 46К	priced	container	2	Официальная базовая цена D&D 5e 2024						4	
L0123	Лестница	0.1	1К 2К 5К 6К 11К 15К 17К 19К 20К 21К 22К 25К 38К 46К	priced	gear	1	Официальная базовая цена D&D 5e 2024						25	
L0124	Масляная лампа	0.5	1К 2К 3К 4К 7К 8К 9К 10К 11К 25К 26К 28К 29К 31К 32К	priced	gear	2	Официальная базовая цена D&D 5e 2024						1	
L0125	Направленный фонарь	10	7К 21К 22К 23К 24К 25К 27К 34К 35К 38К 42К 44К 46К 47К 48К	priced	gear	1	Официальная базовая цена D&D 5e 2024						2	
L0126	Закрытый фонарь	5	3К 4К 7К 21К 22К 25К 34К 35К 42К 44К 46К 47К 48К	priced	gear	1	Официальная базовая цена D&D 5e 2024						2	
L0127	Замок	10	2К 3К 4К 7К 8К 11К 15К 16К 23К 25К 26К 27К 31К 32К 34К 36К 46К	priced	gear	1	Официальная базовая цена D&D 5e 2024						1	
L0128	Увеличительное стекло	100	3К 4К 7К 8К 14К 25К 26К 31К 32К 33К 36К	priced	valuable	1	Официальная базовая цена D&D 5e 2024							
L0129	Кандалы	2	21К 22К 23К 25К 27К 34К 35К 42К 46К 47К 48К	priced	gear	2	Официальная базовая цена D&D 5e 2024						6	
L0130	Карта	1	2К 3К 4К 7К 8К 16К 21К 22К 25К 26К 31К 32К 34К 35К 36К 41К 42К 44К 46К 47К 48К 49К	priced	gear	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0131	Зеркало	5	2К 3К 4К 7К 9К 10К 25К 26К 36К 46К	priced	valuable	1	Официальная базовая цена D&D 5e 2024							
L0132	Сеть	1	11К 15К 16К 19К 22К 34К 37К 42К 43К 44К 46К 47К 48К 49К	priced	gear	1	Официальная базовая цена D&D 5e 2024						3	
L0133	Масло	0.1	1К 2К 3К 4К 7К 9К 10К 11К 13К 15К 17К 18К 21К 22К 25К 28К 29К 34К 44К 46К 47К	priced	consumable	3	Официальная базовая цена D&D 5e 2024						1	
L0134	Бумага	0.2	3К 4К 7К 8К 11К 14К 25К 26К 28К 29К 31К 32К 33К	priced	gear	3	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0135	Пергамент	0.1	2К 3К 4К 7К 8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К	priced	gear	3	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0136	Духи	5	3К 4К 7К 9К 10К 14К 25К 26К 36К	priced	valuable	1	Официальная базовая цена D&D 5e 2024							
L0137	Простой яд	100	7К 13К 14К 27К 33К 35К 36К 42К 48К	priced	consumable	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0138	Шест	0.05	1К 2К 5К 6К 11К 15К 17К 19К 20К 22К 34К 37К 38К 44К 46К	priced	gear	1	Официальная базовая цена D&D 5e 2024						7	
L0139	Железный котелок	2	1К 2К 3К 6К 9К 10К 11К 15К 19К 20К 21К 22К 44К 46К 47К	priced	gear	1	Официальная базовая цена D&D 5e 2024						10	
L0140	Зелье лечения	50	3К 4К 7К 8К 11К 13К 14К 21К 22К 25К 26К 28К 29К 32К 33К 35К 36К 39К 40К 42К 44К 46К	priced	consumable	2	Официальная базовая цена D&D 5e 2024						0.5	
L0141	Кошель или подсумок	0.5	1К 2К 3К 4К 5К 7К 8К 9К 10К 11К 21К 22К 25К 26К 27К 34К 36К 39К 42К 44К 46К 47К 48К	priced	gear	2	Официальная базовая цена D&D 5e 2024						1	
L0142	Колчан	1	3К 4К 12К 21К 22К 23К 24К 25К 34К 36К 42К 44К 45К	priced	gear	1	Официальная базовая цена D&D 5e 2024						1	
L0143	Переносной таран	4	21К 22К 23К 25К 27К 34К 35К 41К 42К	priced	gear	1	Официальная базовая цена D&D 5e 2024						35	
L0144	Сухой паёк	0.5	1К 2К 5К 7К 11К 15К 16К 21К 22К 34К 37К 42К 44К 46К 47К 48К 49К	priced	food	4	Официальная базовая цена D&D 5e 2024							
L0145	Роба	1	2К 3К 4К 8К 14К 25К 26К 28К 29К 30К 31К 32К 33К	priced	gear	1	Официальная базовая цена D&D 5e 2024						4	
L0146	Верёвка	1	1К 2К 5К 6К 7К 11К 15К 16К 17К 19К 20К 21К 22К 27К 34К 35К 37К 38К 41К 42К 44К 46К 47К 48К 49К	priced	gear	2	Официальная базовая цена D&D 5e 2024						5	
L0147	Мешок	0.01	1К 2К 5К 6К 7К 9К 10К 11К 15К 16К 17К 19К 20К 21К 22К 34К 37К 38К 42К 44К 46К 47К 48К	priced	container	3	Официальная базовая цена D&D 5e 2024						0.5	
L0148	Лопата	2	1К 5К 6К 11К 15К 17К 19К 20К 21К 22К 34К 37К 38К 41К 42К 44К	priced	gear	1	Официальная базовая цена D&D 5e 2024						5	
L0149	Сигнальный свисток	0.05	1К 2К 9К 10К 21К 22К 23К 24К 25К 27К 42К 44К 46К 47К 48К	priced	gear	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0150	Железные шипы, 10 шт.	1	11К 15К 17К 18К 21К 22К 23К 34К 35К 38К 42К 44К	priced	gear	2	Официальная базовая цена D&D 5e 2024						5	
L0151	Подзорная труба	1000	3К 4К 7К 21К 24К 25К 26К 31К 36К 46К 47К 48К 49К	priced	valuable	1	Официальная базовая цена D&D 5e 2024							
L0152	Бечёвка	0.1	1К 2К 5К 6К 11К 15К 17К 19К 20К 34К 44К 46К	priced	gear	2	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0153	Палатка	2	11К 15К 16К 21К 22К 34К 37К 42К 44К 46К 47К	priced	gear	1	Официальная базовая цена D&D 5e 2024						20	
L0154	Огниво	0.5	1К 2К 3К 5К 6К 9К 10К 11К 15К 19К 21К 22К 34К 37К 42К 44К 46К 47К	priced	gear	1	Официальная базовая цена D&D 5e 2024						1	
L0155	Факел	0.01	1К 2К 5К 11К 15К 17К 21К 22К 24К 25К 27К 28К 29К 34К 35К 37К 38К 39К 40К 41К 42К 44К	priced	gear	3	Официальная базовая цена D&D 5e 2024						1	
L0156	Флакон	1	3К 4К 7К 8К 11К 13К 14К 17К 28К 29К 32К 33К 36К	priced	container	2	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0157	Бурдюк	0.2	1К 2К 5К 7К 9К 10К 11К 15К 19К 21К 22К 34К 37К 42К 44К 46К 47К 48К	priced	gear	2	Официальная базовая цена D&D 5e 2024						5	
L0158	Стрелы, 20 шт.	1	11К 12К 15К 21К 22К 23К 24К 25К 34К 36К 42К 44К 45К	priced	ammo	2	Официальная базовая цена D&D 5e 2024						1	
L0159	Арбалетные болты, 20 шт.	1	11К 12К 15К 21К 22К 23К 24К 25К 34К 36К 42К 44К 45К 47К 48К	priced	ammo	2	Официальная базовая цена D&D 5e 2024						1.5	
L0160	Огнестрельные пули, 10 шт.	3	12К 15К 21К 23К 25К 26К 36К 46К 47К 48К	priced	ammo	2	Официальная базовая цена D&D 5e 2024						2	
L0161	Пули для пращи, 20 шт.	0.04	11К 12К 21К 22К 34К 37К 42К 44К	priced	ammo	2	Официальная базовая цена D&D 5e 2024						1.5	
L0162	Иглы для духовой трубки, 50 шт.	1	12К 13К 15К 33К 34К 37К 42К 43К 48К	priced	ammo	2	Официальная базовая цена D&D 5e 2024						1	
L0163	Магический кристалл	10	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К 39К	priced	focus	1	Официальная базовая цена D&D 5e 2024						1	
L0164	Магическая сфера	20	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К 39К	priced	focus	1	Официальная базовая цена D&D 5e 2024						3	
L0165	Магический жезл	10	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К	priced	focus	1	Официальная базовая цена D&D 5e 2024						2	
L0166	Магический посох	5	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К 39К	priced	focus	1	Официальная базовая цена D&D 5e 2024						4	
L0167	Магическая палочка	10	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К	priced	focus	1	Официальная базовая цена D&D 5e 2024						1	
L0168	Ветка омелы	1	19К 28К 29К 30К 37К 41К 43К	priced	focus	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0169	Деревянный друидский посох	5	19К 28К 29К 30К 37К 41К 43К	priced	focus	1	Официальная базовая цена D&D 5e 2024						4	
L0170	Тисовая палочка	10	19К 28К 29К 30К 37К 41К 43К	priced	focus	1	Официальная базовая цена D&D 5e 2024						1	
L0171	Священный амулет	5	3К 4К 25К 26К 28К 29К 30К 35К 36К 39К 40К	priced	focus	1	Официальная базовая цена D&D 5e 2024						1	
L0172	Священная эмблема	5	4К 21К 23К 25К 26К 28К 29К 30К 35К 39К 40К	priced	focus	1	Официальная базовая цена D&D 5e 2024						0	official-weightless
L0173	Реликварий	5	3К 4К 25К 26К 28К 29К 30К 35К 36К 39К 40К	priced	focus	1	Официальная базовая цена D&D 5e 2024						2	
L0174	Свиток заговора	30	8К 14К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0175	Свиток 1-го уровня	50	8К 14К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0176	Свиток 2-го уровня	200	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0177	Свиток 3-го уровня	300	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0178	Свиток 4-го уровня	2000	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0179	Свиток 5-го уровня	3000	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0180	Свиток 6-го уровня	20000	14К 26К 28К 30К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0181	Свиток 7-го уровня	25000	14К 26К 28К 30К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0182	Свиток 8-го уровня	30000	14К 26К 28К 30К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0183	Свиток 9-го уровня	100000	14К 26К 30К 32К 33К 35К 36К 39К 40К	priced	scroll	1	Официальная базовая цена D&D 5e 2024							
L0184	Кружка эля	0.04	1К 2К 3К 9К 10К 19К 20К 21К 22К 44К 46К 47К 48К	priced	food	4	Официальная базовая цена D&D 5e 2024							
L0185	Буханка хлеба	0.02	1К 2К 3К 4К 9К 10К 15К 16К 19К 20К 21К 22К 25К 26К 44К 46К	priced	food	4	Официальная базовая цена D&D 5e 2024							
L0186	Кусок сыра	0.1	1К 2К 3К 4К 9К 10К 15К 16К 19К 20К 25К 26К 44К 46К	priced	food	3	Официальная базовая цена D&D 5e 2024							
L0187	Бутылка обычного вина	0.2	2К 3К 4К 7К 9К 10К 15К 16К 25К 26К 46К 47К 48К	priced	food	3	Официальная базовая цена D&D 5e 2024							
L0188	Бутылка хорошего вина	10	3К 4К 7К 9К 10К 15К 16К 25К 26К 36К 46К	priced	valuable	2	Официальная базовая цена D&D 5e 2024							
L0189	Верблюд	50	7К 15К 16К 19К 22К 25К 26К 44К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0190	Слон	200	4К 7К 16К 22К 25К 26К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0191	Тягловая лошадь	50	4К 7К 15К 16К 19К 20К 21К 22К 25К 26К 44К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0192	Верховая лошадь	75	3К 4К 7К 16К 21К 22К 25К 26К 44К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0193	Мастиф	25	1К 2К 3К 4К 7К 19К 21К 22К 24К 25К 26К 42К 44К 46К 47К 48К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0194	Мул	8	1К 2К 6К 7К 15К 16К 19К 20К 22К 44К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0195	Пони	30	1К 2К 3К 4К 7К 16К 19К 22К 44К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0196	Боевой конь	400	4К 21К 22К 23К 25К 26К 45К	priced	animal	1	Официальная таблица Mounts and Other Animals, D&D 5e 2024							
L0197	Карета	100	3К 4К 7К 16К 25К 26К	priced	vehicle	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						600	
L0198	Телега	15	1К 2К 6К 7К 11К 15К 16К 19К 20К 44К	priced	vehicle	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						200	
L0199	Колесница	250	4К 21К 22К 23К 25К 26К 45К	priced	vehicle	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						100	
L0200	Корм для животного, 1 день	0.05	7К 15К 16К 19К 20К 21К 22К 25К 44К	priced	supply	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024							
L0201	Экзотическое седло	60	4К 7К 14К 25К 26К 32К 46К	priced	tack	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						40	
L0202	Военное седло	20	4К 21К 22К 23К 25К 26К 45К	priced	tack	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						30	
L0203	Верховое седло	10	2К 3К 4К 7К 16К 19К 21К 22К 25К 26К 44К	priced	tack	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						25	
L0204	Сани	20	15К 16К 19К 20К 22К 44К	priced	vehicle	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						300	
L0205	Фургон	35	2К 3К 4К 7К 15К 16К 19К 20К 21К 22К 25К 44К	priced	vehicle	1	Официальная таблица Tack, Harness, and Drawn Vehicles, D&D 5e 2024						400	
L0206	Воздушный корабль	40000	25К 26К 32К	priced	large_vehicle	1	Официальная таблица Airborne and Waterborne Vehicles, D&D 5e 2024							
L0207	Галера	30000	46К 47К 48К 49К	priced	large_vehicle	1	Официальная таблица Airborne and Waterborne Vehicles, D&D 5e 2024							
L0208	Килевой бот	3000	16К 46К 47К 48К 49К	priced	large_vehicle	1	Официальная таблица Airborne and Waterborne Vehicles, D&D 5e 2024							
L0209	Драккар / длинный корабль	10000	46К 47К 48К 49К	priced	large_vehicle	1	Официальная таблица Airborne and Waterborne Vehicles, D&D 5e 2024							
L0210	Гребная лодка	50	15К 16К 19К 44К 46К 47К 48К 49К	priced	large_vehicle	1	Официальная таблица Airborne and Waterborne Vehicles, D&D 5e 2024							
L0211	Парусный корабль	10000	46К 47К 48К 49К	priced	large_vehicle	1	Официальная таблица Airborne and Waterborne Vehicles, D&D 5e 2024							
L0212	Военный корабль	25000	47К 48К 49К	priced	large_vehicle	1	Официальная таблица Airborne and Waterborne Vehicles, D&D 5e 2024							
L0213	Стёганый доспех для ездового животного	20	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						16	
L0214	Кожаный доспех для ездового животного	40	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						20	
L0215	Клёпаный кожаный доспех для ездового животного	180	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						26	
L0216	Шкурный доспех для ездового животного	40	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						24	
L0217	Кольчужная рубаха для ездового животного	200	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						40	
L0218	Чешуйчатый доспех для ездового животного	200	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						90	
L0219	Кираса для ездового животного	1600	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						40	
L0220	Полулаты для ездового животного	3000	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						80	
L0221	Кольчатый доспех для ездового животного	120	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						80	
L0222	Кольчуга для ездового животного	300	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						110	
L0223	Наборный доспех для ездового животного	800	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						120	
L0224	Латы для ездового животного	6000	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	Официальное правило Barding: 4 × цена соответствующего доспеха						130	
L0225	Обычное магическое оружие	BASE+100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_weapon	1	Официальная формула: цена базового оружия + стоимость магии по редкости							
L0226	Обычный магический доспех	BASE+100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_armor	1	Официальная формула: цена базового доспеха + стоимость магии по редкости							
L0227	Необычное магическое оружие	BASE+400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_weapon	1	Официальная формула: цена базового оружия + стоимость магии по редкости							
L0228	Необычный магический доспех	BASE+400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_armor	1	Официальная формула: цена базового доспеха + стоимость магии по редкости							
L0229	Редкое магическое оружие	BASE+4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_weapon	1	Официальная формула: цена базового оружия + стоимость магии по редкости							
L0230	Редкий магический доспех	BASE+4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_armor	1	Официальная формула: цена базового доспеха + стоимость магии по редкости							
L0231	Очень редкое магическое оружие	BASE+40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_weapon	1	Официальная формула: цена базового оружия + стоимость магии по редкости							
L0232	Очень редкий магический доспех	BASE+40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_armor	1	Официальная формула: цена базового доспеха + стоимость магии по редкости							
L0233	Легендарное магическое оружие	BASE+200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_weapon	1	Официальная формула: цена базового оружия + стоимость магии по редкости							
L0234	Легендарный магический доспех	BASE+200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	formula	magic_armor	1	Официальная формула: цена базового доспеха + стоимость магии по редкости							
L0235	Обычное магическое зелье	50	8К 13К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 43К	priced	magic_potion	1	Официальное правило: расходуемый магический предмет стоит 1/2 стоимости редкости							
L0236	Обычное магическое кольцо	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	Официальная стоимость магического предмета по редкости							
L0237	Обычный магический жезл	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	Официальная стоимость магического предмета по редкости							
L0238	Обычный магический посох	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	Официальная стоимость магического предмета по редкости							
L0239	Обычная магическая палочка	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	Официальная стоимость магического предмета по редкости							
L0240	Обычный чудесный магический предмет	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	Официальная стоимость магического предмета по редкости							
L0241	Необычное магическое зелье	200	8К 13К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 43К	priced	magic_potion	1	Официальное правило: расходуемый магический предмет стоит 1/2 стоимости редкости							
L0242	Необычное магическое кольцо	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	Официальная стоимость магического предмета по редкости							
L0243	Необычный магический жезл	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	Официальная стоимость магического предмета по редкости							
L0244	Необычный магический посох	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	Официальная стоимость магического предмета по редкости							
L0245	Необычная магическая палочка	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	Официальная стоимость магического предмета по редкости							
L0246	Необычный чудесный магический предмет	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	Официальная стоимость магического предмета по редкости							
L0247	Редкое магическое зелье	2000	8К 13К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 43К	priced	magic_potion	1	Официальное правило: расходуемый магический предмет стоит 1/2 стоимости редкости							
L0248	Редкое магическое кольцо	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	Официальная стоимость магического предмета по редкости							
L0249	Редкий магический жезл	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	Официальная стоимость магического предмета по редкости							
L0250	Редкий магический посох	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	Официальная стоимость магического предмета по редкости							
L0251	Редкая магическая палочка	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	Официальная стоимость магического предмета по редкости							
L0252	Редкий чудесный магический предмет	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	Официальная стоимость магического предмета по редкости							
L0253	Очень редкое магическое зелье	20000	8К 13К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 43К	priced	magic_potion	1	Официальное правило: расходуемый магический предмет стоит 1/2 стоимости редкости							
L0254	Очень редкое магическое кольцо	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	Официальная стоимость магического предмета по редкости							
L0255	Очень редкий магический жезл	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	Официальная стоимость магического предмета по редкости							
L0256	Очень редкий магический посох	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	Официальная стоимость магического предмета по редкости							
L0257	Очень редкая магическая палочка	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	Официальная стоимость магического предмета по редкости							
L0258	Очень редкий чудесный магический предмет	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	Официальная стоимость магического предмета по редкости							
L0259	Легендарное магическое зелье	100000	8К 13К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 43К	priced	magic_potion	1	Официальное правило: расходуемый магический предмет стоит 1/2 стоимости редкости							
L0260	Легендарное магическое кольцо	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	Официальная стоимость магического предмета по редкости							
L0261	Легендарный магический жезл	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	Официальная стоимость магического предмета по редкости							
L0262	Легендарный магический посох	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	Официальная стоимость магического предмета по редкости							
L0263	Легендарная магическая палочка	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	Официальная стоимость магического предмета по редкости							
L0264	Легендарный чудесный магический предмет	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	Официальная стоимость магического предмета по редкости							
L0265	Артефакт	PRICELESS	26К 30К 32К 35К 36К 39К 40К 41К 43К	flavor	artifact	1	Официально: Artifact = Priceless	Не участвует в бюджетной генерации; только отдельное разрешение ГМа						
L0266	Необычные магические боеприпасы, 10 шт.	200	12К 14К 21К 23К 25К 26К 35К 36К 42К 44К 45К 47К 48К	priced	magic_ammo	1	Официальное правило Ammunition +1/+2/+3: 10 шт. равны по стоимости зелью той же редкости							
L0267	Редкие магические боеприпасы, 10 шт.	2000	12К 14К 21К 23К 25К 26К 35К 36К 42К 44К 45К 47К 48К	priced	magic_ammo	1	Официальное правило Ammunition +1/+2/+3: 10 шт. равны по стоимости зелью той же редкости							
L0268	Очень редкие магические боеприпасы, 10 шт.	20000	12К 14К 21К 23К 25К 26К 35К 36К 42К 44К 45К 47К 48К	priced	magic_ammo	1	Официальное правило Ammunition +1/+2/+3: 10 шт. равны по стоимости зелью той же редкости							
L0269	Судовой журнал	25	46К 47К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0270	Книга учёта торговца	25	7К 15К 16К 46К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0271	Дворцовая родословная книга	25	4К 26К 31К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0272	Храмовая книга записей	25	28К 29К 30К 31К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0273	Алхимический трактат	25	8К 13К 14К 31К 32К 33К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0274	Магический учебник без заклинаний	25	8К 14К 31К 32К 33К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0275	Военный устав	25	21К 22К 23К 25К 31К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0276	Старинная хроника	25	4К 26К 31К 35К 36К 39К 40К 41К	priced	variant	1	Тематический вариант официального базового предмета: Book							
L0277	Карта города	1	2К 3К 4К 7К 9К 25К 26К 31К	priced	variant	1	Тематический вариант официального базового предмета: Map							
L0278	Карта подземелья	1	8К 31К 32К 34К 35К 36К 41К 42К	priced	variant	1	Тематический вариант официального базового предмета: Map							
L0279	Морская карта	1	7К 16К 31К 46К 47К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Map							
L0280	Военная карта	1	21К 22К 23К 24К 25К 45К	priced	variant	1	Тематический вариант официального базового предмета: Map							
L0281	Карта торгового маршрута	1	7К 15К 16К 31К 44К 46К	priced	variant	1	Тематический вариант официального базового предмета: Map							
L0282	Флакон духов знатного дома	5	3К 4К 26К	priced	variant	1	Тематический вариант официального базового предмета: Perfume							
L0283	Флакон духов торговца	5	7К 9К 10К 46К	priced	variant	1	Тематический вариант официального базового предмета: Perfume							
L0284	Парадный дворянский наряд	15	3К 4К 25К 26К	priced	variant	1	Тематический вариант официального базового предмета: Fine Clothes							
L0285	Богатое купеческое платье	15	3К 7К 9К 10К 16К 46К	priced	variant	1	Тематический вариант официального базового предмета: Fine Clothes							
L0286	Церемониальные одежды	15	4К 26К 28К 29К 30К	priced	variant	1	Тематический вариант официального базового предмета: Fine Clothes							
L0287	Походная одежда солдата	2	21К 22К 44К 45К	priced	variant	1	Тематический вариант официального базового предмета: Traveler Clothes							
L0288	Одежда моряка	2	46К 47К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Traveler Clothes							
L0289	Одежда путешественника	2	9К 15К 16К 34К 37К 44К	priced	variant	1	Тематический вариант официального базового предмета: Traveler Clothes							
L0290	Театральный костюм	5	9К 10К 26К	priced	variant	1	Тематический вариант официального базового предмета: Costume							
L0291	Маскировочный костюм	5	21К 27К 42К 44К 48К	priced	variant	1	Тематический вариант официального базового предмета: Costume							
L0292	Запечатанная стеклянная бутылка	2	3К 4К 7К 8К 13К 14К 33К 36К 46К	priced	variant	1	Тематический вариант официального базового предмета: Glass Bottle							
L0293	Пустая винная бутылка	2	3К 4К 7К 9К 10К 15К 46К 48К	priced	variant	1	Тематический вариант официального базового предмета: Glass Bottle							
L0294	Бутылка с неизвестной жидкостью	2	8К 13К 14К 33К 34К 35К 36К 39К 40К	priced	variant	1	Тематический вариант официального базового предмета: Glass Bottle							
L0295	Алхимический флакон	1	8К 13К 14К 32К 33К	priced	variant	1	Тематический вариант официального базового предмета: Vial							
L0296	Флакон с образцом	1	8К 13К 31К 32К 33К 35К 36К	priced	variant	1	Тематический вариант официального базового предмета: Vial							
L0297	Флакон для святой воды	1	28К 29К 30К	priced	variant	1	Тематический вариант официального базового предмета: Vial							
L0298	Кошель горожанина	0.5	1К 2К 3К 7К 9К 10К 27К 42К 44К 46К 48К	priced	variant	1	Тематический вариант официального базового предмета: Pouch							
L0299	Кошель солдата	0.5	21К 22К 23К 24К 45К 47К	priced	variant	1	Тематический вариант официального базового предмета: Pouch							
L0300	Кошель купца	0.5	7К 15К 16К 46К	priced	variant	1	Тематический вариант официального базового предмета: Pouch							
L0301	Небольшой домашний сундук	5	1К 2К 3К 4К 5К	priced	variant	1	Тематический вариант официального базового предмета: Chest							
L0302	Купеческий сундук	5	7К 15К 16К 46К	priced	variant	1	Тематический вариант официального базового предмета: Chest							
L0303	Военный сундук	5	21К 22К 23К 25К 47К	priced	variant	1	Тематический вариант официального базового предмета: Chest							
L0304	Храмовый сундук	5	28К 29К 30К	priced	variant	1	Тематический вариант официального базового предмета: Chest							
L0305	Пиратский сундук	5	36К 42К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Chest							
L0306	Погребальный сундук	5	39К 40К	priced	variant	1	Тематический вариант официального базового предмета: Chest							
L0307	Корабельная цепь, стандартный отрезок	5	46К 47К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Chain							
L0308	Тюремная цепь, стандартный отрезок	5	27К 40К	priced	variant	1	Тематический вариант официального базового предмета: Chain							
L0309	Хозяйственная цепь, стандартный отрезок	5	6К 15К 17К 18К 19К 20К	priced	variant	1	Тематический вариант официального базового предмета: Chain							
L0310	Замок от сундука	10	3К 4К 7К 15К 16К 25К 26К 36К 46К	priced	variant	1	Тематический вариант официального базового предмета: Lock							
L0311	Дверной замок	10	2К 3К 4К 7К 25К 26К 27К 31К 32К	priced	variant	1	Тематический вариант официального базового предмета: Lock							
L0312	Замок от камеры	10	25К 27К	priced	variant	1	Тематический вариант официального базового предмета: Lock							
L0313	Настенное зеркало	5	2К 3К 4К 7К 9К 10К 25К 26К	priced	variant	1	Тематический вариант официального базового предмета: Mirror							
L0314	Дорожное зеркало	5	3К 4К 7К 9К 44К 46К	priced	variant	1	Тематический вариант официального базового предмета: Mirror							
L0315	Чернильница	10	3К 4К 7К 8К 25К 26К 28К 29К 31К 32К 33К	priced	variant	1	Тематический вариант официального базового предмета: Ink							
L0316	Архивный запас бумаги	0.2	7К 8К 25К 26К 31К 32К 33К	priced	variant	1	Тематический вариант официального базового предмета: Paper							
L0317	Старинный лист пергамента	0.1	8К 28К 29К 30К 31К 32К 35К 36К 39К 40К	priced	variant	1	Тематический вариант официального базового предмета: Parchment							
L0318	Лампа рабочего стола	0.5	2К 3К 4К 6К 7К 8К 17К 31К 32К 33К	priced	variant	1	Тематический вариант официального базового предмета: Lamp							
L0319	Корабельный закрытый фонарь	5	46К 47К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Hooded Lantern							
L0320	Караульный направленный фонарь	10	21К 22К 23К 24К 25К 27К	priced	variant	1	Тематический вариант официального базового предмета: Bullseye Lantern							
L0321	Торговая бочка	2	7К 15К 16К 19К 20К 46К 48К	priced	variant	1	Тематический вариант официального базового предмета: Barrel							
L0322	Бочка провизии	2	9К 10К 15К 21К 22К 25К 46К 47К	priced	variant	1	Тематический вариант официального базового предмета: Barrel							
L0323	Пустая корабельная бочка	2	46К 47К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Barrel							
L0324	Дорожное одеяло	0.5	9К 21К 22К 44К 46К 47К	priced	variant	1	Тематический вариант официального базового предмета: Blanket							
L0325	Казарменное одеяло	0.5	21К 22К 23К 25К 27К	priced	variant	1	Тематический вариант официального базового предмета: Blanket							
L0326	Домашнее одеяло	0.5	1К 2К 3К 4К 5К	priced	variant	1	Тематический вариант официального базового предмета: Blanket							
L0327	Корабельная верёвка	1	46К 47К 48К 49К	priced	variant	1	Тематический вариант официального базового предмета: Rope							
L0328	Альпинистская верёвка	1	34К 35К 37К 38К 41К 44К	priced	variant	1	Тематический вариант официального базового предмета: Rope							
L0329	Хозяйственная верёвка	1	1К 2К 6К 15К 17К 19К 20К	priced	variant	1	Тематический вариант официального базового предмета: Rope							
L0330	Деревянная ложка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0331	Погнутая вилка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0332	Треснувшая тарелка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0333	Глиняная кружка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0334	Сколотая чашка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0335	Ржавый кухонный нож	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0336	Разделочная доска	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0337	Деревянная миска	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0338	Старая кастрюля	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0339	Пустая банка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0340	Пробка от бутылки	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0341	Связка сухих трав	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0342	Кусок мыла	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0343	Гребень	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0344	Щётка для одежды	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0345	Катушка ниток	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0346	Иголка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0347	Напёрсток	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0348	Клубок шерсти	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0349	Лоскут ткани	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0350	Запасная пуговица	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0351	Кожаный ремешок	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0352	Старая пряжка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0353	Пустая коробочка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0354	Небольшая шкатулка без ценностей	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0355	Детская деревянная игрушка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0356	Тряпичная кукла	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0357	Деревянный кубик	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0358	Сломанная фигурка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0359	Пучок перьев	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0360	Высохший букет	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0361	Семейный портрет без художественной ценности	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0362	Пустая рамка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0363	Кусок воска	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0364	Огарок свечи	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0365	Каминные щипцы	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0366	Кочерга	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0367	Совок для золы	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0368	Связка дров	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0369	Мешочек золы	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0370	Личное письмо	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0371	Неотправленное письмо	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0372	Счёт за товары	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0373	Расписка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0374	Товарная накладная	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0375	Список покупок	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0376	Список долгов	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0377	Список имён	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0378	Квитанция	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0379	Пропуск	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0380	Разрешение на въезд	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0381	Старый договор	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0382	Черновик договора	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0383	Приказ командира	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0384	Рапорт	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0385	Караульный журнал	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0386	Список дежурств	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0387	Список заключённых	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0388	Ордер на арест	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0389	Объявление о розыске	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0390	Культовая записка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0391	Молитва на отдельном листе	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0392	Проповедь	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0393	Записка библиотекаря	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0394	Каталожная карточка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0395	Черновые заметки учёного	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0396	Лабораторные записи	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0397	Рецепт без указанной стоимости компонентов	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0398	Кодированное сообщение	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0399	Обрывок шифра	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0400	Корабельная ведомость	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0401	Список команды	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0402	Грузовой манифест	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0403	Портовая расписка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0404	Письмо капитану	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0405	Черновой план помещения	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0406	Обрывок карты без практической ценности	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0407	Старый железный ключ	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0408	Маленький ключ от шкатулки	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0409	Ключ от двери	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0410	Ключ от склада	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0411	Ключ от сундука	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0412	Ключ от камеры	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0413	Ключ неизвестного назначения	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0414	Связка неподписанных ключей	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0415	Именной жетон	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0416	Простой медальон без ценного металла	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0417	Дешёвая брошь	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0418	Деревянный кулон	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0419	Костяная подвеска	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0420	Памятный камешек	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0421	Прядь волос в ленте	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0422	Сухой цветок в конверте	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0423	Личная записка	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0424	Карманный талисман	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0425	Простое кольцо без указанной ценности	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0426	Старая печать без указанной ценности	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0427	Пустой кошелёк	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0428	Пустой футляр	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0429	Сломанные очки	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0430	Одна перчатка	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0431	Один носок	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0432	Шейный платок	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0433	Носовой платок	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0434	Изношенный пояс	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0435	Гнутый гвоздь	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0436	Горсть гвоздей без установленной цены	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0437	Деревянный клин	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0438	Кусок проволоки	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0439	Обломок металлического прута	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0440	Ржавая шестерёнка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0441	Малая пружина	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0442	Сломанная рукоять инструмента	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0443	Кусок кожи	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0444	Кожаная заготовка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0445	Обрезок доски	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0446	Деревянная заготовка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0447	Кусок необработанного камня	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0448	Обломок кирпича	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0449	Комок глины	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0450	Форма для отливки	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0451	Пустая форма для свечей	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0452	Кузнечный шлак	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0453	Угольный огарок	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0454	Обломок руды без установленной ценности	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0455	Кусок стекла	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0456	Стеклянная заготовка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0457	Керамический черепок	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0458	Испорченная деталь механизма	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0459	Сломанный замочный механизм	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0460	Набросок изделия	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0461	Мерная палочка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0462	Верёвочный отвес	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0463	Пустые ножны	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0464	Сломанные ножны	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0465	Ремень для оружия	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0466	Плечевая перевязь	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0467	Обломок древка	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0468	Сломанный наконечник стрелы	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0469	Погнутая пряжка доспеха	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0470	Кожаный ремень доспеха	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0471	Обрывок кольчуги	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0472	Сломанная застёжка шлема	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0473	Старая нашивка	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0474	Воинский знак без установленной ценности	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0475	Полковой знак	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0476	Потрёпанное знамя	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0477	Обрывок знамени	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0478	Точильный камень без установленной цены	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0479	Пустая фляга солдата	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0480	Пустой футляр для боеприпасов	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0481	Тряпка для чистки оружия	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0482	Мешочек с песком	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0483	Костяной жетон	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0484	Деревянная тренировочная мишень	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0485	Сломанная тренировочная палка	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0486	Обрывок парусины	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0487	Кусок каната	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0488	Морской узел на коротком шнуре	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0489	Деревянный блок такелажа	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0490	Сломанный шкив	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0491	Деревянная пробка для корпуса	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0492	Кусок смолы	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0493	Обломок весла	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0494	Сломанная рукоять весла	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0495	Ржавая корабельная скоба	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0496	Медный гвоздь обшивки	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0497	Обломок мачты	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0498	Кусок расписной обшивки	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0499	Сигнальный флажок	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0500	Кусок старого паруса	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0501	Морская раковина	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0502	Пустая бутылка с пробкой	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0503	Рыболовный крючок без установленной цены	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0504	Поплавок	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0505	Кусок рыболовной лески	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0506	Сетка с прорехой	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0507	Капитанская записка	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0508	Бирка с грузового ящика	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0509	Обломок кости	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0510	Череп мелкого животного	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0511	Зуб неизвестного зверя	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0512	Коготь неизвестного зверя	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0513	Клок шерсти	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0514	Кусок высохшей кожи	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0515	Перо неизвестной птицы	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0516	Пустой кокон	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0517	Старая паутина	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0518	Высохший гриб	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0519	Пучок мха	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0520	Кусок сталактита	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0521	Гладкий пещерный камень	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0522	Осколок кристалла без установленной ценности	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0523	Обломок статуи	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0524	Кусок мозаики	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0525	Каменная табличка без читаемого текста	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0526	Обломок саркофага	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0527	Черепок погребальной урны	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0528	Пустая урна	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0529	Погасшая лампада	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0530	Обрывок савана	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0531	Истлевшая лента	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0532	Ржавая скоба	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0533	Сломанный рычаг	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0534	Кусок цепи неизвестной длины	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0535	Пустая клетка	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0536	Обломок решётки	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0537	Кусок обгоревшего дерева	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0538	Комок засохшей грязи	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0539	Пустой мешочек из-под компонентов	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0540	Использованный лист с магическими расчётами	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0541	Сломанный мел для ритуального круга	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0542	Стеклянная трубка без реагента	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0543	Высохший алхимический осадок	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0544	Обугленный кусок пергамента	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0545	Погасший благовонный конус	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0546	Пустой футляр для свитка	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0547	Неактивный кристаллический осколок	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0548	Перо для письма с пятнами чернил	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0549	Ритуальная лента	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0550	Верёвочка с узлами для счёта	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0551	Кусочек воска с отпечатком печати	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0552	Разбитая пробирка	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0553	Неизвестный порошок без установленной стоимости	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0554	Сухая трава без установленной стоимости	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0555	Обычный камень с нарисованной руной	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0556	Сломанная деревянная палочка без магии	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0557	Пустой маленький мешок с запахом трав	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0558	Кусок ткани с вышитым символом	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0559	Горсть семян без установленной цены	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0560	Связка соломы	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0561	Пучок сена	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0562	Деревянная бирка для скота	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0563	Кусок подковы	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0564	Старая подкова	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0565	Кожаный ошейник животного	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0566	Деревянная рукоять	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0567	Кусок мешковины	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0568	Плетёная верёвка	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0569	Сломанная корзина	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0570	Пустой мешок из-под зерна	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0571	Сухой початок	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0572	Пучок сушёных растений	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0573	Деревянный колышек	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0574	Огарок храмовой свечи	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0575	Лента с молитвой	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0576	Простой деревянный символ веры	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0577	Каменный символ без драгоценных материалов	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0578	Чётки без установленной стоимости	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0579	Маленькая молитвенная дощечка	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0580	Пустая коробочка для благовоний	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0581	Высохший венок	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0582	Погребальная лента	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0583	Кусок ритуальной ткани	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0584	Сломанная статуэтка святого	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0585	Пустая чаша без установленной стоимости	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0586	Кусок старой фрески	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0587	Паломнический жетон без установленной стоимости	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Нет официальной цены; оригинальная атмосферная находка	Не участвует в бюджете; максимум 1 как дополнительная находка						
L0588	Клевец	5	12К 18К 21К 22К 23К 25К 34К 35К 38К 42К 44К 45К	priced	weapon	1	PHB 2024	—					2	
L0589	Моргенштерн	15	12К 21К 22К 23К 25К 34К 35К 36К 39К 40К 42К 45К	priced	weapon	1	PHB 2024	—					4	
L0590	Пика	5	21К 22К 23К 24К 25К 34К 35К 45К	priced	weapon	1	PHB 2024	—					18	
L0591	Трезубец	5	12К 22К 23К 34К 35К 37К 43К 44К 46К 47К 48К 49К	priced	weapon	1	PHB 2024	—					4	
L0592	Боевой клевец	5	12К 18К 21К 22К 23К 25К 34К 35К 38К 42К 44К 45К	priced	weapon	1	PHB 2024	—					2	
L0593	Кнут	2	1К 3К 4К 7К 12К 19К 21К 22К 26К 27К 42К 44К 46К 47К 48К	priced	weapon	1	PHB 2024	—					3	
L0594	Духовая трубка	10	7К 12К 13К 22К 33К 34К 37К 42К 43К 44К 48К	priced	weapon	1	PHB 2024	—					1	
L0595	Ручной арбалет	75	3К 4К 7К 12К 21К 23К 25К 26К 36К 42К 44К 47К 48К	priced	weapon	1	PHB 2024	—					3	
L0596	Тяжёлый арбалет	50	12К 21К 22К 23К 24К 25К 34К 35К 36К 42К 44К 45К 47К 48К	priced	weapon	1	PHB 2024	—					18	
L0597	Длинный лук	50	3К 4К 12К 21К 22К 23К 24К 25К 34К 35К 36К 42К 44К 45К	priced	weapon	1	PHB 2024	—					2	
L0598	Мушкет	500	3К 4К 12К 21К 23К 25К 26К 36К 46К 47К 48К	priced	weapon	1	PHB 2024	—					10	
L0599	Пистолет	250	3К 4К 7К 12К 21К 23К 25К 26К 36К 42К 46К 47К 48К	priced	weapon	1	PHB 2024	—					3	
L0600	Дротик	0.05	12К 21К 22К 23К 24К 34К 42К 44К 45К 47К 48К	priced	weapon	3	PHB 2024	—					0.25	
L0601	Метательное копьё	0.5	12К 21К 22К 23К 24К 25К 34К 35К 42К 43К 44К 45К 47К 48К	priced	weapon	2	PHB 2024	—					2	
L0602	Праща	0.1	1К 2К 5К 19К 22К 34К 37К 42К 43К 44К	priced	weapon	1	PHB 2024	—					0	official-weightless
L0603	Лёгкий молот	2	6К 12К 17К 18К 21К 22К 23К 34К 38К 42К 44К	priced	weapon	1	PHB 2024	—					2	
L0604	Булава	5	12К 21К 22К 23К 25К 28К 29К 30К 34К 35К 36К 39К 40К 42К 44К 45К	priced	weapon	1	PHB 2024	—					4	
L0605	Боевой посох	0.2	1К 2К 5К 8К 28К 29К 30К 32К 33К 34К 35К 37К 39К 40К 41К 43К 44К	priced	weapon	1	PHB 2024	—					4	
L0606	Серп	1	1К 2К 6К 11К 17К 19К 20К 37К 44К	priced	weapon	1	PHB 2024	—					2	
L0607	Копьё	1	12К 19К 21К 22К 23К 24К 25К 34К 35К 37К 39К 41К 42К 43К 44К 45К	priced	weapon	1	PHB 2024	—					3	
L0608	Лёгкий арбалет	25	3К 4К 7К 12К 21К 22К 23К 24К 25К 34К 35К 36К 42К 44К 45К 46К 47К 48К	priced	weapon	1	PHB 2024	—					5	
L0609	Короткий лук	25	12К 19К 21К 22К 23К 24К 34К 35К 37К 42К 43К 44К 45К	priced	weapon	1	PHB 2024	—					2	
L0610	Боевой топор	10	4К 12К 18К 21К 22К 23К 25К 34К 35К 36К 39К 41К 42К 44К 45К 47К 48К	priced	weapon	1	PHB 2024	—					4	
L0611	Цеп	10	12К 21К 22К 23К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К	priced	weapon	1	PHB 2024	—					2	
L0612	Глефа	20	12К 21К 22К 23К 24К 25К 26К 34К 35К 36К 39К 45К	priced	weapon	1	PHB 2024	—					6	
L0613	Секира	30	4К 12К 18К 21К 22К 23К 25К 34К 35К 36К 39К 41К 42К 43К 44К 45К	priced	weapon	1	PHB 2024	—					7	
L0614	Двуручный меч	50	4К 12К 21К 22К 23К 25К 26К 34К 35К 36К 39К 45К	priced	weapon	1	PHB 2024	—					6	
L0615	Алебарда	20	12К 21К 22К 23К 24К 25К 26К 34К 35К 36К 45К	priced	weapon	1	PHB 2024	—					6	
L0616	Ланс	10	4К 21К 22К 23К 25К 26К 44К 45К	priced	weapon	1	PHB 2024	—					6	
L0617	Длинный меч	15	3К 4К 12К 21К 22К 23К 25К 26К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	priced	weapon	1	PHB 2024	—					3	
L0618	Кувалда	10	6К 12К 17К 18К 21К 22К 23К 34К 35К 38К 42К 44К 45К	priced	weapon	1	PHB 2024	—					10	
L0619	Рапира	25	3К 4К 7К 12К 25К 26К 36К 42К 44К 46К 47К 48К	priced	weapon	1	PHB 2024	—					2	
L0620	Скимитар	25	7К 12К 21К 22К 23К 34К 35К 36К 42К 44К 46К 47К 48К	priced	weapon	1	PHB 2024	—					3	
L0621	Короткий меч	10	3К 4К 12К 21К 22К 23К 25К 34К 35К 36К 39К 40К 42К 44К 45К 46К 47К 48К	priced	weapon	1	PHB 2024	—					2	
L0622	Боевой молот	15	4К 12К 18К 21К 22К 23К 25К 34К 35К 36К 38К 39К 45К	priced	weapon	1	PHB 2024	—					5	
L0623	Дубинка	0.1	1К 2К 5К 9К 10К 19К 20К 22К 27К 34К 37К 41К 42К 43К 44К 46К 48К 49К	priced	weapon	1	PHB 2024	—					2	
L0624	Кинжал	2	1К 2К 3К 4К 5К 6К 7К 8К 9К 10К 11К 12К 18К 21К 22К 23К 25К 26К 27К 34К 35К 36К 39К 40К 41К 42К 44К 45К 46К 47К 48К 49К	priced	weapon	1	PHB 2024	—					1	
L0625	Большая дубина	0.2	5К 19К 20К 22К 34К 37К 41К 42К 43К 44К	priced	weapon	1	PHB 2024	—					10	
L0626	Ручной топор	5	1К 2К 5К 6К 11К 12К 17К 18К 19К 20К 21К 22К 23К 34К 37К 38К 41К 42К 43К 44К 45К 46К 47К 48К	priced	weapon	1	PHB 2024	—					2	
L0627	Стёганый доспех	5	12К 21К 22К 23К 34К 42К 44К 45К	priced	armor	1	PHB 2024	—					8	
L0628	Кожаный доспех	10	3К 12К 21К 22К 23К 34К 35К 36К 37К 42К 43К 44К 45К 46К 48К	priced	armor	1	PHB 2024	—					10	
L0629	Клёпаный кожаный доспех	45	4К 12К 21К 22К 23К 25К 34К 35К 36К 42К 44К 45К	priced	armor	1	PHB 2024	—					13	
L0630	Шкурный доспех	10	12К 22К 34К 35К 37К 42К 43К 44К	priced	armor	1	PHB 2024	—					12	
L0631	Кольчужная рубаха	50	4К 12К 21К 22К 23К 25К 34К 35К 36К 42К 44К 45К	priced	armor	1	PHB 2024	—					20	
L0632	Чешуйчатый доспех	50	12К 21К 22К 23К 25К 34К 35К 36К 42К 44К 45К	priced	armor	1	PHB 2024	—					45	
L0633	Кираса	400	4К 12К 21К 23К 25К 26К 35К 36К 39К 45К	priced	armor	1	PHB 2024	—					20	
L0634	Полулаты	750	4К 12К 23К 25К 26К 35К 36К 39К 45К	priced	armor	1	PHB 2024	—					40	
L0635	Кольчатый доспех	30	12К 21К 22К 23К 25К 34К 35К 42К 44К 45К	priced	armor	1	PHB 2024	—					40	
L0636	Кольчуга	75	4К 12К 21К 22К 23К 25К 34К 35К 36К 39К 45К	priced	armor	1	PHB 2024	—					55	
L0637	Наборный доспех	200	4К 12К 21К 23К 25К 26К 35К 36К 39К 45К	priced	armor	1	PHB 2024	—					60	
L0638	Латы	1500	4К 12К 23К 25К 26К 35К 36К 39К	priced	armor	1	PHB 2024	—					65	
L0639	Щит	10	3К 4К 12К 21К 22К 23К 24К 25К 26К 28К 34К 35К 36К 42К 44К 45К 47К	priced	armor	1	PHB 2024	—					6	
L0640	Набор алхимика	50	3К 7К 8К 13К 14К 15К 17К 32К 33К 35К 36К	priced	tool	1	PHB 2024	—					8	
L0641	Принадлежности пивовара	20	6К 9К 10К 15К 17К 20К 46К	priced	tool	1	PHB 2024	—					9	
L0642	Принадлежности каллиграфа	10	3К 4К 7К 8К 17К 26К 28К 29К 31К 32К	priced	tool	1	PHB 2024	—					5	
L0643	Инструменты плотника	8	1К 2К 6К 15К 17К 19К 20К 21К 22К 25К 46К 47К 48К	priced	tool	1	PHB 2024	—					6	
L0644	Инструменты картографа	15	4К 7К 8К 17К 21К 22К 25К 26К 31К 32К 44К 46К 47К 48К	priced	tool	1	PHB 2024	—					6	
L0645	Инструменты сапожника	5	6К 11К 17К 21К 22К 25К	priced	tool	1	PHB 2024	—					5	
L0646	Кухонная утварь	1	1К 2К 3К 4К 6К 9К 10К 17К 19К 20К 21К 22К 25К 26К 28К 29К 44К 46К 47К	priced	tool	1	PHB 2024	—					8	
L0647	Инструменты стеклодува	30	6К 7К 13К 14К 17К 32К 33К	priced	tool	1	PHB 2024	—					5	
L0648	Инструменты ювелира	25	3К 4К 7К 14К 17К 25К 26К 32К 33К	priced	tool	1	PHB 2024	—					2	
L0649	Инструменты кожевника	5	6К 11К 12К 17К 21К 22К	priced	tool	1	PHB 2024	—					5	
L0650	Инструменты каменщика	10	6К 17К 25К 26К 28К 29К 34К 38К 41К	priced	tool	1	PHB 2024	—					8	
L0651	Принадлежности художника	10	3К 4К 6К 17К 26К 28К 29К 31К	priced	tool	1	PHB 2024	—					5	
L0652	Инструменты гончара	10	6К 11К 17К 19К 20К	priced	tool	1	PHB 2024	—					3	
L0653	Инструменты кузнеца	20	6К 12К 17К 18К 21К 22К 23К 25К 47К	priced	tool	1	PHB 2024	—					8	
L0654	Инструменты жестянщика	50	3К 6К 8К 12К 17К 18К 23К 32К 33К	priced	tool	1	PHB 2024	—					10	
L0655	Инструменты ткача	1	1К 2К 3К 4К 6К 11К 17К 25К 26К	priced	tool	1	PHB 2024	—					5	
L0656	Инструменты резчика по дереву	1	1К 2К 6К 11К 12К 17К 19К 20К 28К 29К	priced	tool	1	PHB 2024	—					5	
L0657	Набор для грима	25	3К 4К 7К 9К 10К 25К 26К 42К 44К 46К 48К	priced	tool	1	PHB 2024	—					3	
L0658	Набор для подделки документов	15	3К 4К 7К 8К 25К 26К 31К 42К 46К 48К	priced	tool	1	PHB 2024	—					5	
L0659	Набор травника	5	1К 2К 6К 8К 11К 13К 17К 19К 28К 29К 33К 37К 44К	priced	tool	1	PHB 2024	—					3	
L0660	Инструменты навигатора	25	7К 15К 16К 31К 44К 46К 47К 48К 49К	priced	tool	1	PHB 2024	—					2	
L0661	Набор отравителя	50	3К 7К 13К 14К 27К 33К 36К 42К 48К	priced	tool	1	PHB 2024	—					2	
L0662	Воровские инструменты	25	3К 5К 7К 27К 34К 35К 36К 41К 42К 44К 46К 48К	priced	tool	1	PHB 2024	—					1	
L0663	Игральные кости	0.1	1К 2К 3К 9К 10К 21К 22К 27К 42К 44К 46К 47К 48К	priced	leisure	1	PHB 2024	—						
L0664	Драконьи шахматы	1	3К 4К 7К 9К 10К 25К 26К 31К	priced	leisure	1	PHB 2024	—						
L0665	Игральные карты	0.5	1К 2К 3К 7К 9К 10К 21К 22К 42К 44К 46К 47К 48К	priced	leisure	1	PHB 2024	—						
L0666	Три-Дракона	1	3К 4К 7К 9К 10К 25К 26К 46К	priced	leisure	1	PHB 2024	—						
L0667	Волынка	30	3К 4К 9К 10К 25К 26К 44К	priced	instrument	1	PHB 2024	—					6	
L0668	Барабан	6	9К 10К 21К 22К 25К 28К 29К 44К 46К 47К	priced	instrument	1	PHB 2024	—					3	
L0669	Цимбалы	25	3К 4К 9К 10К 25К 26К	priced	instrument	1	PHB 2024	—					10	
L0670	Флейта	2	1К 2К 3К 4К 9К 10К 19К 28К 29К 44К	priced	instrument	1	PHB 2024	—					1	
L0671	Рог	3	21К 22К 24К 25К 44К 46К 47К 48К	priced	instrument	1	PHB 2024	—					2	
L0672	Лютня	35	3К 4К 9К 10К 25К 26К 44К	priced	instrument	1	PHB 2024	—					2	
L0673	Лира	30	3К 4К 9К 10К 25К 26К 28К	priced	instrument	1	PHB 2024	—					2	
L0674	Флейта Пана	12	2К 3К 9К 10К 19К 29К 37К 44К	priced	instrument	1	PHB 2024	—					2	
L0675	Шалмей	2	2К 3К 9К 10К 21К 22К 44К	priced	instrument	1	PHB 2024	—					1	
L0676	Виола	30	3К 4К 9К 10К 25К 26К	priced	instrument	1	PHB 2024	—					1	
L0677	Кислота	25	7К 8К 13К 14К 15К 32К 33К 35К 36К	priced	consumable	2	PHB 2024	—					1	
L0678	Алхимический огонь	50	7К 8К 13К 14К 21К 23К 32К 33К 35К 36К 42К	priced	consumable	2	PHB 2024	—					1	
L0679	Противоядие	50	3К 4К 7К 11К 13К 14К 25К 26К 28К 29К 33К 36К 44К 46К	priced	consumable	2	PHB 2024	—					0	official-weightless
L0680	Рюкзак	2	1К 2К 3К 5К 11К 15К 16К 21К 22К 34К 35К 42К 44К 46К 47К 48К 49К	priced	gear	1	PHB 2024	—					5	
L0681	Шарики-подшипники	1	11К 17К 18К 21К 23К 34К 36К 42К 44К	priced	gear	2	PHB 2024	—					2	
L0682	Бочка	2	1К 2К 7К 9К 10К 15К 16К 19К 20К 21К 22К 25К 46К 47К 48К 49К	priced	container	2	PHB 2024	—					70	
L0683	Корзина	0.4	1К 2К 6К 7К 11К 15К 16К 19К 20К	priced	container	2	PHB 2024	—					2	
L0684	Спальный мешок	1	1К 2К 11К 15К 21К 22К 34К 42К 44К 46К 47К	priced	gear	2	PHB 2024	—					7	
L0685	Колокольчик	1	1К 2К 3К 4К 7К 9К 10К 11К 19К 20К 25К 26К 28К 29К 46К	priced	gear	1	PHB 2024	—					0	official-weightless
L0686	Одеяло	0.5	1К 2К 3К 4К 9К 11К 15К 19К 21К 22К 25К 26К 44К 46К 47К	priced	gear	2	PHB 2024	—					3	
L0687	Блок и снасти	1	15К 16К 17К 18К 20К 21К 22К 23К 25К 38К 46К 47К 48К	priced	gear	1	PHB 2024	—					5	
L0688	Книга	25	2К 3К 4К 7К 8К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К	priced	valuable	1	PHB 2024	—						
L0689	Стеклянная бутылка	2	1К 2К 3К 4К 7К 9К 10К 11К 13К 14К 15К 17К 33К 46К	priced	container	2	PHB 2024	—					2	
L0690	Ведро	0.05	1К 2К 6К 9К 10К 11К 15К 17К 18К 19К 20К 21К 22К 25К 46К	priced	gear	2	PHB 2024	—					2	
L0691	Калтропы	1	21К 22К 23К 24К 25К 27К 34К 36К 42К 44К 45К	priced	gear	2	PHB 2024	—					2	
L0692	Свеча	0.01	1К 2К 3К 4К 5К 7К 8К 9К 10К 11К 25К 26К 28К 29К 31К 32К 34К 35К 39К 40К	priced	gear	3	PHB 2024	—					0	official-weightless
L0693	Футляр для арбалетных болтов	1	12К 21К 22К 23К 34К 36К 42К 44К 45К	priced	gear	1	PHB 2024	—					1	
L0694	Тубус для карты или свитка	1	3К 4К 7К 8К 21К 25К 26К 28К 29К 31К 32К 34К 35К 36К 46К 47К	priced	gear	1	PHB 2024	—					1	
L0695	Цепь	5	6К 11К 15К 17К 18К 21К 22К 23К 25К 27К 34К 38К 42К 46К 47К 48К	priced	gear	1	PHB 2024	—					10	
L0696	Сундук	5	1К 2К 3К 4К 7К 8К 15К 16К 25К 26К 28К 29К 31К 32К 34К 35К 39К 40К 46К 47К 48К	priced	container	1	PHB 2024	—					25	
L0697	Набор альпиниста	25	7К 11К 21К 22К 34К 35К 37К 38К 41К 44К	priced	gear	1	PHB 2024	—					12	
L0698	Богатая одежда	15	3К 4К 7К 9К 25К 26К 36К 46К	priced	valuable	2	PHB 2024	—						
L0699	Дорожная одежда	2	1К 2К 3К 5К 9К 11К 21К 22К 42К 44К 46К 47К 48К	priced	gear	2	PHB 2024	—					4	
L0700	Сумка компонентов	25	3К 4К 8К 14К 25К 26К 28К 29К 32К 33К 35К 36К 39К 40К	priced	gear	1	PHB 2024	—					2	
L0701	Костюм	5	3К 4К 9К 10К 25К 26К 42К 44К 46К	priced	valuable	1	PHB 2024	—						
L0702	Лом	2	5К 6К 11К 15К 17К 18К 21К 22К 23К 27К 34К 38К 41К 42К 44К 46К 47К	priced	gear	1	PHB 2024	—					5	
L0703	Фляга	0.02	1К 2К 3К 5К 9К 10К 11К 15К 19К 21К 22К 34К 42К 44К 46К 47К 48К	priced	gear	2	PHB 2024	—					1	
L0704	Крюк-кошка	2	11К 17К 21К 22К 23К 24К 25К 34К 35К 37К 38К 41К 42К 44К 46К 47К 48К	priced	gear	1	PHB 2024	—					4	
L0705	Набор лекаря	5	1К 2К 3К 4К 7К 11К 13К 21К 22К 25К 26К 28К 29К 33К 44К 46К 47К	priced	consumable	2	PHB 2024	—					3	
L0706	Святая вода	25	3К 4К 7К 14К 25К 26К 28К 29К 30К 35К 36К 39К 40К	priced	consumable	2	PHB 2024	—					1	
L0707	Охотничий капкан	5	1К 5К 11К 15К 19К 22К 34К 37К 42К 43К 44К	priced	gear	1	PHB 2024	—					25	
L0708	Чернила	10	3К 4К 7К 8К 14К 25К 26К 28К 29К 31К 32К 33К	priced	gear	1	PHB 2024	—					0	official-weightless
L0709	Перо для письма	0.02	2К 3К 4К 7К 8К 25К 26К 28К 29К 31К 32К	priced	gear	2	PHB 2024	—					0	official-weightless
L0710	Кувшин	0.02	1К 2К 3К 4К 6К 9К 10К 11К 15К 19К 20К 25К 26К 46К	priced	container	2	PHB 2024	—					4	
L0711	Лестница	0.1	1К 2К 5К 6К 11К 15К 17К 19К 20К 21К 22К 25К 38К 46К	priced	gear	1	PHB 2024	—					25	
L0712	Масляная лампа	0.5	1К 2К 3К 4К 7К 8К 9К 10К 11К 25К 26К 28К 29К 31К 32К	priced	gear	2	PHB 2024	—					1	
L0713	Направленный фонарь	10	7К 21К 22К 23К 24К 25К 27К 34К 35К 38К 42К 44К 46К 47К 48К	priced	gear	1	PHB 2024	—					2	
L0714	Закрытый фонарь	5	3К 4К 7К 21К 22К 25К 34К 35К 42К 44К 46К 47К 48К	priced	gear	1	PHB 2024	—					2	
L0715	Замок	10	2К 3К 4К 7К 8К 11К 15К 16К 23К 25К 26К 27К 31К 32К 34К 36К 46К	priced	gear	1	PHB 2024	—					1	
L0716	Увеличительное стекло	100	3К 4К 7К 8К 14К 25К 26К 31К 32К 33К 36К	priced	valuable	1	PHB 2024	—						
L0717	Кандалы	2	21К 22К 23К 25К 27К 34К 35К 42К 46К 47К 48К	priced	gear	2	PHB 2024	—					6	
L0718	Карта	1	2К 3К 4К 7К 8К 16К 21К 22К 25К 26К 31К 32К 34К 35К 36К 41К 42К 44К 46К 47К 48К 49К	priced	gear	1	PHB 2024	—					0	official-weightless
L0719	Зеркало	5	2К 3К 4К 7К 9К 10К 25К 26К 36К 46К	priced	valuable	1	PHB 2024	—						
L0720	Сеть	1	11К 15К 16К 19К 22К 34К 37К 42К 43К 44К 46К 47К 48К 49К	priced	gear	1	PHB 2024	—					3	
L0721	Масло	0.1	1К 2К 3К 4К 7К 9К 10К 11К 13К 15К 17К 18К 21К 22К 25К 28К 29К 34К 44К 46К 47К	priced	consumable	3	PHB 2024	—					1	
L0722	Бумага	0.2	3К 4К 7К 8К 11К 14К 25К 26К 28К 29К 31К 32К 33К	priced	gear	3	PHB 2024	—					0	official-weightless
L0723	Пергамент	0.1	2К 3К 4К 7К 8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К	priced	gear	3	PHB 2024	—					0	official-weightless
L0724	Духи	5	3К 4К 7К 9К 10К 14К 25К 26К 36К	priced	valuable	1	PHB 2024	—						
L0725	Простой яд	100	7К 13К 14К 27К 33К 35К 36К 42К 48К	priced	consumable	1	PHB 2024	—					0	official-weightless
L0726	Шест	0.05	1К 2К 5К 6К 11К 15К 17К 19К 20К 22К 34К 37К 38К 44К 46К	priced	gear	1	PHB 2024	—					7	
L0727	Железный котелок	2	1К 2К 3К 6К 9К 10К 11К 15К 19К 20К 21К 22К 44К 46К 47К	priced	gear	1	PHB 2024	—					10	
L0728	Зелье лечения	50	3К 4К 7К 8К 11К 13К 14К 21К 22К 25К 26К 28К 29К 32К 33К 35К 36К 39К 40К 42К 44К 46К	priced	consumable	2	DMG 2024	—					0.5	
L0729	Кошель или подсумок	0.5	1К 2К 3К 4К 5К 7К 8К 9К 10К 11К 21К 22К 25К 26К 27К 34К 36К 39К 42К 44К 46К 47К 48К	priced	gear	2	PHB 2024	—					1	
L0730	Колчан	1	3К 4К 12К 21К 22К 23К 24К 25К 34К 36К 42К 44К 45К	priced	gear	1	PHB 2024	—					1	
L0731	Переносной таран	4	21К 22К 23К 25К 27К 34К 35К 41К 42К	priced	gear	1	PHB 2024	—					35	
L0732	Сухой паёк	0.5	1К 2К 5К 7К 11К 15К 16К 21К 22К 34К 37К 42К 44К 46К 47К 48К 49К	priced	food	4	PHB 2024	—						
L0733	Роба	1	2К 3К 4К 8К 14К 25К 26К 28К 29К 30К 31К 32К 33К	priced	gear	1	PHB 2024	—					4	
L0734	Верёвка	1	1К 2К 5К 6К 7К 11К 15К 16К 17К 19К 20К 21К 22К 27К 34К 35К 37К 38К 41К 42К 44К 46К 47К 48К 49К	priced	gear	2	PHB 2024	—					5	
L0735	Мешок	0.01	1К 2К 5К 6К 7К 9К 10К 11К 15К 16К 17К 19К 20К 21К 22К 34К 37К 38К 42К 44К 46К 47К 48К	priced	container	3	PHB 2024	—					0.5	
L0736	Лопата	2	1К 5К 6К 11К 15К 17К 19К 20К 21К 22К 34К 37К 38К 41К 42К 44К	priced	gear	1	PHB 2024	—					5	
L0737	Сигнальный свисток	0.05	1К 2К 9К 10К 21К 22К 23К 24К 25К 27К 42К 44К 46К 47К 48К	priced	gear	1	PHB 2024	—					0	official-weightless
L0738	Железные шипы, 10 шт.	1	11К 15К 17К 18К 21К 22К 23К 34К 35К 38К 42К 44К	priced	gear	2	PHB 2024	—					5	
L0739	Подзорная труба	1000	3К 4К 7К 21К 24К 25К 26К 31К 36К 46К 47К 48К 49К	priced	valuable	1	PHB 2024	—						
L0740	Бечёвка	0.1	1К 2К 5К 6К 11К 15К 17К 19К 20К 34К 44К 46К	priced	gear	2	PHB 2024	—					0	official-weightless
L0741	Палатка	2	11К 15К 16К 21К 22К 34К 37К 42К 44К 46К 47К	priced	gear	1	PHB 2024	—					20	
L0742	Огниво	0.5	1К 2К 3К 5К 6К 9К 10К 11К 15К 19К 21К 22К 34К 37К 42К 44К 46К 47К	priced	gear	1	PHB 2024	—					1	
L0743	Факел	0.01	1К 2К 5К 11К 15К 17К 21К 22К 24К 25К 27К 28К 29К 34К 35К 37К 38К 39К 40К 41К 42К 44К	priced	gear	3	PHB 2024	—					1	
L0744	Флакон	1	3К 4К 7К 8К 11К 13К 14К 17К 28К 29К 32К 33К 36К	priced	container	2	PHB 2024	—					0	official-weightless
L0745	Бурдюк	0.2	1К 2К 5К 7К 9К 10К 11К 15К 19К 21К 22К 34К 37К 42К 44К 46К 47К 48К	priced	gear	2	PHB 2024	—					5	
L0746	Стрелы, 20 шт.	1	11К 12К 15К 21К 22К 23К 24К 25К 34К 36К 42К 44К 45К	priced	ammo	2	PHB 2024	—					1	
L0747	Арбалетные болты, 20 шт.	1	11К 12К 15К 21К 22К 23К 24К 25К 34К 36К 42К 44К 45К 47К 48К	priced	ammo	2	PHB 2024	—					1.5	
L0748	Огнестрельные пули, 10 шт.	3	12К 15К 21К 23К 25К 26К 36К 46К 47К 48К	priced	ammo	2	PHB 2024	—					2	
L0749	Пули для пращи, 20 шт.	0.04	11К 12К 21К 22К 34К 37К 42К 44К	priced	ammo	2	PHB 2024	—					1.5	
L0750	Иглы для духовой трубки, 50 шт.	1	12К 13К 15К 33К 34К 37К 42К 43К 48К	priced	ammo	2	PHB 2024	—					1	
L0751	Магический кристалл	10	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К 39К	priced	focus	1	PHB 2024	—					1	
L0752	Магическая сфера	20	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К 39К	priced	focus	1	PHB 2024	—					3	
L0753	Магический жезл	10	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К	priced	focus	1	PHB 2024	—					2	
L0754	Магический посох	5	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К 39К	priced	focus	1	PHB 2024	—					4	
L0755	Магическая палочка	10	3К 4К 8К 14К 25К 26К 32К 33К 35К 36К	priced	focus	1	PHB 2024	—					1	
L0756	Ветка омелы	1	19К 28К 29К 30К 37К 41К 43К	priced	focus	1	PHB 2024	—					0	official-weightless
L0757	Деревянный друидский посох	5	19К 28К 29К 30К 37К 41К 43К	priced	focus	1	PHB 2024	—					4	
L0758	Тисовая палочка	10	19К 28К 29К 30К 37К 41К 43К	priced	focus	1	PHB 2024	—					1	
L0759	Священный амулет	5	3К 4К 25К 26К 28К 29К 30К 35К 36К 39К 40К	priced	focus	1	PHB 2024	—					1	
L0760	Священная эмблема	5	4К 21К 23К 25К 26К 28К 29К 30К 35К 39К 40К	priced	focus	1	PHB 2024	—					0	official-weightless
L0761	Реликварий	5	3К 4К 25К 26К 28К 29К 30К 35К 36К 39К 40К	priced	focus	1	PHB 2024	—					2	
L0762	Свиток заговора	30	8К 14К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0763	Свиток 1-го уровня	50	8К 14К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0764	Свиток 2-го уровня	200	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0765	Свиток 3-го уровня	300	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0766	Свиток 4-го уровня	2000	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0767	Свиток 5-го уровня	3000	8К 14К 25К 26К 28К 29К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0768	Свиток 6-го уровня	20000	14К 26К 28К 30К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0769	Свиток 7-го уровня	25000	14К 26К 28К 30К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0770	Свиток 8-го уровня	30000	14К 26К 28К 30К 31К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0771	Свиток 9-го уровня	100000	14К 26К 30К 32К 33К 35К 36К 39К 40К	priced	scroll	1	DMG 2024	—						
L0772	Кружка эля	0.04	1К 2К 3К 9К 10К 19К 20К 21К 22К 44К 46К 47К 48К	priced	food	4	PHB 2024	—						
L0773	Буханка хлеба	0.02	1К 2К 3К 4К 9К 10К 15К 16К 19К 20К 21К 22К 25К 26К 44К 46К	priced	food	4	PHB 2024	—						
L0774	Кусок сыра	0.1	1К 2К 3К 4К 9К 10К 15К 16К 19К 20К 25К 26К 44К 46К	priced	food	3	PHB 2024	—						
L0775	Бутылка обычного вина	0.2	2К 3К 4К 7К 9К 10К 15К 16К 25К 26К 46К 47К 48К	priced	food	3	PHB 2024	—						
L0776	Бутылка хорошего вина	10	3К 4К 7К 9К 10К 15К 16К 25К 26К 36К 46К	priced	valuable	2	PHB 2024	—						
L0777	Верблюд	50	7К 15К 16К 19К 22К 25К 26К 44К	priced	animal	1	PHB 2024	—						
L0778	Слон	200	4К 7К 16К 22К 25К 26К	priced	animal	1	PHB 2024	—						
L0779	Тягловая лошадь	50	4К 7К 15К 16К 19К 20К 21К 22К 25К 26К 44К	priced	animal	1	PHB 2024	—						
L0780	Верховая лошадь	75	3К 4К 7К 16К 21К 22К 25К 26К 44К	priced	animal	1	PHB 2024	—						
L0781	Мастиф	25	1К 2К 3К 4К 7К 19К 21К 22К 24К 25К 26К 42К 44К 46К 47К 48К	priced	animal	1	PHB 2024	—						
L0782	Мул	8	1К 2К 6К 7К 15К 16К 19К 20К 22К 44К	priced	animal	1	PHB 2024	—						
L0783	Пони	30	1К 2К 3К 4К 7К 16К 19К 22К 44К	priced	animal	1	PHB 2024	—						
L0784	Боевой конь	400	4К 21К 22К 23К 25К 26К 45К	priced	animal	1	PHB 2024	—						
L0785	Карета	100	3К 4К 7К 16К 25К 26К	priced	vehicle	1	PHB 2024	—					600	
L0786	Телега	15	1К 2К 6К 7К 11К 15К 16К 19К 20К 44К	priced	vehicle	1	PHB 2024	—					200	
L0787	Колесница	250	4К 21К 22К 23К 25К 26К 45К	priced	vehicle	1	PHB 2024	—					100	
L0788	Корм для животного, 1 день	0.05	7К 15К 16К 19К 20К 21К 22К 25К 44К	priced	supply	1	PHB 2024	—						
L0789	Экзотическое седло	60	4К 7К 14К 25К 26К 32К 46К	priced	tack	1	PHB 2024	—					40	
L0790	Военное седло	20	4К 21К 22К 23К 25К 26К 45К	priced	tack	1	PHB 2024	—					30	
L0791	Верховое седло	10	2К 3К 4К 7К 16К 19К 21К 22К 25К 26К 44К	priced	tack	1	PHB 2024	—					25	
L0792	Сани	20	15К 16К 19К 20К 22К 44К	priced	vehicle	1	PHB 2024	—					300	
L0793	Фургон	35	2К 3К 4К 7К 15К 16К 19К 20К 21К 22К 25К 44К	priced	vehicle	1	PHB 2024	—					400	
L0794	Воздушный корабль	40000	25К 26К 32К	priced	large_vehicle	1	PHB 2024	—						
L0795	Галера	30000	46К 47К 48К 49К	priced	large_vehicle	1	PHB 2024	—						
L0796	Килевой бот	3000	16К 46К 47К 48К 49К	priced	large_vehicle	1	PHB 2024	—						
L0797	Драккар / длинный корабль	10000	46К 47К 48К 49К	priced	large_vehicle	1	PHB 2024	—						
L0798	Гребная лодка	50	15К 16К 19К 44К 46К 47К 48К 49К	priced	large_vehicle	1	PHB 2024	—						
L0799	Парусный корабль	10000	46К 47К 48К 49К	priced	large_vehicle	1	PHB 2024	—						
L0800	Военный корабль	25000	47К 48К 49К	priced	large_vehicle	1	PHB 2024	—						
L0801	Стёганый доспех для ездового животного	20	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					16	
L0802	Кожаный доспех для ездового животного	40	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					20	
L0803	Клёпаный кожаный доспех для ездового животного	180	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					26	
L0804	Шкурный доспех для ездового животного	40	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					24	
L0805	Кольчужная рубаха для ездового животного	200	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					40	
L0806	Чешуйчатый доспех для ездового животного	200	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					90	
L0807	Кираса для ездового животного	1600	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					40	
L0808	Полулаты для ездового животного	3000	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					80	
L0809	Кольчатый доспех для ездового животного	120	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					80	
L0810	Кольчуга для ездового животного	300	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					110	
L0811	Наборный доспех для ездового животного	800	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					120	
L0812	Латы для ездового животного	6000	4К 19К 21К 22К 23К 25К 26К 44К 45К	priced	barding	1	PHB 2024	4 × цена доспеха					130	
L0813	1 фунт пшеницы	0.01	1К 2К 5К 6К 11К 15К 16К 19К 20К 44К	priced	trade_good	5	DMG 2024	—						
L0814	1 фунт муки или один цыплёнок	0.02	1К 2К 5К 6К 11К 15К 16К 19К 20К 44К	priced	trade_good	5	DMG 2024	—						
L0815	1 фунт соли	0.05	1К 2К 5К 6К 11К 15К 16К 19К 20К 44К	priced	trade_good	5	DMG 2024	—						
L0816	1 фунт железа или 1 кв. ярд холста	0.1	6К 11К 15К 17К 18К 21К 22К 23К 38К 46К 47К	priced	trade_good	5	DMG 2024	—						
L0817	1 фунт меди или 1 кв. ярд хлопковой ткани	0.5	6К 11К 15К 17К 18К 21К 22К 23К 38К 46К 47К	priced	trade_good	5	DMG 2024	—						
L0818	1 фунт имбиря или одна коза	1	7К 15К 16К 19К 20К 22К 44К	priced	trade_good	2	DMG 2024	—						
L0819	1 фунт корицы или перца, или одна овца	2	7К 15К 16К 19К 20К 22К 44К	priced	trade_good	2	DMG 2024	—						
L0820	1 фунт гвоздики или одна свинья	3	7К 15К 16К 19К 20К 22К 44К	priced	trade_good	2	DMG 2024	—						
L0821	1 фунт серебра или 1 кв. ярд льна	5	3К 4К 7К 14К 25К 26К 46К	priced	trade_good	2	DMG 2024	—						
L0822	1 фунт шёлка или одна корова	10	4К 7К 15К 16К 19К 25К 26К 44К	priced	trade_good	1	DMG 2024	—						
L0823	1 фунт шафрана или один вол	15	4К 7К 15К 16К 19К 25К 26К 44К	priced	trade_good	1	DMG 2024	—						
L0824	1 фунт золота	50	4К 7К 14К 25К 26К 36К	priced	trade_good	1	DMG 2024	—						
L0825	1 фунт платины	500	4К 14К 25К 26К 36К	priced	trade_good	1	DMG 2024	—						
L0826	Азурит	10	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	priced	gemstone	3	DMG 2024	—						
L0827	Малахит	10	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	priced	gemstone	3	DMG 2024	—						
L0828	Обсидиан	10	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	priced	gemstone	3	DMG 2024	—						
L0829	Гелиотроп	50	35К 36К 39К 40К 41К 43К	priced	gemstone	2	DMG 2024	—						
L0830	Сердолик	50	35К 36К 39К 40К 41К 43К	priced	gemstone	2	DMG 2024	—						
L0831	Яшма	50	35К 36К 39К 40К 41К 43К	priced	gemstone	2	DMG 2024	—						
L0832	Лунный камень	50	35К 36К 39К 40К 41К 43К	priced	gemstone	2	DMG 2024	—						
L0833	Оникс	50	35К 36К 39К 40К 41К 43К	priced	gemstone	2	DMG 2024	—						
L0834	Циркон	50	35К 36К 39К 40К 41К 43К	priced	gemstone	2	DMG 2024	—						
L0835	Аметист	100	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0836	Хризоберилл	100	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0837	Коралл	100	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0838	Гранат	100	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0839	Нефрит	100	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0840	Жемчуг	100	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0841	Турмалин	100	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0842	Аквамарин	500	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0843	Топаз	500	36К 39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0846	Изумруд	1000	39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0847	Опал	1000	39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0848	Сапфир	1000	39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0849	Алмаз	5000	39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0850	Рубин	5000	39К 40К 43К	priced	gemstone	1	DMG 2024	—						
L0851	Серебряный кувшин	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0852	Резная костяная статуэтка	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0853	Золотой браслет	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0854	Одеяние из золотой парчи	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0855	Чёрная бархатная маска с серебряной нитью	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0856	Медный кубок с серебряной филигранью	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0857	Пара гравированных костяных костей	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0858	Ручное зеркало в painted деревянной раме	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0859	Вышитый шёлковый платок	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0860	Золотой медальон с портретом	25	3К 4К 7К 9К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0861	Золотое кольцо с сердоликом	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0862	Резная статуэтка из слоновой кости	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0863	Золотой браслет с драгоценными камнями	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0864	Серебряное ожерелье с подвеской	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0865	Бронзовая корона	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0866	Шёлковое одеяние с золотой вышивкой	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0867	Гобелен 10×10 футов	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0868	Латунная кружка с нефритовой инкрустацией	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0869	Коробка с бирюзовыми фигурками животных	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0870	Золотая клетка для птиц с электрумовой филигранью	250	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0871	Серебряный кубок с лунными камнями	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0872	Связка нот утерянных песнопений	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0873	Резная деревянная арфа с инкрустацией	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0874	Золотой идол	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0875	Золотой гребень в форме дракона	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0876	Пробка для бутылки с золотым листом	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0877	Череп драконорождённого из электрума	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0878	Серебряно-золотая брошь	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0879	Обсидиановая статуэтка с золотом	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0880	Расписная золотая боевая маска	750	4К 7К 25К 26К 36К	priced	art_object	1	DMG 2024	—						
L0881	Тонкая золотая цепь с огненным опалом	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0882	Старинная картина	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0883	Вышитая шёлково-бархатная мантия	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0884	Платиновый браслет с изумрудом	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0885	Вышитая перчатка с осколками самоцветов	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0886	Ножной браслет с драгоценными камнями	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0887	Золотая музыкальная шкатулка	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0888	Золотой венец с четырьмя аквамаринами	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0889	Повязка на глаз с сапфирами и лунными камнями	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0890	Ожерелье из розового жемчуга	2500	26К 36К	priced	art_object	1	DMG 2024	—						
L0891	Золотая корона с драгоценными камнями	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0892	Платиновое кольцо с драгоценными камнями	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0893	Золотая статуэтка с рубинами	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0894	Золотой кубок с изумрудами	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0895	Золотая шкатулка для украшений с платиновой филигранью	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0896	Набор золотых матрёшек	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0897	Нефритовая игровая доска с золотыми фигурами	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0898	Рог для питья из слоновой кости с золотой филигранью	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0899	Позолоченная королевская карета или погребальная баржа	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0900	Церемониальный золотой доспех с чёрным жемчугом	7500	26К 36К	priced	art_object	1	DMG 2024	—						
L0906	Обычное магическое кольцо	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	—						
L0907	Необычное магическое кольцо	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	—						
L0908	Редкое магическое кольцо	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	—						
L0909	Очень редкое магическое кольцо	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	—						
L0910	Легендарное магическое кольцо	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	—						
L0911	Обычный магический жезл	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	DMG 2024	—						
L0912	Необычный магический жезл	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	DMG 2024	—						
L0913	Редкий магический жезл	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	DMG 2024	—						
L0914	Очень редкий магический жезл	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	DMG 2024	—						
L0915	Легендарный магический жезл	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_rod	1	DMG 2024	—						
L0916	Обычный магический посох	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	—						
L0917	Необычный магический посох	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	—						
L0918	Редкий магический посох	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	—						
L0919	Очень редкий магический посох	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	—						
L0920	Легендарный магический посох	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	—						
L0921	Обычная магическая палочка	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	—						
L0922	Необычная магическая палочка	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	—						
L0923	Редкая магическая палочка	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	—						
L0924	Очень редкая магическая палочка	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	—						
L0925	Легендарная магическая палочка	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	—						
L0926	Обычный чудесный предмет	100	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	—						
L0927	Необычный чудесный предмет	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	—						
L0928	Редкий чудесный предмет	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	—						
L0929	Очень редкий чудесный предмет	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	—						
L0930	Легендарный чудесный предмет	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	—						
L0931	Необычные магические боеприпасы, 10 шт.	200	12К 14К 21К 23К 25К 26К 35К 36К 42К 44К 45К 47К 48К	priced	magic_ammo	1	DMG 2024	—						
L0932	Редкие магические боеприпасы, 10 шт.	2000	12К 14К 21К 23К 25К 26К 35К 36К 42К 44К 45К 47К 48К	priced	magic_ammo	1	DMG 2024	—						
L0933	Очень редкие магические боеприпасы, 10 шт.	20000	12К 14К 21К 23К 25К 26К 35К 36К 42К 44К 45К 47К 48К	priced	magic_ammo	1	DMG 2024	—						
L0934	Мумифицированная рука гоблина	NULL	1К 2К 3К 4К 5К 34К 35К 36К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0935	Кристалл, слабо светящийся в лунном свете	NULL	1К 2К 3К 4К 5К 8К 32К 33К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0936	Золотая монета неизвестной страны	NULL	2К 3К 4К 7К 9К 10К 21К 22К 25К 26К 34К 36К 42К 44К 46К 48К	flavor	trinket	1	SRD 5.2	—						
L0937	Дневник на неизвестном языке	NULL	2К 3К 4К 7К 8К 25К 26К 28К 29К 31К 32К 33К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0938	Латунное кольцо, которое не тускнеет	NULL	1К 2К 3К 4К 7К 9К 10К 25К 26К 42К 44К	flavor	trinket	1	SRD 5.2	—						
L0939	Старая шахматная фигура из стекла	NULL	2К 3К 4К 7К 9К 10К 25К 26К 31К	flavor	trinket	1	SRD 5.2	—						
L0940	Пара костяных игральных костей с черепом вместо шестёрки	NULL	1К 2К 3К 9К 10К 21К 22К 27К 42К 44К 46К 48К	flavor	trinket	1	SRD 5.2	—						
L0941	Маленький идол, вызывающий кошмары	NULL	34К 35К 36К 39К 40К 41К 43К	flavor	trinket	1	SRD 5.2	—						
L0942	Прядь чьих-то волос	NULL	1К 2К 3К 4К 5К 7К 9К 10К 25К 26К 27К 34К 35К 36К 39К 40К 42К 44К 46К 48К	flavor	trinket	1	SRD 5.2	—						
L0943	Грамота на участок земли в неизвестном королевстве	NULL	3К 4К 25К 26К 31К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0944	Брусок неизвестного материала весом 1 унция	NULL	8К 14К 31К 32К 33К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0945	Маленькая тряпичная кукла, пронзённая иглами	NULL	1К 2К 5К 34К 35К 36К 39К 40К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0946	Зуб неизвестного зверя	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	trinket	1	SRD 5.2	—						
L0947	Огромная чешуйка, возможно, драконья	NULL	34К 35К 36К 39К 40К 41К 43К	flavor	trinket	1	SRD 5.2	—						
L0948	Ярко-зелёное перо	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	trinket	1	SRD 5.2	—						
L0949	Старая карта предсказаний с вашим изображением	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0950	Стеклянный шар, наполненный движущимся дымом	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0951	Яйцо весом 1 фунт с ярко-красной скорлупой	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0952	Трубка, выдувающая пузыри	NULL	1К 2К 3К 4К 9К 10К 25К 26К 42К 44К	flavor	trinket	1	SRD 5.2	—						
L0953	Стеклянная банка с плотью в рассоле	NULL	8К 14К 31К 32К 33К 34К 35К 36К 39К 40К	flavor	trinket	1	SRD 5.2	—						
L0954	Гномья музыкальная шкатулка	NULL	3К 4К 7К 8К 14К 25К 26К 31К 32К 33К	flavor	trinket	1	SRD 5.2	—						
L0955	Деревянная статуэтка самодовольного полурослика	NULL	1К 2К 3К 4К 9К 10К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L0956	Латунный шар с выгравированными рунами	NULL	8К 14К 31К 32К 33К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0957	Разноцветный каменный диск	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0958	Серебряный значок ворона	NULL	3К 4К 7К 25К 26К 28К 29К 30К	flavor	trinket	1	SRD 5.2	—						
L0959	Мешочек с 47 зубами, один из которых гнилой	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0960	Осколок обсидиана, всегда тёплый на ощупь	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0961	Коготь дракона на кожаном шнурке	NULL	34К 35К 36К 39К 40К 41К 43К	flavor	trinket	1	SRD 5.2	—						
L0962	Пара старых носков	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L0963	Пустая книга, страницы которой не удерживают чернила	NULL	8К 14К 31К 32К 33К 35К 36К	flavor	trinket	1	SRD 5.2	—						
L0964	Серебряный значок в виде пятиконечной звезды	NULL	21К 22К 23К 25К 27К 45К	flavor	trinket	1	SRD 5.2	—						
L0965	Нож, принадлежавший родственнику	NULL	1К 2К 3К 4К 5К 7К 9К 10К 25К 26К 42К 44К 46К 48К	flavor	trinket	1	SRD 5.2	—						
L0966	Стеклянный флакон с обрезками ногтей	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0967	Прямоугольное металлическое устройство с двумя чашечками	NULL	6К 11К 12К 17К 18К 23К 32К 33К 38К	flavor	trinket	1	SRD 5.2	—						
L0968	Белая перчатка с блёстками человеческого размера	NULL	3К 4К 7К 9К 10К 25К 26К	flavor	trinket	1	SRD 5.2	—						
L0969	Жилет с сотней крошечных карманов	NULL	1К 2К 3К 4К 9К 10К 25К 26К 42К 44К	flavor	trinket	1	SRD 5.2	—						
L0970	Невесомый камень	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0971	Набросок гоблина, сделанный неизвестным художником	NULL	1К 2К 5К 34К 35К 36К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0972	Пустая банка из-под маринада	NULL	1К 2К 3К 4К 9К 10К 15К 16К 19К 20К 25К 26К 44К 46К	flavor	trinket	1	SRD 5.2	—						
L0973	Оловянная ложка с гравировкой	NULL	1К 2К 3К 4К 6К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К	flavor	trinket	1	SRD 5.2	—						
L0974	Кусок угля, который никогда не пачкает	NULL	6К 11К 12К 17К 18К 23К 32К 33К 38К	flavor	trinket	1	SRD 5.2	—						
L0975	Маленькая деревянная шкатулка с двумя крошечными металлическими чашечками	NULL	6К 11К 12К 17К 18К 23К 32К 33К 38К	flavor	trinket	1	SRD 5.2	—						
L0976	Кусок кожи с татуировкой	NULL	1К 2К 5К 34К 35К 36К 42К 43К 44К	flavor	trinket	1	SRD 5.2	—						
L0977	Крошечная серебряная ложка	NULL	3К 4К 7К 9К 10К 25К 26К 46К	flavor	trinket	1	SRD 5.2	—						
L0978	Трубка из полированного дерева	NULL	1К 2К 3К 4К 9К 10К 25К 26К 44К 46К	flavor	trinket	1	SRD 5.2	—						
L0979	Осколок синего кристалла	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0980	Керамическая маска	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К	flavor	trinket	1	SRD 5.2	—						
L0981	Костяной свисток	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0982	Маленький мешочек с блестящими камешками	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L0983	Пряжка от старого ремня	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L0984	Осколок цветного стекла	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К	flavor	trinket	1	SRD 5.2	—						
L0985	Маленькая глиняная фигурка	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L0986	Кусок верёвки с узлами	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К 46К	flavor	trinket	1	SRD 5.2	—						
L0987	Пёрышко неизвестной птицы	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	trinket	1	SRD 5.2	—						
L0988	Засохший цветок	NULL	1К 2К 3К 4К 9К 10К 19К 20К 28К 29К 44К	flavor	trinket	1	SRD 5.2	—						
L0989	Камешек с дыркой	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	trinket	1	SRD 5.2	—						
L0990	Кусок мела	NULL	3К 4К 7К 8К 25К 26К 28К 29К 31К 32К 33К	flavor	trinket	1	SRD 5.2	—						
L0991	Ржавый ключ	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	trinket	1	SRD 5.2	—						
L0992	Сломанная фигурка	NULL	1К 2К 5К 34К 35К 36К 42К 43К 44К	flavor	trinket	1	SRD 5.2	—						
L0993	Пучок сухих трав	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 28К 29К 44К	flavor	trinket	1	SRD 5.2	—						
L0994	Кусок мыла	NULL	1К 2К 3К 4К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К	flavor	trinket	1	SRD 5.2	—						
L0995	Гребень	NULL	1К 2К 3К 4К 9К 10К 25К 26К 44К 46К	flavor	trinket	1	SRD 5.2	—						
L0996	Щётка для одежды	NULL	1К 2К 3К 4К 9К 10К 25К 26К 44К 46К	flavor	trinket	1	SRD 5.2	—						
L0997	Катушка ниток	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L0998	Иголка	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L0999	Напёрсток	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L1000	Клубок шерсти	NULL	1К 2К 5К 6К 11К 15К 17К 19К 20К 44К	flavor	trinket	1	SRD 5.2	—						
L1001	Деревянная ложка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1002	Погнутая вилка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1003	Треснувшая тарелка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1004	Глиняная кружка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1005	Сколотая чашка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1006	Ржавый кухонный нож	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1007	Разделочная доска	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1008	Деревянная миска	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1009	Старая кастрюля	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1010	Пустая банка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1011	Пробка от бутылки	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1012	Связка сухих трав	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1013	Кусок мыла	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1014	Гребень	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1015	Щётка для одежды	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1016	Катушка ниток	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1017	Иголка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1018	Напёрсток	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1019	Клубок шерсти	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1020	Лоскут ткани	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1021	Запасная пуговица	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1022	Кожаный ремешок	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1023	Старая пряжка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1024	Пустая коробочка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1025	Небольшая шкатулка без ценностей	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1026	Детская деревянная игрушка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1027	Тряпичная кукла	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1028	Деревянный кубик	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1029	Сломанная фигурка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1030	Пучок перьев	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1031	Высохший букет	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1032	Семейный портрет без художественной ценности	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1033	Пустая рамка	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1034	Кусок воска	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1035	Огарок свечи	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1036	Каминные щипцы	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1037	Кочерга	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1038	Совок для золы	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1039	Связка дров	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1040	Мешочек золы	NULL	1К 2К 3К 4К 5К 6К 7К 9К 10К 11К 15К 17К 19К 20К 25К 26К 44К 46К 48К	flavor	flavor_household	1	Оригинал	—						
L1041	Личное письмо	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1042	Неотправленное письмо	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1043	Счёт за товары	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1044	Расписка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1045	Товарная накладная	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1046	Список покупок	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1047	Список долгов	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1048	Список имён	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1049	Квитанция	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1050	Пропуск	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1051	Разрешение на въезд	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1052	Старый договор	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1053	Черновик договора	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1054	Приказ командира	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1055	Рапорт	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1056	Караульный журнал	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1057	Список дежурств	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1058	Список заключённых	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1059	Ордер на арест	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1060	Объявление о розыске	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1061	Культовая записка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1062	Молитва на отдельном листе	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1063	Проповедь	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1064	Записка библиотекаря	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1065	Каталожная карточка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1066	Черновые заметки учёного	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1067	Лабораторные записи	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1068	Рецепт без указанной стоимости компонентов	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1069	Кодированное сообщение	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1070	Обрывок шифра	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1071	Корабельная ведомость	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1072	Список команды	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1073	Грузовой манифест	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1074	Портовая расписка	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1075	Письмо капитану	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1076	Черновой план помещения	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1077	Обрывок карты без практической ценности	NULL	2К 3К 4К 7К 8К 9К 10К 15К 16К 21К 22К 25К 26К 27К 28К 29К 30К 31К 32К 33К 42К 44К 46К 47К 48К	flavor	flavor_documents	1	Оригинал	—						
L1078	Старый железный ключ	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1079	Маленький ключ от шкатулки	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1080	Ключ от двери	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1081	Ключ от склада	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1082	Ключ от сундука	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1083	Ключ от камеры	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1084	Ключ неизвестного назначения	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1085	Связка неподписанных ключей	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1086	Именной жетон	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1087	Простой медальон без ценного металла	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1088	Дешёвая брошь	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1089	Деревянный кулон	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1090	Костяная подвеска	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1091	Памятный камешек	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1092	Прядь волос в ленте	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1093	Сухой цветок в конверте	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1094	Личная записка	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1095	Карманный талисман	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1096	Простое кольцо без указанной ценности	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1097	Старая печать без указанной ценности	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1098	Пустой кошелёк	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1099	Пустой футляр	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1100	Сломанные очки	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1101	Одна перчатка	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1102	Один носок	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1103	Шейный платок	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1104	Носовой платок	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1105	Изношенный пояс	NULL	1К 2К 3К 4К 5К 7К 8К 9К 10К 15К 16К 21К 22К 23К 24К 25К 26К 27К 28К 29К 30К 31К 32К 33К 34К 35К 36К 39К 40К 41К 42К 44К 46К 47К 48К 49К	flavor	flavor_keys_personal	1	Оригинал	—						
L1106	Гнутый гвоздь	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1107	Горсть гвоздей без установленной цены	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1108	Деревянный клин	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1109	Кусок проволоки	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1110	Обломок металлического прута	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1111	Ржавая шестерёнка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1112	Малая пружина	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1113	Сломанная рукоять инструмента	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1114	Кусок кожи	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1115	Кожаная заготовка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1116	Обрезок доски	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1117	Деревянная заготовка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1118	Кусок необработанного камня	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1119	Обломок кирпича	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1120	Комок глины	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1121	Форма для отливки	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1122	Пустая форма для свечей	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1123	Кузнечный шлак	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1124	Угольный огарок	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1125	Обломок руды без установленной ценности	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1126	Кусок стекла	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1127	Стеклянная заготовка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1128	Керамический черепок	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1129	Испорченная деталь механизма	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1130	Сломанный замочный механизм	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1131	Набросок изделия	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1132	Мерная палочка	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1133	Верёвочный отвес	NULL	6К 11К 12К 13К 15К 17К 18К 19К 20К 21К 22К 23К 32К 33К 38К 46К 47К 48К	flavor	flavor_workshop	1	Оригинал	—						
L1134	Пустые ножны	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1135	Сломанные ножны	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1136	Ремень для оружия	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1137	Плечевая перевязь	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1138	Обломок древка	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1139	Сломанный наконечник стрелы	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1140	Погнутая пряжка доспеха	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1141	Кожаный ремень доспеха	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1142	Обрывок кольчуги	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1143	Сломанная застёжка шлема	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1144	Старая нашивка	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1145	Воинский знак без установленной ценности	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1146	Полковой знак	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1147	Потрёпанное знамя	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1148	Обрывок знамени	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1149	Точильный камень без установленной цены	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1150	Пустая фляга солдата	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1151	Пустой футляр для боеприпасов	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1152	Тряпка для чистки оружия	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1153	Мешочек с песком	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1154	Костяной жетон	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1155	Деревянная тренировочная мишень	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1156	Сломанная тренировочная палка	NULL	21К 22К 23К 24К 25К 27К 34К 35К 36К 39К 40К 42К 44К 45К 47К 48К	flavor	flavor_military	1	Оригинал	—						
L1157	Обрывок парусины	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1158	Кусок каната	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1159	Морской узел на коротком шнуре	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1160	Деревянный блок такелажа	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1161	Сломанный шкив	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1162	Деревянная пробка для корпуса	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1163	Кусок смолы	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1164	Обломок весла	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1165	Сломанная рукоять весла	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1166	Ржавая корабельная скоба	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1167	Медный гвоздь обшивки	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1168	Обломок мачты	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1169	Кусок расписной обшивки	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1170	Сигнальный флажок	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1171	Кусок старого паруса	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1172	Морская раковина	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1173	Пустая бутылка с пробкой	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1174	Рыболовный крючок без установленной цены	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1175	Поплавок	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1176	Кусок рыболовной лески	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1177	Сетка с прорехой	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1178	Капитанская записка	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1179	Бирка с грузового ящика	NULL	46К 47К 48К 49К	flavor	flavor_ship	1	Оригинал	—						
L1180	Обломок кости	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1181	Череп мелкого животного	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1182	Зуб неизвестного зверя	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1183	Коготь неизвестного зверя	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1184	Клок шерсти	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1185	Кусок высохшей кожи	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1186	Перо неизвестной птицы	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1187	Пустой кокон	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1188	Старая паутина	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1189	Высохший гриб	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1190	Пучок мха	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1191	Кусок сталактита	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1192	Гладкий пещерный камень	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1193	Осколок кристалла без установленной ценности	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1194	Обломок статуи	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1195	Кусок мозаики	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1196	Каменная табличка без читаемого текста	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1197	Обломок саркофага	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1198	Черепок погребальной урны	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1199	Пустая урна	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1200	Погасшая лампада	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1201	Обрывок савана	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1202	Истлевшая лента	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1203	Ржавая скоба	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1204	Сломанный рычаг	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1205	Кусок цепи неизвестной длины	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1206	Пустая клетка	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1207	Обломок решётки	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1208	Кусок обгоревшего дерева	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1209	Комок засохшей грязи	NULL	34К 35К 36К 37К 38К 39К 40К 41К 42К 43К 49К	flavor	flavor_dungeon	1	Оригинал	—						
L1210	Пустой мешочек из-под компонентов	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1211	Использованный лист с магическими расчётами	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1212	Сломанный мел для ритуального круга	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1213	Стеклянная трубка без реагента	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1214	Высохший алхимический осадок	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1215	Обугленный кусок пергамента	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1216	Погасший благовонный конус	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1217	Пустой футляр для свитка	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1218	Неактивный кристаллический осколок	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1219	Перо для письма с пятнами чернил	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1220	Ритуальная лента	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1221	Верёвочка с узлами для счёта	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1222	Кусочек воска с отпечатком печати	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1223	Разбитая пробирка	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1224	Неизвестный порошок без установленной стоимости	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1225	Сухая трава без установленной стоимости	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1226	Обычный камень с нарисованной руной	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1227	Сломанная деревянная палочка без магии	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1228	Пустой маленький мешок с запахом трав	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1229	Кусок ткани с вышитым символом	NULL	8К 14К 28К 29К 30К 31К 32К 33К 35К 36К 39К 40К 41К 43К	flavor	flavor_magic_flavor	1	Оригинал	—						
L1230	Горсть семян без установленной цены	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1231	Связка соломы	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1232	Пучок сена	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1233	Деревянная бирка для скота	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1234	Кусок подковы	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1235	Старая подкова	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1236	Кожаный ошейник животного	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1237	Деревянная рукоять	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1238	Кусок мешковины	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1239	Плетёная верёвка	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1240	Сломанная корзина	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1241	Пустой мешок из-под зерна	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1242	Сухой початок	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1243	Пучок сушёных растений	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1244	Деревянный колышек	NULL	1К 5К 6К 11К 15К 16К 19К 20К 44К	flavor	flavor_farm	1	Оригинал	—						
L1245	Огарок храмовой свечи	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1246	Лента с молитвой	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1247	Простой деревянный символ веры	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1248	Каменный символ без драгоценных материалов	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1249	Чётки без установленной стоимости	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1250	Маленькая молитвенная дощечка	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1251	Пустая коробочка для благовоний	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1252	Высохший венок	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1253	Погребальная лента	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1254	Кусок ритуальной ткани	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1255	Сломанная статуэтка святого	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1256	Пустая чаша без установленной стоимости	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1257	Кусок старой фрески	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1258	Паломнический жетон без установленной стоимости	NULL	28К 29К 30К 39К 40К	flavor	flavor_religious	1	Оригинал	—						
L1259	Судовой журнал	25	46К 47К 48К 49К	priced	variant	1	PHB 2024	Замена «Книга»						
L1260	Книга учёта торговца	25	7К 15К 16К 46К	priced	variant	1	PHB 2024	Замена «Книга»						
L1261	Дворцовая родословная книга	25	4К 26К 31К	priced	variant	1	PHB 2024	Замена «Книга»						
L1262	Храмовая книга записей	25	28К 29К 30К 31К	priced	variant	1	PHB 2024	Замена «Книга»						
L1263	Алхимический трактат	25	8К 13К 14К 31К 32К 33К	priced	variant	1	PHB 2024	Замена «Книга»						
L1264	Магический учебник без заклинаний	25	8К 14К 31К 32К 33К	priced	variant	1	PHB 2024	Замена «Книга»						
L1265	Военный устав	25	21К 22К 23К 25К 31К	priced	variant	1	PHB 2024	Замена «Книга»						
L1266	Старинная хроника	25	4К 26К 31К 35К 36К 39К 40К 41К	priced	variant	1	PHB 2024	Замена «Книга»						
L1267	Карта города	1	2К 3К 4К 7К 9К 25К 26К 31К	priced	variant	1	PHB 2024	Замена «Карта»						
L1268	Карта подземелья	1	8К 31К 32К 34К 35К 36К 41К 42К	priced	variant	1	PHB 2024	Замена «Карта»						
L1269	Морская карта	1	7К 16К 31К 46К 47К 48К 49К	priced	variant	1	PHB 2024	Замена «Карта»						
L1270	Военная карта	1	21К 22К 23К 24К 25К 45К	priced	variant	1	PHB 2024	Замена «Карта»						
L1271	Карта торгового маршрута	1	7К 15К 16К 31К 44К 46К	priced	variant	1	PHB 2024	Замена «Карта»						
L1272	Флакон духов знатного дома	5	3К 4К 26К	priced	variant	1	PHB 2024	Замена «Духи»						
L1273	Флакон духов торговца	5	7К 9К 10К 46К	priced	variant	1	PHB 2024	Замена «Духи»						
L1274	Парадный дворянский наряд	15	3К 4К 25К 26К	priced	variant	1	PHB 2024	Замена «Богатая одежда»						
L1275	Богатое купеческое платье	15	3К 7К 9К 10К 16К 46К	priced	variant	1	PHB 2024	Замена «Богатая одежда»						
L1276	Церемониальные одежды	15	4К 26К 28К 29К 30К	priced	variant	1	PHB 2024	Замена «Богатая одежда»						
L1277	Походная одежда солдата	2	21К 22К 44К 45К	priced	variant	1	PHB 2024	Замена «Дорожная одежда»						
L1278	Одежда моряка	2	46К 47К 48К 49К	priced	variant	1	PHB 2024	Замена «Дорожная одежда»						
L1279	Одежда путешественника	2	9К 15К 16К 34К 37К 44К	priced	variant	1	PHB 2024	Замена «Дорожная одежда»						
L1280	Театральный костюм	5	9К 10К 26К	priced	variant	1	PHB 2024	Замена «Костюм»						
L1281	Маскировочный костюм	5	21К 27К 42К 44К 48К	priced	variant	1	PHB 2024	Замена «Костюм»						
L1282	Запечатанная стеклянная бутылка	2	3К 4К 7К 8К 13К 14К 33К 36К 46К	priced	variant	1	PHB 2024	Замена «Стеклянная бутылка»						
L1283	Пустая винная бутылка	2	3К 4К 7К 9К 10К 15К 46К 48К	priced	variant	1	PHB 2024	Замена «Стеклянная бутылка»						
L1284	Bag of Holding	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1285	Boots of Elvenkind	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1286	Broom of Flying	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1287	Cloak of Elvenkind	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1288	Cloak of Protection	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1289	Gauntlets of Ogre Power	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1290	Gloves of Missile Snaring	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1291	Goggles of Night	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1292	Headband of Intellect	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1293	Pearl of Power	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1294	Ring of Protection	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	Uncommon						
L1295	Ring of Water Walking	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	Uncommon						
L1296	Sending Stones	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1297	Slippers of Spider Climbing	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Uncommon						
L1298	Wand of Magic Detection	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	Uncommon						
L1299	Wand of Magic Missiles	400	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	Uncommon						
L1300	Adamantine Armor	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_armor	1	DMG 2024	Rare						
L1301	Amulet of Health	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Rare						
L1302	Belt of Dwarvenkind	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Rare						
L1303	Boots of Levitation	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Rare						
L1304	Bracers of Defense	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Rare						
L1305	Cloak of Displacement	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Rare						
L1306	Flame Tongue	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_weapon	1	DMG 2024	Rare						
L1307	Gem of Seeing	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Rare						
L1308	Ring of Free Action	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	Rare						
L1309	Ring of Spell Storing	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	Rare						
L1310	Staff of Charming	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	Rare						
L1311	Staff of Healing	4000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	Rare						
L1312	Armor of Invulnerability	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_armor	1	DMG 2024	Very Rare						
L1313	Cloak of Invisibility	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Very Rare						
L1314	Crystal Ball	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Very Rare						
L1315	Ring of Regeneration	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	Very Rare						
L1316	Robe of the Archmagi	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Very Rare						
L1317	Staff of Power	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	Very Rare						
L1318	Vorpal Sword	40000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_weapon	1	DMG 2024	Very Rare						
L1319	Apparatus of the Crab	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1320	Cloak of Invisibility	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1321	Cubic Gate	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1322	Deck of Many Things	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1323	Holy Avenger	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_weapon	1	DMG 2024	Legendary						
L1324	Luck Blade	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_weapon	1	DMG 2024	Legendary						
L1325	Ring of Invisibility	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_ring	1	DMG 2024	Legendary						
L1326	Robe of the Archmagi	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1327	Sphere of Annihilation	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1328	Staff of the Magi	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_staff	1	DMG 2024	Legendary						
L1329	Talisman of Pure Good	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1330	Talisman of the Sphere	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1331	Tome of Clear Thought	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1332	Tome of Leadership and Influence	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1333	Tome of Understanding	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						
L1334	Vorpal Sword	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_weapon	1	DMG 2024	Legendary						
L1335	Wand of Orcus	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	magic_wand	1	DMG 2024	Legendary						
L1336	Well of Many Worlds	200000	4К 8К 14К 25К 26К 28К 29К 30К 32К 33К 35К 36К 39К 40К 41К 43К	priced	wondrous	1	DMG 2024	Legendary						`;

export { VERSION, FLAG_SCOPE, FLAG_KEY, LAST_OPTIONS_KEY, SETTINGS, STRINGS, CONTEXTS_V6 as CONTEXTS, CONTEXT_GROUPS, CONTEXT_CATEGORY_PROFILES, RICHNESS_PROFILES, STACK_MULTIPLIERS, RARITY_ORDER, RARITY_RANK, RARITY_META, RARITY_BY_BONUS, BASE_CATEGORY_WEIGHT, PROFILE_WEIGHTS, MAGIC_CATEGORIES, ATTUNEMENT_DEFAULT_CATEGORIES, CONSUMABLE_CATEGORIES, ANIMAL_TRANSPORT_CATEGORIES, SINGLE_QTY_CATEGORIES, CATEGORY_LABELS, LOOT_TSV };
