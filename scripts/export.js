import {
  FLAG_SCOPE,
  FLAG_KEY,
  VERSION,
  STRINGS,
  RARITY_META,
  RARITY_RANK,
  LOOT_TYPE_PROFILES
} from "./data.js";
import {
  escapeHTML,
  formatGp,
  formatCoins,
  formatNumber,
  cpToGp
} from "./utils.js";
  // -------------------- 12. ЭКСПОРТ В ПРЕДМЕТЫ МИРА --------------------

  function dnd5eItemType(line) {
    const category = line.category;
    if (['weapon','magic_weapon'].includes(category)) return 'weapon';
    if (['armor','magic_armor','barding','tack','focus','magic_ring','magic_rod','magic_staff','magic_wand','wondrous'].includes(category)) return 'equipment';
    if (['consumable','food','ammo','scroll','magic_potion','magic_ammo'].includes(category)) return 'consumable';
    if (['tool','instrument'].includes(category)) return 'tool';
    if (category === 'container') return 'container';
    return 'loot';
  }

  function renderItemDescription(line) {
    const parts = [`<p><strong>Источник генератора:</strong> ${escapeHTML(line.sourceId ?? '—')}</p>`, `<p><strong>Стоимость:</strong> ${escapeHTML(formatGp(line.unitCp))}</p>`];
    if (line.magic && line.rarity) parts.push(`<p><strong>Редкость:</strong> ${escapeHTML(RARITY_META[line.rarity]?.label ?? line.rarity)}</p>`);
    if (line.attunement) parts.push('<p><strong>Настройка:</strong> требуется</p>');
    if (line.formula) parts.push(`<p><strong>Формула:</strong> ${escapeHTML(formatGp(line.formula.baseCp))} + ${escapeHTML(formatGp(line.formula.bonusCp))} = ${escapeHTML(formatGp(line.formula.totalCp))}</p>`);
    return parts.join('');
  }

  function foundryItemData(line) {
    const isDnd5e = game.system.id === 'dnd5e';
    const data = {
      name: line.name,
      type: isDnd5e ? dnd5eItemType(line) : 'loot',
      flags: { [FLAG_SCOPE]: { generatedBy: 'svinets', sourceId: line.sourceId ?? null, rarity: line.rarity ?? null, attunement: Boolean(line.attunement), weight: Number(line.weight) || 0 } }
    };
    if (isDnd5e) {
      data.system = {
        quantity: Math.max(1, Number(line.qty) || 1),
        price: { value: cpToGp(line.unitCp), denomination: 'gp' },
        description: { value: renderItemDescription(line) }
      };
      if (Number(line.weight) > 0) data.system.weight = { value: Number(line.weight), units: 'lb' };
      if (line.rarity && RARITY_RANK[line.rarity] != null) data.system.rarity = line.rarity;
      if (line.attunement) data.system.attunement = 'required';
    }
    return data;
  }

  async function exportToWorld(result) {
    const itemData = result.lines.map(foundryItemData);
    if (!itemData.length) {
      ui.notifications.warn('В добыче нет ценовых предметов для экспорта.');
      return [];
    }
    try {
      const creator = typeof Item?.createDocuments === 'function'
        ? Item.createDocuments.bind(Item)
        : CONFIG?.Item?.documentClass?.createDocuments?.bind(CONFIG.Item.documentClass);
      if (!creator) throw new Error('Публичный API создания Item-документов недоступен.');
      const created = await creator(itemData);
      ui.notifications.info(`Создано предметов мира: ${created.length}.`);
      return created;
    } catch (error) {
      console.error('Svinets | Ошибка экспорта:', error);
      ui.notifications.error(`Экспорт не выполнен: ${error.message}`);
      return [];
    }
  }

  // -------------------- 13. ЧАТ --------------------

  const CHAT_GROUPS = Object.freeze([
    ['weapon','Оружие'], ['magic_weapon','Оружие'],
    ['armor','Доспехи'], ['magic_armor','Доспехи'], ['barding','Доспехи'],
    ['gear','Снаряжение'], ['container','Снаряжение'], ['tool','Снаряжение'], ['instrument','Снаряжение'], ['focus','Снаряжение'], ['variant','Снаряжение'], ['ammo','Снаряжение'], ['animal','Снаряжение'], ['vehicle','Снаряжение'], ['large_vehicle','Снаряжение'], ['tack','Снаряжение'], ['supply','Снаряжение'],
    ['consumable','Расходники'], ['food','Расходники'], ['scroll','Расходники'], ['magic_potion','Расходники'], ['magic_ammo','Расходники'],
    ['valuable','Ценности'], ['gemstone','Ценности'], ['art_object','Ценности'], ['trade_good','Ценности'],
    ['magic_ring','Магические предметы'], ['magic_rod','Магические предметы'], ['magic_staff','Магические предметы'], ['magic_wand','Магические предметы'], ['wondrous','Магические предметы']
  ]);
  const CHAT_GROUP_BY_CATEGORY = new Map(CHAT_GROUPS);
  const CHAT_GROUP_ORDER = ['Оружие','Доспехи','Снаряжение','Расходники','Ценности','Магические предметы','Прочее'];
  const RARITY_RU = Object.freeze({ common:'обычный', uncommon:'необычный', rare:'редкий', veryRare:'очень редкий', legendary:'легендарный' });

  function lineHtml(line, index, compact = false) {
    const qty = line.qty > 1 ? ` × ${line.qty}` : '';
    if (compact) return `<li>${index}. <strong>${escapeHTML(line.name)}</strong>${escapeHTML(qty)} — ${escapeHTML(formatGp(line.totalCp))}</li>`;
    const tags = [];
    if (line.rarity) tags.push(`[${RARITY_RU[line.rarity] ?? line.rarity}]`);
    if (line.attunement) tags.push('[настройка]');
    const tagText = tags.length ? ` <span style="color:#777;">${escapeHTML(tags.join(' '))}</span>` : '';
    const price = line.qty > 1
      ? `${escapeHTML(formatGp(line.unitCp))} за шт. = <strong>${escapeHTML(formatGp(line.totalCp))}</strong>`
      : `<strong>${escapeHTML(formatGp(line.totalCp))}</strong>`;
    const formula = line.formula
      ? `<div style="font-size:0.88em;color:#666;">Цена: ${escapeHTML(formatGp(line.formula.baseCp))} (база) + ${escapeHTML(formatGp(line.formula.bonusCp))} (магия)</div>`
      : '';
    return `<li style="margin-bottom:7px;">${index}. <strong>${escapeHTML(line.name)}</strong>${escapeHTML(qty)}${tagText}<br>${price}${formula}</li>`;
  }

  function renderLootChat(result) {
    const compact = result.lines.length > 20;
    const grouped = new Map(CHAT_GROUP_ORDER.map(g => [g, []]));
    for (const line of result.lines) {
      const group = CHAT_GROUP_BY_CATEGORY.get(line.category) ?? 'Прочее';
      grouped.get(group).push(line);
    }
    let counter = 1;
    const blocks = [];
    for (const group of CHAT_GROUP_ORDER) {
      const lines = grouped.get(group);
      if (!lines.length) continue;
      const rendered = lines.map(line => lineHtml(line, counter++, compact)).join('');
      blocks.push(`<div style="margin:10px 0;"><strong>${escapeHTML(group)}</strong><ol style="list-style:none;padding-left:10px;margin:5px 0;">${rendered}</ol></div>`);
    }
    if (result.flavor) blocks.push(`<div style="margin:10px 0;"><strong>Атмосферная находка</strong><div style="margin-left:10px;">${escapeHTML(result.flavor.name)} <span style="color:#777;">(без цены)</span></div></div>`);

    const attunement = result.options.useAttunement
      ? `<p><strong>Настройка:</strong> ${result.attunementCount} / ${result.attunementLimit} слотов партии</p>` : '';
    const weight = result.options.useWeightLimit
      ? `<p><strong>Общий отслеживаемый вес:</strong> ${escapeHTML(formatNumber(result.totalWeight))} фунтов${result.weightExceeded ? ' — <strong>лимит превышен</strong>' : ''}</p>` : '';

    return `<div class="svinets-card">
      <h2>${escapeHTML(STRINGS.loot)}</h2>
      <p><strong>Место:</strong> ${escapeHTML(result.contextId)} — ${escapeHTML(result.contextName)}</p>
      <p><strong>Тип:</strong> ${escapeHTML(LOOT_TYPE_PROFILES[result.options.lootType].label)}</p>
      <p><strong>Бюджет:</strong> ${escapeHTML(formatGp(result.budgetCp))}</p>
      <hr>
      ${blocks.join('') || '<p>Предметов нет.</p>'}
      <hr>
      ${result.coinsCp > 0 ? `<p><strong>Монеты:</strong> ${escapeHTML(formatCoins(result.coinsCp))}</p>` : ''}
      <p><strong>Предметы:</strong> ${escapeHTML(formatGp(result.itemsCp))}</p>
      <p><strong>Итого:</strong> ${escapeHTML(formatGp(result.budgetCp))}</p>
      ${attunement}${weight}
    </div>`;
  }

  async function postLoot(result) {
    if (result.itemsCp + result.coinsCp !== result.budgetCp) {
      console.error('Svinets | Нарушен бюджетный инвариант перед публикацией.', result);
      ui.notifications.error('Ошибка данных: нарушен бюджетный инвариант.');
      return null;
    }
    return ChatMessage.create({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ alias: 'GM' }),
      content: renderLootChat(result),
      flags: { [FLAG_SCOPE]: { [FLAG_KEY]: { version: VERSION, options: result.options } } }
    });
  }
export {
  dnd5eItemType,
  renderItemDescription,
  foundryItemData,
  exportToWorld,
  renderLootChat,
  postLoot
};
