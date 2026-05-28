import { test, expect } from "@playwright/test";

// URL de base — la locale par défaut est "fr"
const HOME = "/fr";

// ── Helpers ────────────────────────────────────────────────────────────────

/** Intercepte /api/playground et renvoie une réponse streamée fictive. */
async function mockPlaygroundAPI(page: import("@playwright/test").Page) {
  await page.route("**/api/playground", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/plain; charset=utf-8",
      body: "Voici une approche de design concrète pour ce challenge IA.",
    });
  });
}

// ══════════════════════════════════════════════════════════════════════════
// 1. PLAYGROUND — sélectionner un chip → zone de réponse visible
// ══════════════════════════════════════════════════════════════════════════
test("Playground : chip sélectionné → zone réponse visible", async ({ page }) => {
  await mockPlaygroundAPI(page);
  await page.goto(HOME);

  // Attendre que les chips soient présents
  const chips = page.getByRole("button").filter({ hasText: /latence|hallucin|explicable/i });
  await expect(chips.first()).toBeVisible();

  // Cliquer sur le premier chip
  await chips.first().click();

  // La zone de réponse doit apparaître (div avec bg-canvas/70)
  const responseBox = page.locator(".bg-canvas\\/70, [class*='bg-canvas']").first();
  await expect(responseBox).toBeVisible({ timeout: 5_000 });
});

// ══════════════════════════════════════════════════════════════════════════
// 2. PLAYGROUND — curseur Température interactif
// ══════════════════════════════════════════════════════════════════════════
test("Playground : curseur Température est interactif", async ({ page }) => {
  await page.goto(HOME);

  const slider = page.locator('input[type="range"]');
  await expect(slider).toBeVisible();
  await expect(slider).not.toBeDisabled();

  // Récupérer la valeur initiale
  const valueBefore = await slider.inputValue();

  // Modifier la valeur via JavaScript
  await slider.evaluate((el: HTMLInputElement) => {
    el.value = "0.3";
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  });

  const valueAfter = await slider.inputValue();
  expect(valueAfter).not.toBe(valueBefore);
  expect(parseFloat(valueAfter)).toBeCloseTo(0.3, 1);
});

// ══════════════════════════════════════════════════════════════════════════
// 3. PROJETS — accordéon s'ouvre et se ferme
// ══════════════════════════════════════════════════════════════════════════
test("Projets : accordéon deep-dive s'ouvre et se ferme", async ({ page }) => {
  await page.goto(HOME);

  // Scroller jusqu'à la section projets
  await page.locator("#projets").scrollIntoViewIfNeeded();

  // Chercher le bouton "Analyse technique complète"
  const toggleBtn = page.getByRole("button", { name: /Analyse technique|technical analysis/i }).first();
  await expect(toggleBtn).toBeVisible();

  // Vérifier que le bouton a aria-expanded=false initialement
  await expect(toggleBtn).toHaveAttribute("aria-expanded", "false");

  // Ouvrir l'accordéon
  await toggleBtn.click();

  // aria-expanded passe à true
  await expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

  // Attendre que l'animation Framer Motion se termine (~300ms) et vérifier le contenu
  await page.waitForTimeout(400);
  const content = toggleBtn.locator("..").locator("~ *").last();
  // Vérifier via l'aria-expanded que l'état est correct
  await expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

  // Fermer l'accordéon
  await toggleBtn.click();
  await expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
});

// ══════════════════════════════════════════════════════════════════════════
// 4. RESPONSIVE — viewports 375px, 768px, 1280px
// ══════════════════════════════════════════════════════════════════════════
const viewports = [
  { name: "mobile 375px",  width: 375,  height: 812  },
  { name: "tablet 768px",  width: 768,  height: 1024 },
  { name: "desktop 1280px",width: 1280, height: 800  },
];

for (const vp of viewports) {
  test(`Responsive : page correcte sur ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(HOME);

    // La page charge sans erreur JS
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);

    // L'headline principal est visible
    const headline = page.getByRole("heading", { level: 1 });
    await expect(headline.first()).toBeVisible();

    // Pas d'overflow horizontal
    const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflowX).toBe(false);
  });
}

// ══════════════════════════════════════════════════════════════════════════
// 5. NAV — sticky au scroll
// ══════════════════════════════════════════════════════════════════════════
test("Nav : reste visible après scroll", async ({ page }) => {
  await page.goto(HOME);

  // Scroller vers le bas
  await page.evaluate(() => window.scrollBy(0, 600));
  await page.waitForTimeout(200);

  // Le <header> est l'élément sticky (pas le <nav> intérieur)
  const header = page.locator("header").first();
  await expect(header).toBeVisible();

  // Vérifier que le header a une position sticky
  const position = await header.evaluate((el) => window.getComputedStyle(el).position);
  expect(["sticky", "fixed"]).toContain(position);
});

// ══════════════════════════════════════════════════════════════════════════
// 6. CTA POST-INTERACTION — apparaît après une interaction Playground
// ══════════════════════════════════════════════════════════════════════════
test("Playground : CTA post-interaction visible après done", async ({ page }) => {
  await mockPlaygroundAPI(page);
  await page.goto(HOME);

  // Cliquer sur un chip
  const chips = page.getByRole("button").filter({ hasText: /latence|hallucin|explicable/i });
  await chips.first().click();

  // Attendre l'état "done" — le bouton reset devient visible
  const resetBtn = page.getByRole("button").filter({ hasText: /Essayer|Try another/i });
  await expect(resetBtn).toBeVisible({ timeout: 8_000 });

  // Le CTA post-interaction doit être présent
  const cta = page.getByRole("link").filter({ hasText: /similaire|similar|Discutons|talk/i });
  await expect(cta).toBeVisible();
});
