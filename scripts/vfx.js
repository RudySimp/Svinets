import { SVINETS_ASSETS } from "./assets.js";

function preferredVfx(result) {
  if (result?.lines?.some(line => line.rarity === "legendary")) return SVINETS_ASSETS.vfx.legendaryGlow;
  if (result?.lines?.some(line => line.magic)) return SVINETS_ASSETS.vfx.magicParticles;
  if ((result?.coinsCp ?? 0) > (result?.itemsCp ?? 0)) return SVINETS_ASSETS.vfx.coinBurst;
  if (result?.options?._profile?.richness === "treasure" || result?.options?._profile?.richness === "rich") return SVINETS_ASSETS.vfx.chestDust;
  return SVINETS_ASSETS.vfx.goldSparkles;
}

function playResultVfx(container, result) {
  if (!globalThis.HTMLElement || !(container instanceof HTMLElement)) return;
  if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
  container.querySelector(".svinets-vfx")?.remove();
  const overlay = document.createElement("img");
  overlay.className = "svinets-vfx";
  overlay.src = preferredVfx(result);
  overlay.alt = "";
  overlay.setAttribute("aria-hidden", "true");
  overlay.addEventListener("animationend", () => overlay.remove(), { once: true });
  container.append(overlay);
}

export { preferredVfx, playResultVfx };
