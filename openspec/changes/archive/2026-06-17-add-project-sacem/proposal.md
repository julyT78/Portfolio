## Why

Le portfolio ne présente pas encore le projet SACEM (refonte de l'outil CENSO), un cas d'usage représentatif de l'expertise IA + accessibilité + UX complexe. Ce projet met en avant des compétences différenciantes — agent IA dédié à l'audit RGAA, orchestration multi-personas, prototype haute fidélité — qui ne sont pas visibles dans les autres cas du portfolio.

## What Changes

- Ajout d'une nouvelle entrée `"sacem"` dans `src/data/projects.ts` avec tous les champs requis (homepage card + case study étendu)
- Copie de l'asset `assets/Projets/Sacem/ecran_sacem.png` vers `public/images/projects/sacem/` pour qu'il soit servi par Next.js
- La card Sacem apparaît dans la section Projets de la homepage (composant `Projects.tsx`)
- Une page case study `/[locale]/projects/sacem` est générée automatiquement via `generateStaticParams`

## Capabilities

### New Capabilities

- `sacem-project-entry` : Données complètes du projet Sacem (card homepage + page case study) dans la source de données centralisée `projects.ts`

### Modified Capabilities

- `project-data-model` : Extension du tableau PROJECTS avec un nouvel item `sacem`
- `projects-section` : Affichage de la nouvelle card Sacem dans la grille homepage
- `case-study-page` : Génération de la route `/[locale]/projects/sacem` via `generateStaticParams`

## Impact

- `src/data/projects.ts` : ajout d'un objet ProjectData complet pour Sacem
- `public/images/projects/sacem/` : dossier à créer avec l'image ecran_sacem.png
- Aucun changement de composant requis : l'architecture existante (`Projects.tsx`, `case-study/[slug]`) gère déjà les nouveaux projets dynamiquement
