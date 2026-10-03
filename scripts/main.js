import { LOOT_TSV } from "./data.js";
import { parseLootTable, validateData, generateLoot } from "./generator.js";
import { ensureSettingsRegistered, saveLastOptions, MODULE_ID } from "./settings.js";
import { openGenerator, showPreview } from "./app.js";
import { postLoot, exportToWorld, bindChatCard } from "./export.js";
import { runSmokeTests } from "./tests.js";
import { localize } from "./utils.js";
import { playResultVfx } from "./vfx.js";

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
    const options = await openGenerator(state.entries);
    if (!options) return null;
    await saveLastOptions(options);
    const generated = generateLoot(state.entries, options);
    const result = await showPreview(generated, state.entries, candidateOptions => generateLoot(state.entries, candidateOptions));
    if (!result) return null;
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

function generateMany(options, count = 3) {
  if (!game.user?.isGM) throw new Error("Svinets | Генератор лута доступен только Мастеру.");
  if (!state.entries) throw new Error("Svinets | Таблица лута ещё не инициализирована.");
  const baseSeed = Number(options?.seed);
  return Array.from({ length: Math.max(1, Math.min(3, count)) }, (_unused, index) => generateLoot(state.entries, {
    ...options,
    seed: Number.isFinite(baseSeed) ? baseSeed + index : null
  }));
}

function installApi() {
  const module = game.modules.get(MODULE_ID);
  if (module) {
    module.api = {
      open,
      generate,
      generateMany,
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
    console.info(`Svinets | Generator v6 loaded: ${state.report.rawRows} raw rows; ${state.report.activeEntries} active entries.`);
    if (globalThis.SVINETS_RUN_TESTS === true) runSmokeTests(state.entries);
    state.initialized = true;
    installApi();
    console.info("Svinets | Module loaded");
  } catch (error) {
    notifyError(`Модуль не инициализирован: ${error.message}`);
  }
});

Hooks.on("getSceneControlButtons", controls => {
  if (!game.user?.isGM || !Array.isArray(controls)) return;
  const tokenControl = controls.find(control => control.name === "token");
  if (!tokenControl?.tools) return;
  tokenControl.tools.push({
    name: "svinetsLoot",
    title: localize("SVINETS.SceneControl", "Svinets | Генератор лута"),
    icon: "fa-solid fa-sack-dollar",
    button: true,
    visible: true,
    onChange: () => void open()
  });
});

Hooks.on("renderChatMessage", (message, html) => bindChatCard(html));

export { open, generate, generateMany, state };
