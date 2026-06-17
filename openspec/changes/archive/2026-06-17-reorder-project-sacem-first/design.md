## Context

Le tableau `PROJECTS` dans `src/data/projects.ts` définit l'ordre d'affichage des projets sur la homepage et dans la navigation circulaire entre case studies. Actuellement, le projet Sacem est en dernière position (index 6). L'ordre souhaité place Sacem en index 0.

## Goals / Non-Goals

**Goals:**
- Sacem apparaît en premier dans la grille projets homepage
- La navigation circulaire (`getAdjacentProjects`) reflète le nouvel ordre sans modification

**Non-Goals:**
- Aucune modification du composant de grille
- Aucune modification des pages case study
- Aucun changement de contenu dans les entrées projets

## Decisions

**Déplacement direct dans le tableau source**
Déplacer l'objet `sacem` en tête du tableau `PROJECTS`. Toute la logique d'affichage itère sur ce tableau dans l'ordre — un seul fichier à modifier, aucun mapping intermédiaire.

Alternative écartée : ajouter un champ `order` sur `ProjectData` — surcharge inutile pour un besoin éditorial simple gérable par l'ordre du tableau.

## Risks / Trade-offs

`getAdjacentProjects` utilise les indices du tableau pour la navigation prev/next entre case studies → le changement d'ordre modifie mécaniquement les voisins de tous les projets. Comportement attendu et souhaité, aucune mitigation requise.
