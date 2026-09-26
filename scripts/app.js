import {
  CONTEXTS,
  LOOT_TYPE_PROFILES,
  PARTY_LEVEL_PROFILES,
  STRINGS
} from "./data.js";
import { escapeHTML, localize } from "./utils.js";
import { sanitizeOptions } from "./generator.js";
import {
  DEFAULT_OPTIONS,
  getLastOptions,
  saveLastOptions
} from "./settings.js";
function getLocalizedStrings() {
  return {
    title: localize("SVINETS.Title", STRINGS.title),
    generate: localize("SVINETS.Generate", STRINGS.generate),
    saveSettings: localize("SVINETS.SaveSettings", STRINGS.saveSettings),
    cancel: localize("SVINETS.Cancel", STRINGS.cancel),
    placeSection: localize("SVINETS.PlaceSection", STRINGS.placeSection),
    typeSection: localize("SVINETS.TypeSection", STRINGS.typeSection),
    budgetSection: localize("SVINETS.BudgetSection", STRINGS.budgetSection),
    partySection: localize("SVINETS.PartySection", STRINGS.partySection),
    magicSection: localize("SVINETS.MagicSection", STRINGS.magicSection),
    compositionSection: localize("SVINETS.CompositionSection", STRINGS.compositionSection),
    limitsSection: localize("SVINETS.LimitsSection", STRINGS.limitsSection),
    extraSection: localize("SVINETS.ExtraSection", STRINGS.extraSection)
  };
}

