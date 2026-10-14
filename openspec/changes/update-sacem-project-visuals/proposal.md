## Why

Le cas d'étude SACEM / CENSO ne dispose aujourd'hui que d'un seul visuel (`ecran_sacem.png`), utilisé à la fois comme couverture sur la homepage et comme unique image de galerie. Les nouvelles captures livrées dans `assets/Projets/Sacem/` couvrent enfin les écrans qui portent le récit du projet (tableau de bord fédération, tunnel de paiement, validation de contraste RGAA), ce qui permet de rendre le cas crédible visuellement au lieu de reposer uniquement sur du texte.

## What Changes

- Ajout de 5 nouveaux assets dans `public/images/projects/sacem/`, renommés en kebab-case sans accent ni espace, conformément à la convention des autres projets.
- Remplacement de la couverture du projet SACEM : le champ `image` passe de `ecran_sacem.png` à la nouvelle image `censo-cover.png` (mise en situation du tableau de bord CENSO sur portable).
- Enrichissement de la galerie du cas d'étude : passage de 1 à 5 visuels, sélectionnés pour illustrer les 3 profils utilisateurs et la dimension accessibilité du projet.
- Les captures non retenues (doublons, captures avec chrome Figma ou notification système incrustée) ne sont pas publiées.

## Capabilities

### New Capabilities
<!-- Aucune nouvelle capability : la couverture visuelle du projet SACEM relève des specs existantes. -->

### Modified Capabilities
- `sacem-project-entry`: la couverture du projet n'est plus `ecran_sacem.png` mais le nouvel asset de couverture, et la galerie doit contenir au moins 4 visuels couvrant les parcours clés plutôt qu'un seul écran.

## Impact

- `src/data/projects.ts` — champs `image` et `gallery` de l'entrée `id: "sacem"`.
- `public/images/projects/sacem/` — 5 fichiers ajoutés (l'existant `ecran_sacem.png` est conservé et reste dans la galerie).
- `assets/Projets/Sacem/` — dossier source, lecture seule, non modifié.
- Rendu impacté : card SACEM sur la homepage (`Projects.tsx`), hero et galerie de `/projects/sacem` (`CaseStudyHero.tsx`, `CaseStudyGallery.tsx`).
- Aucune modification de code applicatif, de dépendance ou d'API : changement de données et d'assets uniquement.
