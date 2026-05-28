## Why

La section `AboutTeaser` de la homepage pointe vers `/about` depuis la tâche 7, mais la page est inexistante (404). Sans cette page, le persona B (Thomas, Head of Design) qui veut approfondir le parcours de Julie n'a nulle part où aller — et le CTA crédibilise le site sans tenir sa promesse.

## What Changes

- Création de la route `/about` (et `/en/about`) dans l'app Next.js avec next-intl
- Nouvelle page `src/app/[locale]/about/page.tsx` avec son layout propre
- Nouveaux composants de section dédiés à la page About
- Nouvelles clés i18n dans `fr.json` et `en.json` (namespace `aboutPage`)
- La page respecte le design system existant (tokens DESIGN.md, thème clair uniquement)

## Capabilities

### New Capabilities

- `about-page` : Page dédiée `/about` présentant le parcours de Julie en "double vitesse" — hero synthétique pour Sarah (profil pressé, 30s) et sections détaillées pour Thomas (profil pointu), avec timeline d'expérience, grille de compétences/certifications et CTA contact

### Modified Capabilities

_(aucune)_

## Impact

- **Nouveaux fichiers :** `src/app/[locale]/about/page.tsx`, composants sections About
- **Fichiers modifiés :** `messages/fr.json`, `messages/en.json` (ajout namespace `aboutPage`)
- **Dépendances :** aucune nouvelle lib — composants existants réutilisés (Nav, Footer, ContactCTA)
- **Routing :** next-intl gère automatiquement `/fr/about` et `/en/about` via le layout existant
