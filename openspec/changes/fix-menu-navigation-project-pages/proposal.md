## Why

Les liens de navigation (Projets, À propos, Contact) utilisent des ancres simples (`#projets`, `#about`, `#contact`) qui ne fonctionnent que sur la page d'accueil. Depuis une page projet (`/[locale]/projects/[slug]`), ces ancres ne trouvent pas les sections et le menu est inopérant.

## What Changes

- Le composant `Nav.tsx` détecte la page courante via `usePathname` (next-intl)
- Sur la page d'accueil (`pathname === "/"`), les liens restent des ancres simples (`#projets`, etc.)
- Sur toute autre page, les liens deviennent des chemins absolus vers la home avec ancre (`/#projets`, etc.) — le composant `Link` de next-intl gère automatiquement le préfixe locale
- Même correction appliquée aux liens du menu mobile (hamburger)
- Les liens CTA (`#playground`, `#contact`) reçoivent le même traitement

## Capabilities

### New Capabilities
- `nav-cross-page-anchors` : Navigation du header qui redirige correctement vers les sections de la page d'accueil quelle que soit la page courante

### Modified Capabilities

## Impact

- `src/components/layout/Nav.tsx` — seul fichier modifié
- Aucune dépendance nouvelle, `usePathname` est déjà disponible via `src/i18n/navigation.ts`
