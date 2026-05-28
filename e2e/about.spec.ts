import { test, expect } from "@playwright/test";

// ══════════════════════════════════════════════════════════════════════════
// 8.1 — Page /fr/about retourne 200 + h1 visible
// ══════════════════════════════════════════════════════════════════════════
test("About FR : 200 + h1 visible", async ({ page }) => {
  const response = await page.goto("/fr/about");
  expect(response?.status()).toBe(200);

  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toBeVisible();
  // Le contenu doit être en français
  const text = await h1.textContent();
  expect(text).toBeTruthy();
});

// ══════════════════════════════════════════════════════════════════════════
// 8.2 — Page /en/about retourne 200 + h1 en anglais
// ══════════════════════════════════════════════════════════════════════════
test("About EN : 200 + h1 en anglais", async ({ page }) => {
  const response = await page.goto("/en/about");
  expect(response?.status()).toBe(200);

  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toBeVisible();
  // Le contenu doit être en anglais (pas de caractères typiquement français)
  const text = await h1.textContent();
  expect(text).toBeTruthy();
  // La clé en.json est "19 years of design. A pivot in 2024."
  expect(text).toMatch(/years|design/i);
});

// ══════════════════════════════════════════════════════════════════════════
// 8.3 — Timeline affiche au moins 3 entrées
// ══════════════════════════════════════════════════════════════════════════
test("About : timeline ≥ 3 entrées visibles", async ({ page }) => {
  await page.goto("/fr/about");
  await page.waitForLoadState("networkidle");

  // Les items de timeline sont des <li> dans la section timeline
  const timelineItems = page.locator("ol li");
  const count = await timelineItems.count();
  expect(count).toBeGreaterThanOrEqual(3);

  // La première entrée (la plus récente) doit contenir une année
  const firstItem = timelineItems.first();
  await expect(firstItem).toBeVisible();
  const text = await firstItem.textContent();
  expect(text).toMatch(/202[0-9]/);
});

// ══════════════════════════════════════════════════════════════════════════
// 8.4 — CTA contact visible
// ══════════════════════════════════════════════════════════════════════════
test("About : CTA contact visible", async ({ page }) => {
  await page.goto("/fr/about");

  // Le ContactCTA en bas de page
  const contactSection = page.locator("#contact");
  await contactSection.scrollIntoViewIfNeeded();
  await expect(contactSection).toBeVisible();

  // Le lien email ou le bouton "Envoyer un message"
  const cta = page.getByRole("link").filter({ hasText: /message|contacter|contact/i }).first();
  await expect(cta).toBeVisible();
});

// ══════════════════════════════════════════════════════════════════════════
// 8.5 — Responsive : 375px / 768px / 1280px sans overflow horizontal
// ══════════════════════════════════════════════════════════════════════════
const viewports = [
  { name: "mobile 375px",   width: 375,  height: 812  },
  { name: "tablet 768px",   width: 768,  height: 1024 },
  { name: "desktop 1280px", width: 1280, height: 800  },
];

for (const vp of viewports) {
  test(`About responsive — ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/fr/about");

    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.waitForLoadState("networkidle");

    expect(errors).toHaveLength(0);

    // h1 visible
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();

    // Pas d'overflow horizontal
    const overflowX = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(overflowX).toBe(false);
  });
}
