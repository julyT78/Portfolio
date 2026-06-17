# Spec: sacem-project-entry

<!-- synced from change: add-project-sacem — 2026-06-17 -->

### Requirement: Entrée Sacem complète dans la source de données
Le tableau `PROJECTS` dans `src/data/projects.ts` SHALL contenir un objet `ProjectData` avec `id: "sacem"` incluant tous les champs requis pour la card homepage et la page case study.

#### Scenario: Champs homepage présents
- **WHEN** on accède à l'entrée `id: "sacem"` dans le tableau PROJECTS
- **THEN** les champs `client`, `year`, `title`, `tagline`, `tags`, `color`, `image`, `href`, `kpi` et `deepDive` sont tous définis et non vides

#### Scenario: Champs case study présents
- **WHEN** on accède à l'entrée `id: "sacem"` dans le tableau PROJECTS
- **THEN** les champs `context`, `role`, `duration`, `approach` (tableau avec au moins 3 étapes) et `results` (tableau avec au moins 3 items) sont définis

#### Scenario: Tags reflètent les compétences Sacem
- **WHEN** on inspecte le champ `tags` de l'entrée Sacem
- **THEN** les tags incluent au moins "RGAA A1", "IA agent" et "UX Research"

#### Scenario: Image disponible et servable par Next.js
- **WHEN** Next.js génère la page ou la card Sacem
- **THEN** le chemin `image` pointe vers un fichier existant dans `public/images/projects/sacem/`

---

### Requirement: Asset ecran_sacem.png copié dans public
Le fichier `ecran_sacem.png` SHALL être présent dans `public/images/projects/sacem/ecran_sacem.png` pour être servi par le serveur Next.js.

#### Scenario: Fichier accessible via HTTP
- **WHEN** le navigateur demande `/images/projects/sacem/ecran_sacem.png`
- **THEN** le fichier est retourné avec statut 200
