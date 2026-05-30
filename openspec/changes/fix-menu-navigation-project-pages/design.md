## Context

Le composant `Nav.tsx` est un client component (`"use client"`) monté dans le layout global (`[locale]/layout.tsx`). Il utilise des ancres HTML simples (`href="#projets"`) qui ne fonctionnent que si la section cible existe sur la page courante. Sur les pages projet (`/[locale]/projects/[slug]`) et la page about (`/[locale]/about`), ces sections n'existent pas — les clics ne font rien.

## Goals / Non-Goals

**Goals:**
- Les liens Projets, À propos, Contact (desktop et mobile) redirigent vers la section correspondante de la page d'accueil depuis n'importe quelle page
- La locale courante est préservée dans l'URL cible
- Aucune régression sur le comportement home-page (scroll vers ancre sans rechargement)

**Non-Goals:**
- Modifier la structure des sections de la home ou leurs IDs
- Ajouter une animation de scroll cross-page
- Changer le comportement des liens CTA Playground (peut rester `#playground` ou recevoir le même traitement)

## Decisions

### Décision 1 : Détection de la page courante via `usePathname` (next-intl)

`usePathname` importé depuis `src/i18n/navigation.ts` retourne le pathname **sans préfixe locale** (ex: `/` sur la home, `/projects/laposte` sur une page projet). La comparaison `pathname === "/"` suffit à détecter la page d'accueil.

**Alternatives considérées :**
- `usePathname` natif Next.js — retourne le pathname avec préfixe locale (`/fr/`), ce qui complexifie la comparaison. La version next-intl est plus robuste.
- Prop `isHome` passée depuis le layout — crée un couplage inutile entre layout et Nav.

### Décision 2 : Construction du href via le composant `Link` de next-intl

Pour les pages non-home, le href devient `"/#projets"` (chemin absolu depuis la racine locale). Le composant `Link` de next-intl, déjà utilisé dans Nav.tsx, ajoute automatiquement le préfixe locale (`/fr/#projets`, `/en/#projets`).

**Alternatives considérées :**
- Construire manuellement `/${locale}/#projets` avec `useLocale()` — plus verbeux, redondant avec ce que `Link` fait déjà.
- `router.push("/#projets")` dans un `onClick` — moins déclaratif, plus difficile à maintenir.

### Décision 3 : Helper interne `sectionHref`

Un helper local `sectionHref(hash: string): string` calculé une fois en haut du composant évite la répétition `isHome ? hash : "/#" + hash` sur chaque lien (6 occurrences desktop + mobile).

## Risks / Trade-offs

- **Scroll cross-page** → Le navigateur ne scrolle pas automatiquement vers l'ancre après navigation Next.js dans tous les cas. Next.js gère nativement le scroll vers les ancres lors de la navigation — ce comportement est attendu et testé dans les scénarios.
- **Aucun risque de régression** → La modification est confinée à Nav.tsx, aucune API externe ou state partagé n'est touché.
