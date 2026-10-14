## Why

Le portfolio ne présente pas encore le projet **GETUP Forward / Multi-Agent Studio** (Docaposte, filiale La Poste), un cas d'usage qui démontre très directement la posture d'**Orchestrateur IA** revendiquée par le portfolio : conception d'une plateforme de formation IA à 4 pôles ET d'un framework d'orchestration multi-agents (24 agents spécialisés générés en 1 commande) — ce même framework a d'ailleurs servi à produire le projet SACEM/CENSO déjà présent dans le portfolio. Ce projet n'est visible nulle part ailleurs dans les cas actuels.

## What Changes

- Ajout d'une nouvelle entrée `"multi-agents-studio"` dans `src/data/projects.ts` avec tous les champs requis (homepage card + case study étendu + challenges + deep dive sections + agent flow)
- Copie d'une sélection de captures d'écran depuis `assets/Projets/Multi-agents Studio/` vers `public/images/projects/multi-agents-studio/` pour qu'elles soient servies par Next.js
- La card "GETUP Forward — Multi-Agents Studio" apparaît dans la section Projets de la homepage (composant `Projects.tsx`)
- Une page case study `/[locale]/projects/multi-agents-studio` est générée automatiquement via `generateStaticParams`, incluant le module "Défi IA vs Solution UX" et un schéma de flux d'agents (orchestrateur → workers → guardians)

## Capabilities

### New Capabilities

- `multi-agents-studio-project-entry` : Données complètes du projet GETUP Forward / Multi-Agent Studio (card homepage + page case study, défis/solutions, sections deep dive, flux d'agents) dans la source de données centralisée `projects.ts`

### Modified Capabilities

- `project-data-model` : Extension du tableau PROJECTS avec un nouvel item `multi-agents-studio`
- `projects-section` : Affichage de la nouvelle card dans la grille homepage
- `case-study-page` : Génération de la route `/[locale]/projects/multi-agents-studio` via `generateStaticParams`

## Impact

- `src/data/projects.ts` : ajout d'un objet ProjectData complet pour `multi-agents-studio`
- `public/images/projects/multi-agents-studio/` : dossier à créer avec les images sélectionnées
- Aucun changement de composant requis : l'architecture existante (`Projects.tsx`, `case-study/[slug]`, modules challenges/deep-dive/agent-flow déjà utilisés par le projet `pulse`) gère déjà les nouveaux projets dynamiquement
