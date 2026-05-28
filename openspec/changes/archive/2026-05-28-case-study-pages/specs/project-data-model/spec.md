## ADDED Requirements

### Requirement: Source de données projets centralisée
Un fichier `src/data/projects.ts` SHALL exister et exporter un tableau typé `PROJECTS` contenant toutes les données des projets utilisées à la fois par la homepage et les pages case study.

#### Scenario: Import depuis Projects.tsx
- **WHEN** `Projects.tsx` importe depuis `src/data/projects.ts`
- **THEN** toutes les données de cards (id, client, year, title, tagline, tags, color, image, href, kpi, deepDive) sont disponibles

#### Scenario: Import depuis la page case study
- **WHEN** `src/app/[locale]/projects/[slug]/page.tsx` importe depuis `src/data/projects.ts`
- **THEN** les données étendues (context, approach, results, gallery) sont disponibles pour le slug demandé

---

### Requirement: Type ProjectData complet
Le type `ProjectData` SHALL inclure les champs homepage (id, client, year, title, tagline, tags, color, image, href, kpi, deepDive) ET les champs case study (context, approach, gallery).

#### Scenario: Typage complet
- **WHEN** TypeScript compile le projet (`tsc --noEmit`)
- **THEN** aucune erreur de type liée à `ProjectData`

#### Scenario: Champs case study optionnels tolérés
- **WHEN** un projet n'a pas de `gallery` définie
- **THEN** TypeScript accepte `gallery?: string[]` sans erreur

---

### Requirement: Slugs uniques et stables
Chaque projet SHALL avoir un `id` unique en kebab-case servant de slug URL (`/projects/[id]`).

#### Scenario: Unicité des slugs
- **WHEN** on inspecte le tableau PROJECTS
- **THEN** chaque `id` est unique dans le tableau

#### Scenario: Slugs sans caractères spéciaux
- **WHEN** on consulte les ids des projets
- **THEN** tous les ids sont en kebab-case ASCII (pas d'accents, pas d'espaces)
