import { LOOT_TSV } from "./data.js";
import { parseLootTable, validateData, generateLoot } from "./generator.js";
import { ensureSettingsRegistered, saveLastOptions, MODULE_ID } from "./settings.js";
import { openGenerator } from "./app.js";
import { postLoot, exportToWorld } from "./export.js";
import { runSmokeTests } from "./tests.js";
import { localize } from "./utils.js";

const state = {
  entries: null,
  report: null,
  initialized: false
};

function notifyError(message) {
  if (globalThis.ui?.notifications?.error) ui.notifications.error(message);
  console.error(`Svinets | ${message}`);
}

async function open() {
  if (!game.user?.isGM) {
    ui.notifications.warn("Генератор лута доступен только Мастеру.");
    return null;
  }
  if (!state.entries) {
    ui.notifications.error("Svinets | Таблица лута ещё не инициализирована.");
    return null;
  }
  try {
    const options = await openGenerator();
    if (!options) return null;
    await saveLastOptions(options);
    const result = generateLoot(state.entries, options);
    await postLoot(result);
    if (options.autoExport && options.exportTarget === "world") await exportToWorld(result);
    return result;
  } catch (error) {
    notifyError(`Не удалось сгенерировать лут: ${error.message}`);
    return null;
  }
}

function generate(options) {
  if (!game.user?.isGM) throw new Error("Svinets | Генератор лута доступен только Мастеру.");
  if (!state.entries) throw new Error("Svinets | Таблица лута ещё не инициализирована.");
  return generateLoot(state.entries, options);
}

function installApi() {
  const module = game.modules.get(MODULE_ID);
  if (module) {
    module.api = {
      open,
      generate,
      get entries() { return state.entries; },
      get report() { return state.report; }
    };
  }
}

Hooks.once("init", () => {
  ensureSettingsRegistered();
  installApi();
});

Hooks.once("ready", () => {
  try {
    state.entries = parseLootTable(LOOT_TSV);
    state.report = validateData(state.entries);
    console.info(`Svinets | Исходных строк: ${state.report.rawRows}; активных позиций: ${state.report.activeEntries}; объединено повторов: ${state.report.merged}.`);
    if (globalThis.SVINETS_RUN_TESTS === true) runSmokeTests(state.entries);
    state.initialized = true;
    installApi();
    console.info("Svinets | Module loaded");
  } catch (error) {
    notifyError(`Модуль не инициализирован: ${error.message}`);
  }
});

Hooks.on("getSceneControlButtons", controls => {
  if (!game.user?.isGM || !controls.tokens?.tools) return;
  controls.tokens.tools.svinetsLoot = {
    name: "svinetsLoot",
    title: localize("SVINETS.SceneControl", "Svinets | Генератор лута"),
    icon: "fa-solid fa-sack-dollar",
    order: Object.keys(controls.tokens.tools).length,
    button: true,
    visible: true,
    onChange: () => void open()
  };
});

export { open, generate, state };
