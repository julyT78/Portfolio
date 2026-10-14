## Why

La couverture actuelle du projet Multi-Agents Studio (`getup-forward-dashboard.png`) est une capture d'écran de la plateforme de formation, qui ne porte pas le sujet réel du cas d'étude et qui fait doublon avec le premier visuel de la galerie. Le nouvel asset `Pulse-dashboard.svg` livré dans `assets/Projets/Multi-agents Studio/` offre une couverture vectorielle propre, lisible à toutes les tailles. En parallèle, le nom interne « GETUP Forward » n'a plus à apparaître dans le portfolio : le projet doit être présenté sous le seul nom « Multi-Agents Studio ».

## What Changes

- Publication du nouvel asset de couverture : `assets/Projets/Multi-agents Studio/Pulse-dashboard.svg` est copié vers `public/images/projects/multi-agents-studio/multi-agents-studio-cover.svg` (renommage en kebab-case ASCII, conformément à la convention du dossier).
- Remplacement de la couverture du projet : le champ `image` de l'entrée `id: "multi-agents-studio"` passe de `getup-forward-dashboard.png` au nouveau fichier SVG. Impacte la card homepage et le hero de `/projects/multi-agents-studio`.
- Renommage du projet : le titre `"GETUP Forward — Multi-Agents Studio"` devient `"Multi-Agents Studio"`.
- Suppression du nom « GETUP Forward » du corps de texte du cas d'étude (`context`, `approach`), remplacé par « Multi-Agents Studio » lorsqu'il désigne la plateforme.
- Renommage des deux assets publiés qui portent encore l'ancien nom : `getup-forward-dashboard.png` → `multi-agents-studio-dashboard.png` et `getup-forward-niveau-1.png` → `multi-agents-studio-niveau-1.png`, avec mise à jour des chemins correspondants dans `gallery`.
- La galerie conserve ses 6 visuels, dans le même ordre : le changement de couverture n'en retire aucun.
- Aucune autre entrée de `PROJECTS`, aucun composant et aucune dépendance n'est touché. L'asset `public/images/projects/softeam/Pulse-dashboard.svg` du projet PULSE reste inchangé.
- **Point bloquant à arbitrer avant implémentation** : le fichier `Pulse-dashboard.svg` livré dans le dossier Multi-agents Studio contient le **même visuel** que la couverture actuelle du projet PULSE (`public/images/projects/softeam/Pulse-dashboard.svg`) — même mise en situation du tableau de bord Pulse sur écran, fond violet. Les deux fichiers diffèrent par leur encodage (MD5 différents, 1,8 Mo contre 1,6 Mo) mais pas par leur contenu visible. Appliqué tel quel, le changement affiche la même image en couverture de deux projets voisins sur la homepage. Voir `design.md`, section Open Questions.

## Capabilities

### New Capabilities
<!-- Aucune nouvelle capability : couverture et nommage d'un projet existant relèvent des specs déjà en place. -->

### Modified Capabilities
- `multi-agents-studio-project-entry`: la couverture du projet est désormais un SVG dédié et non la capture du tableau de bord ; le titre affiché est « Multi-Agents Studio » sans mention « GETUP Forward » ; les noms de fichiers publiés ne contiennent plus « getup-forward ».
- `case-study-page`: le bloc « Contexte » de la page Multi-Agents Studio décrit la plateforme sous le nom « Multi-Agents Studio » et non « GETUP Forward ».

## Impact

- `src/data/projects.ts` — entrée `id: "multi-agents-studio"` : champs `title`, `image`, `gallery`, `context` et `approach[1].body`.
- `public/images/projects/multi-agents-studio/` — 1 fichier ajouté (`multi-agents-studio-cover.svg`), 2 fichiers renommés.
- `assets/Projets/Multi-agents Studio/` — dossier source, lecture seule, non modifié.
- Rendu impacté : card Multi-Agents Studio sur la homepage (`Projects.tsx`), hero et galerie de `/projects/multi-agents-studio` (`CaseStudyHero.tsx`, `CaseStudyGallery.tsx`), carousel de présentation s'il consomme le champ `image` (`PresentationHero.tsx`).
- Aucune modification de code applicatif, de dépendance, d'API ni de route : changement de données et d'assets uniquement.
- Point de vigilance : le SVG pèse 1,8 Mo (image PNG encodée en base64 dans un `<defs>`), soit plus que la couverture PNG actuelle (272 Ko). À contrôler au chargement de la homepage.
