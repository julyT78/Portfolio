## Context

La homepage est complète (tâches 1–9). Le CTA `AboutTeaser` pointe vers `/about` (404 actuellement). L'app utilise Next.js 16 avec next-intl v4, un layout racine `src/app/[locale]/layout.tsx` qui inclut déjà `Nav` et `Footer`. Les tokens visuels sont dans `DESIGN.md` (thème clair exclusivement). Le design system utilise les classes Tailwind custom : `font-display-lg`, `font-eyebrow`, `bg-canvas`, `text-ink`, `border-hairline`, etc.

## Goals / Non-Goals

**Goals:**
- Créer la route `/fr/about` (et `/en/about`) sans nouvelle dépendance
- Page "double vitesse" : hero synthétique (Sarah, 30s) + sections détaillées (Thomas, profil pointu)
- Réutiliser le layout et les composants existants (Nav, Footer, ContactCTA)
- Couverture i18n complète fr + en dès le premier commit
- Tests Playwright couvrant la page

**Non-Goals:**
- Pas de page `/about` dynamique (CMS, données en base) — contenu statique pour le MVP
- Pas de mode sombre
- Pas de nouvelle bibliothèque UI

## Decisions

### D1 — Route statique dans `[locale]`
La page s'insère dans `src/app/[locale]/about/page.tsx`. Le layout `[locale]/layout.tsx` existant fournit Nav + Footer gratuitement. Pas besoin d'un layout dédié.

**Alternatif écarté :** Layout séparé `about/layout.tsx` — surcharge inutile, le layout racine suffit.

### D2 — Découpage en 5 sections
La page suit l'architecture "double vitesse" du PRODUCT.md :
1. **AboutHero** — Titre fort + sous-titre + pills CTA (scan 30s, Persona A)
2. **AboutPivot** — Bloc narratif sur le pivot Product Design → AI Design 2024, avec visuel/quote (Persona B)
3. **AboutTimeline** — Expériences clés en timeline chronologique inverse (Persona B)
4. **AboutSkills** — Grille compétences + certifications (réplique enrichie du `AboutTeaser`)
5. **ContactCTA** — Réutilisation du composant existant (zéro code nouveau)

### D3 — Composants colocalisés dans `sections/about/`
Les 4 nouveaux composants (AboutHero, AboutPivot, AboutTimeline, AboutSkills) sont créés dans `src/components/sections/about/`. Ils restent "use client" uniquement si de l'interactivité est nécessaire (sinon Server Components).

**Alternatif écarté :** Tout dans un seul fichier `page.tsx` — lisibilité et maintenabilité moindres.

### D4 — i18n via namespace `aboutPage`
Nouveau namespace `aboutPage` dans `fr.json`/`en.json`. Évite la collision avec le namespace `about` existant (utilisé par `AboutTeaser`).

## Risks / Trade-offs

- **Contenu statique** → Si Julie veut mettre à jour sa bio sans PR, il faudra un CMS plus tard. Acceptable MVP.
- **Timeline codée en dur** → Facilite l'itération rapide maintenant ; migration facile vers des données JSON externes si besoin.
- **Réutilisation ContactCTA** → Dépend de la clé i18n `contact.*` ; aucun risque de régression.

## Open Questions

_(aucune — le périmètre est clair)_
