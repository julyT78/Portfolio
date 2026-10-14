## Why

Le cas d'étude SACEM / CENSO ne dispose aujourd'hui que d'un seul visuel (`ecran_sacem.png`), utilisé à la fois comme couverture sur la homepage et comme unique image de galerie. Les nouvelles captures livrées dans `assets/Projets/Sacem/` couvrent enfin les écrans qui portent le récit du projet (tableau de bord fédération, tunnel de paiement, validation de contraste RGAA), ce qui permet de rendre le cas crédible visuellement au lieu de reposer uniquement sur du texte.

## What Changes

- Ajout de 5 nouveaux assets dans `public/images/projects/sacem/`, renommés en kebab-case sans accent ni espace, conformément à la convention des autres projets.
- Remplacement de la couverture du projet SACEM : le champ `image` passe de `ecran_sacem.png` à la nouvelle image `censo-cover.png` (mise en situation du tableau de bord CENSO sur portable).
- Enrichissement de la galerie du cas d'étude : passage de 1 à 4 visuels, sélectionnés pour illustrer les profils administrateur et gestionnaire ainsi que la dimension accessibilité du projet. L'ancien `ecran_sacem.png` est retiré de la galerie et du dossier publié.
- Les captures non retenues (doublons, captures avec chrome Figma ou notification système incrustée) ne sont pas publiées.
- Passage de `CaseStudyGallery` à une grille uniforme : le premier visuel ne s'affiche plus en pleine largeur.

## Capabilities

### New Capabilities
<!-- Aucune nouvelle capability : la couverture visuelle du projet SACEM relève des specs existantes. -->

### Modified Capabilities
- `sacem-project-entry`: la couverture du projet n'est plus `ecran_sacem.png` mais le nouvel asset de couverture, et la galerie doit contenir au moins 4 visuels couvrant les parcours clés plutôt qu'un seul écran.
- `case-study-page`: la galerie rend toutes ses vignettes au même format, sans traitement particulier du premier visuel.

## Impact

- `src/data/projects.ts` — champs `image` et `gallery` de l'entrée `id: "sacem"`.
- `src/components/sections/case-study/CaseStudyGallery.tsx` — suppression du cas particulier de mise en page sur le premier visuel. Affecte aussi les galeries Société Générale et Multi-Agents Studio.
- `public/images/projects/sacem/` — 5 fichiers ajoutés, `ecran_sacem.png` supprimé (sa source reste dans `assets/`).
- `assets/Projets/Sacem/` — dossier source, lecture seule, non modifié.
- Rendu impacté : card SACEM sur la homepage (`Projects.tsx`), hero et galerie de `/projects/sacem` (`CaseStudyHero.tsx`, `CaseStudyGallery.tsx`).
- Aucune modification de code applicatif, de dépendance ou d'API : changement de données et d'assets uniquement.
