## Why

Le portfolio cible des clients et recruteurs francophones et anglophones. Sans basculement de langue intégré, les visiteurs non francophones ne peuvent pas accéder au contenu, réduisant la portée effective du portfolio.

## What Changes

- Ajout d'un composant `LanguageSwitcher` accessible depuis le header global
- Intégration d'un système d'internationalisation (i18n) pour gérer les traductions FR/EN
- Traduction du contenu statique principal (navigation, hero, sections About, projets)
- Persistance de la langue choisie (localStorage + URL locale)

## Capabilities

### New Capabilities

- `language-switcher`: Composant UI permettant à l'utilisateur de basculer entre le français et l'anglais, intégré dans le header

### Modified Capabilities

- `about-page`: Les textes de présentation doivent être disponibles en FR et EN

## Impact

- **Code** : Nouveau composant `LanguageSwitcher`, provider i18n, fichiers de traduction (`fr.json`, `en.json`)
- **Dependencies** : Ajout d'une bibliothèque i18n (next-intl ou next-i18next selon architecture Next.js)
- **Layout** : Header modifié pour accueillir le switcher
- **Contenu** : Tous les textes statiques doivent être externalisés vers des fichiers de traduction
