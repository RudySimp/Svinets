const MODULE_ROOT = "modules/svinets";

const asset = path => `${MODULE_ROOT}/${path}`;

const SVINETS_ASSETS = Object.freeze({
  logo: asset("assets/branding/logo.png"),
  categories: Object.freeze({
    weapon: asset("assets/categories/weapon.png"),
    magic: asset("assets/categories/magic.png"),
    armor: asset("assets/categories/armor.png"),
    consumables: asset("assets/categories/consumables.png"),
    valuables: asset("assets/categories/valuables.png")
  }),
  actions: Object.freeze({
    random: asset("assets/actions/random.png"),
    empty: asset("assets/actions/empty.png")
  }),
  vfx: Object.freeze({
    coinBurst: asset("assets/vfx/coin-burst.png"),
    goldSparkles: asset("assets/vfx/gold-sparkles.png"),
    magicParticles: asset("assets/vfx/magic-particles.png"),
    legendaryGlow: asset("assets/vfx/legendary-glow.png"),
    chestDust: asset("assets/vfx/chest-dust.png")
  })
});

function categoryAsset(line) {
  if (line?.magic) return SVINETS_ASSETS.categories.magic;
  if (["weapon", "ammo"].includes(line?.category)) return SVINETS_ASSETS.categories.weapon;
  if (["armor", "barding"].includes(line?.category)) return SVINETS_ASSETS.categories.armor;
  if (["consumable", "food", "magic_potion", "magic_ammo", "scroll"].includes(line?.category)) {
    return SVINETS_ASSETS.categories.consumables;
  }
  return SVINETS_ASSETS.categories.valuables;
}

function bindAssetFallback(root = globalThis.document) {
  root?.querySelectorAll?.(`img[src^="${MODULE_ROOT}/"]`).forEach(image => {
    image.addEventListener("error", () => { image.hidden = true; }, { once: true });
  });
}

export { MODULE_ROOT, SVINETS_ASSETS, categoryAsset, bindAssetFallback };
