## Context

Le portfolio utilise une source de données centralisée (`src/data/projects.ts`) pour alimenter à la fois les cards homepage et les pages case study. L'architecture existante (composant `Projects.tsx`, route dynamique `/[locale]/projects/[slug]`) est conçue pour être extensible : ajouter un projet ne requiert aucune modification de composant.

Les assets visuels du projet Sacem sont dans `assets/Projets/Sacem/` (hors du dossier `public/`) et doivent être copiés dans `public/images/projects/sacem/` pour être servis par Next.js.

## Goals / Non-Goals

**Goals:**
- Ajouter l'entrée Sacem dans `src/data/projects.ts` avec les champs complets (card + case study)
- Copier `ecran_sacem.png` vers `public/images/projects/sacem/` pour l'utilisation dans la card et la galerie
- La card Sacem apparaît dans la section Projets homepage
- La page `/[locale]/projects/sacem` est générée statiquement

**Non-Goals:**
- Modifier le composant `Projects.tsx` ou la page case study (déjà génériques)
- Créer un nouveau template de page pour Sacem
- Traduire le contenu en anglais dans cette itération (les autres projets suivent le même pattern bilingue, à gérer en contenu uniquement)

## Decisions

**Couleur de card : `bg-lilac`**
L'interface CENSO visible dans ecran_sacem.png utilise un thème violet/lavande. `block-lilac` (`#c5b0f4`) est la teinte du design system la plus proche. Alternative écartée : `bg-pink` (trop différent du register visuel Sacem).

**KPI : `{ value: "106", label: "critères RGAA audités" }` (ou "3 profils" selon arbitrage)**
Le chiffre "106 critères obligatoires RGAA" est le plus différenciant et quantifié du projet. Alternative possible : "3 profils" (personas) ou "−∞ charge cognitive" (trop qualitatif). Le choix final sera fait à l'implémentation.

**Image card : `ecran_sacem.png`**
C'est la seule image de contexte disponible. Elle montre l'interface sur laptop — cohérent avec le register des autres cards.

**Aucun nouveau composant requis**
L'architecture existante gère déjà les nouveaux slugs dynamiquement via `generateStaticParams`. Le seul effet de bord attendu est l'apparition de la card dans la grille homepage (comportement attendu).

## Risks / Trade-offs

- **[Risque] Ordre d'affichage dans la grille homepage** → La card Sacem sera ajoutée à la fin du tableau `PROJECTS`. Si l'ordre visuel ne convient pas, il suffit de déplacer l'objet dans le tableau.
- **[Risque] Contenu bilingue manquant** → Les champs textuels (`title`, `tagline`, `context`, etc.) seront en français. L'internationalisation des données projets n'est pas gérée dans cette itération (pattern identique aux autres projets existants).
- **[Risque] Image hors `public/`** → Sans la copie vers `public/`, Next.js ne peut pas servir l'image. L'implémentation doit inclure cette étape.
