import { LAST_OPTIONS_KEY } from "./data.js";

const MODULE_ID = "svinets";

const DEFAULT_OPTIONS = Object.freeze({
  contextId: "50K",
  budgetGp: 500,
  magicMode: "automatic",
  coinPreference: "automatic",
  levelBand: "ignore",
  includeFlavor: true,
  useAttunement: true,
  useWeightLimit: false,
  maxWeight: 300,
  autoExport: false,
  exportTarget: "chat",
  seed: null
});

function settingKey(key) {
  return `${MODULE_ID}.${key}`;
}

function ensureSettingsRegistered() {
  const settings = game.settings;
  if (!settings.settings.has(settingKey(LAST_OPTIONS_KEY))) {
    settings.register(MODULE_ID, LAST_OPTIONS_KEY, {
      name: "Svinets: последние настройки",
      hint: "Последние параметры генератора лута.",
      scope: "client",
      config: false,
      type: Object,
      default: {}
    });
  }
}

function getLastOptions() {
  try {
    return game.settings.get(MODULE_ID, LAST_OPTIONS_KEY) ?? {};
  } catch {
    return {};
  }
}

async function saveLastOptions(options) {
  try {
    await game.settings.set(MODULE_ID, LAST_OPTIONS_KEY, options);
  } catch (error) {
    console.warn(`Svinets | Не удалось сохранить настройки: ${error.message}`);
  }
}

export {
  MODULE_ID,
  DEFAULT_OPTIONS,
  ensureSettingsRegistered,
  getLastOptions,
  saveLastOptions
};
