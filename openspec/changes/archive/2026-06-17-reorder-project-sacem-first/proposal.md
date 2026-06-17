## Why

Le projet Censo SACEM est le projet le plus récent et le plus représentatif du positionnement actuel du portfolio (IA agent, RGAA A1, UX Research). Le placer en première position dans la grille projets renforce immédiatement l'impact à la première impression et aligne l'ordre d'affichage sur la priorité éditoriale souhaitée.

## What Changes

- L'entrée `sacem` dans le tableau `PROJECTS` de `src/data/projects.ts` est déplacée de la dernière position (index 6) à la première position (index 0)
- L'ordre d'affichage des cards sur la homepage reflète ce nouveau classement

## Capabilities

### New Capabilities

Aucune nouvelle capacité introduite.

### Modified Capabilities

- `projects-section` : l'ordre des projets affichés dans la grille homepage change — le projet Sacem apparaît désormais en premier

## Impact

- `src/data/projects.ts` : réorganisation du tableau `PROJECTS` uniquement
- Aucune modification de composant, de route, ni de spec d'affichage
- La navigation circulaire (`getAdjacentProjects`) s'adapte automatiquement au nouvel ordre