function selected(value, expected) { return value === expected ? ' selected' : ''; }
function checked(value) { return value ? ' checked' : ''; }

  function buildDialogContent(d) {
    const strings = getLocalizedStrings();
    const contexts = Object.entries(CONTEXTS).map(([id,c]) => `<option value="${id}"${selected(d.contextId,id)}>${id} — ${escapeHTML(c.name)}</option>`).join('');
    const lootTypes = [
      ['individual','Индивидуальная находка — один труп, карман, сумка'],['chest','Сундук или тайник — небольшой клад'],['hoard','Крупный клад — сокровищница, драконья пещера'],
      ['merchant','Товарный запас — склад, магазин, обоз'],['trophy','Трофей с босса — награда за победу'],['trade','Торговая сделка — оплата, выкуп']
    ].map(([v,l])=>`<option value="${v}"${selected(d.lootType,v)}>${l}</option>`).join('');
    const levelOptions = [['1-4','1–4'],['5-10','5–10'],['11-16','11–16'],['17-20','17–20'],['any','Любой']].map(([v,l])=>`<option value="${v}"${selected(d.partyLevel,v)}>${l}</option>`).join('');
    const rarityOptions = [['common','Обычные'],['uncommon','Необычные'],['rare','Редкие'],['veryRare','Очень редкие'],['legendary','Легендарные'],['any','На усмотрение уровня партии']].map(([v,l])=>`<option value="${v}"${selected(d.maxRarity,v)}>${l}</option>`).join('');
    const prefOptions = [['balanced','Сбалансированно'],['combat','Боевое снаряжение'],['utility','Полезные предметы'],['magical','Магические предметы'],['consumables','Расходники'],['valuables','Ценности и камни']].map(([v,l])=>`<option value="${v}"${selected(d.preference,v)}>${l}</option>`).join('');

    const sectionStyle='margin:0 0 14px;padding:0 0 10px;border-bottom:1px solid var(--color-border-light-primary);';
    const hintStyle='margin:3px 0 6px;color:#777;font-size:0.88em;line-height:1.25;';
    return `<div id="svinets-generator-form" class="svinets-generator">
      <section class="svinets-section" style="${sectionStyle}"><h3>${strings.placeSection}</h3><div class="form-group"><label>Место</label><select name="contextId">${contexts}</select></div></section>
      <section class="svinets-section" style="${sectionStyle}"><h3>${strings.typeSection}</h3><div class="form-group"><label>Тип лута</label><select name="lootType">${lootTypes}</select></div><p class="svinets-hint" style="${hintStyle}">Влияет на количество предметов и долю монет.</p></section>
      <section class="svinets-section" style="${sectionStyle}"><h3>${strings.budgetSection}</h3><div class="form-group"><label>Общая стоимость, зм</label><input name="budgetGp" type="number" min="0.01" max="1000000000" step="0.01" value="${escapeHTML(d.budgetGp)}"></div><p class="svinets-hint" style="${hintStyle}">Итоговая сумма: стоимость предметов + монеты. Монеты автоматически досчитываются до этой суммы.</p></section>
      <section class="svinets-section" style="${sectionStyle}"><h3>${strings.partySection}</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div class="form-group"><label>Уровень партии</label><select name="partyLevel">${levelOptions}</select></div><div class="form-group"><label>Размер партии</label><input name="partySize" type="number" min="1" max="10" step="1" value="${escapeHTML(d.partySize)}"></div></div><p class="svinets-hint" style="${hintStyle}">Уровень влияет на максимальную редкость магических предметов. Размер партии влияет на количество расходников и слотов настройки.</p></section>
      <section class="svinets-section" style="${sectionStyle}"><h3>${strings.magicSection}</h3><div class="form-group"><label><input name="magicAllowed" type="checkbox"${checked(d.magicAllowed)}> Разрешить магические предметы</label></div><div class="form-group"><label>Максимальная редкость</label><select name="maxRarity">${rarityOptions}</select></div><div class="form-group"><label><input name="allowLegendary" type="checkbox"${checked(d.allowLegendary)}> Разрешить легендарные предметы</label></div><div class="form-group"><label>Максимум магических предметов в луте</label><input name="maxMagicItems" type="number" min="0" max="5" step="1" value="${escapeHTML(d.maxMagicItems)}"></div><p class="svinets-hint" style="${hintStyle}">Если магия отключена — генерируются только обычные предметы и монеты.</p></section>
      <section class="svinets-section" style="${sectionStyle}"><h3>${strings.compositionSection}</h3><div class="form-group"><label>Что важнее</label><select name="preference">${prefOptions}</select></div><div class="form-group"><label>Доля расходников</label><input id="svinets-consumables" name="consumablesSlider" type="range" min="0" max="100" step="1" value="${escapeHTML(d.consumablesSlider)}"><span id="svinets-consumables-value" style="margin-left:8px;">${escapeHTML(d.consumablesSlider)} из 100</span></div><p class="svinets-hint" style="${hintStyle}">0 — постоянные предметы, 100 — расходники.</p><div class="form-group"><label><input name="includeFlavor" type="checkbox"${checked(d.includeFlavor)}> Добавлять атмосферные предметы без цены</label></div><div class="form-group"><label><input name="includeAnimals" type="checkbox"${checked(d.includeAnimals)}> Включать животных и транспорт</label></div><div class="form-group"><label><input name="includeBarding" type="checkbox"${checked(d.includeBarding)}> Включать бардинг</label></div></section>
      <section class="svinets-section" style="${sectionStyle}"><h3>${strings.limitsSection}</h3><div class="form-group"><label><input name="useAttunement" type="checkbox"${checked(d.useAttunement)}> Учитывать настройку магических предметов (attunement)</label></div><p class="svinets-hint" style="${hintStyle}">Сумма слотов настройки — размер партии × 3.</p><div class="form-group"><label><input id="svinets-use-weight" name="useWeightLimit" type="checkbox"${checked(d.useWeightLimit)}> Ограничить общий вес</label></div><div id="svinets-weight-row" class="form-group" style="${d.useWeightLimit?'':'display:none;'}"><label>Максимум, фунты</label><input name="maxWeight" type="number" min="1" step="1" value="${escapeHTML(d.maxWeight)}"></div><p class="svinets-hint" style="${hintStyle}">Вес отслеживается для оружия, брони, снаряжения, инструментов, инструментов музыканта, боеприпасов и контейнеров. Официально невесомые позиции считаются как 0.</p><div class="form-group"><label><input name="noDuplicates" type="checkbox"${checked(d.noDuplicates)}> Не повторять названия предметов</label></div><div class="form-group"><label><input name="noFamilies" type="checkbox"${checked(d.noFamilies)}> Не выдавать две вещи из одной семьи</label></div><div class="form-group"><label>Максимум строк в списке</label><input name="maxLines" type="number" min="0" max="24" step="1" value="${escapeHTML(d.maxLines)}"></div><p class="svinets-hint" style="${hintStyle}">0 — автоматически по бюджету и типу лута.</p></section>
      <section class="svinets-section" style="margin:0;"><h3>${strings.extraSection}</h3><div class="form-group"><label><input id="svinets-auto-export" name="autoExport" type="checkbox"${checked(d.autoExport)}> Экспортировать предметы после генерации</label></div><div id="svinets-export-row" class="form-group" style="${d.autoExport?'':'display:none;'}"><label>Куда экспортировать</label><select name="exportTarget"><option value="chat"${selected(d.exportTarget,'chat')}>Только в чат</option><option value="world"${selected(d.exportTarget,'world')}>В предметы мира</option></select></div><div class="form-group"><label>Seed для повторяемости</label><input name="seed" type="number" step="1" value="${Number.isFinite(d.seed)?escapeHTML(d.seed):''}"></div><p class="svinets-hint" style="${hintStyle}">Если указать seed — результат можно воспроизвести. Оставьте пустым для случайности.</p><button id="svinets-save-settings" type="button"><i class="fa-solid fa-floppy-disk"></i> ${strings.saveSettings}</button></section>
    </div>`;
  }

  function readDialogForm(form) {
    return {
      contextId:form.elements.contextId.value, lootType:form.elements.lootType.value, budgetGp:form.elements.budgetGp.valueAsNumber,
      partyLevel:form.elements.partyLevel.value, partySize:form.elements.partySize.valueAsNumber,
      magicAllowed:form.elements.magicAllowed.checked, maxRarity:form.elements.maxRarity.value, allowLegendary:form.elements.allowLegendary.checked, maxMagicItems:form.elements.maxMagicItems.valueAsNumber,
      preference:form.elements.preference.value, consumablesSlider:form.elements.consumablesSlider.valueAsNumber,
      includeFlavor:form.elements.includeFlavor.checked, includeAnimals:form.elements.includeAnimals.checked, includeBarding:form.elements.includeBarding.checked,
      useAttunement:form.elements.useAttunement.checked, useWeightLimit:form.elements.useWeightLimit.checked, maxWeight:form.elements.maxWeight.valueAsNumber,
      noDuplicates:form.elements.noDuplicates.checked, noFamilies:form.elements.noFamilies.checked, maxLines:form.elements.maxLines.valueAsNumber,
      autoExport:form.elements.autoExport.checked, exportTarget:form.elements.exportTarget.value, seed:form.elements.seed.value
    };
  }

  function bindDialogControls(attempt = 0) {
    const root = document.getElementById('svinets-generator-form');
    if (!root) {
      if (attempt < 30) requestAnimationFrame(() => bindDialogControls(attempt + 1));
      return;
    }
    const slider=root.querySelector('#svinets-consumables');
    const sliderValue=root.querySelector('#svinets-consumables-value');
    slider?.addEventListener('input',()=>{ if (sliderValue) sliderValue.textContent=`${slider.value} из 100`; });
    const weightToggle=root.querySelector('#svinets-use-weight');
    const weightRow=root.querySelector('#svinets-weight-row');
    weightToggle?.addEventListener('change',()=>{ if(weightRow) weightRow.style.display=weightToggle.checked?'':'none'; });
    const exportToggle=root.querySelector('#svinets-auto-export');
    const exportRow=root.querySelector('#svinets-export-row');
    exportToggle?.addEventListener('change',()=>{ if(exportRow) exportRow.style.display=exportToggle.checked?'':'none'; });
    root.querySelector('#svinets-save-settings')?.addEventListener('click',async()=>{
      try {
        const form=root.closest('form');
        if (!form) throw new Error('Форма не найдена.');
        const clean=sanitizeOptions(readDialogForm(form));
        await saveLastOptions(clean);
        ui.notifications.info('Настройки сохранены.');
      } catch(error) { ui.notifications.error(`Настройки не сохранены: ${error.message}`); }
    });
  }

  async function askOptions() {
    const defaults={...DEFAULT_OPTIONS,...getLastOptions()};
    const strings = getLocalizedStrings();
    const DialogV2 = foundry?.applications?.api?.DialogV2;
    if (!DialogV2?.prompt) throw new Error('Для генератора требуется foundry.applications.api.DialogV2 из Foundry v14.');
    const promise=DialogV2.prompt({
      window:{title:strings.title}, content:buildDialogContent(defaults), modal:true, rejectClose:false,
      ok:{ label:strings.generate, icon:'fa-solid fa-dice', callback:(event,button)=>sanitizeOptions(readDialogForm(button.form),{notify:true}) },
      buttons:[{ action:'cancel', label:strings.cancel, callback:()=>null }]
    });
    requestAnimationFrame(()=>bindDialogControls());
    return await promise;
  }
async function openGenerator() {
  if (!game.user?.isGM) {
    ui.notifications.warn("Генератор лута доступен только Мастеру.");
    return null;
  }
  return askOptions();
}

export {
  buildDialogContent,
  readDialogForm,
  bindDialogControls,
  askOptions,
  openGenerator
};
