import { askOptions, showPreview } from "./app.js";
import { exportToWorld, postLoot } from "./export.js";
import { ensureSettingsRegistered, getLastOptions, saveLastOptions } from "./settings.js";

function createV12Mock() {
  const calls = { dialogs: [], items: [], messages: [], settings: [] };
  class ApplicationV2 {}
  class DialogV2 extends ApplicationV2 {
    static async prompt(options) {
      calls.dialogs.push(options);
      return options.content.includes("data-preview-root") ? options.ok.callback() : null;
    }
  }
  const stored = new Map();
  const settings = {
    settings: new Map(),
    register(namespace, key, data) { this.settings.set(`${namespace}.${key}`, data); calls.settings.push(["register", namespace, key]); },
    get(namespace, key) { return stored.get(`${namespace}.${key}`); },
    async set(namespace, key, value) { stored.set(`${namespace}.${key}`, value); calls.settings.push(["set", namespace, key]); return value; }
  };
  return {
    calls,
    globals: {
      foundry: { applications: { api: { ApplicationV2, DialogV2 } } },
      game: { user: { id: "v12-gm", isGM: true }, settings, i18n: { localize: key => key }, system: { id: "dnd5e" } },
      ui: { notifications: { info() {}, warn() {}, error() {} } },
      Item: { async createDocuments(data) { calls.items.push(data); return data; } },
      ChatMessage: { getSpeaker: data => data, async create(data) { calls.messages.push(data); return data; } }
    }
  };
}

async function runFoundryV12Tests(sampleResult) {
  const prior = Object.fromEntries(["foundry", "game", "ui", "Item", "ChatMessage"].map(key => [key, globalThis[key]]));
  const { calls, globals } = createV12Mock();
  Object.assign(globalThis, globals);
  const tests = [];
  const check = async (name, fn) => { try { tests.push({ test: name, ok: Boolean(await fn()), error: "" }); } catch (error) { tests.push({ test: name, ok: false, error: error.message }); } };
  try {
    await check("Foundry v12 exposes ApplicationV2", () => typeof foundry.applications.api.ApplicationV2 === "function");
    await check("Foundry v12 exposes DialogV2.prompt", () => typeof foundry.applications.api.DialogV2.prompt === "function");
    await check("DialogV2 preview path returns result", async () => await showPreview(sampleResult, []) === sampleResult && calls.dialogs.length === 1);
    await check("Generator uses DialogV2 path", async () => { await askOptions([]); return calls.dialogs.length === 2; });
    await check("Item.createDocuments public path", async () => { const created = await exportToWorld(sampleResult); return created.length === sampleResult.lines.length && calls.items.length === 1; });
    await check("ChatMessage.create public path", async () => { await postLoot(sampleResult); return calls.messages.length === 1 && calls.messages[0].user === "v12-gm"; });
    await check("game.settings v12 registration and storage", async () => { ensureSettingsRegistered(); await saveLastOptions({ contextId: "12K" }); return getLastOptions().contextId === "12K" && calls.settings.some(call => call[0] === "register"); });
  } finally {
    for (const [key, value] of Object.entries(prior)) {
      if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
    }
  }
  return tests;
}

export { createV12Mock, runFoundryV12Tests };
