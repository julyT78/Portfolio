## ADDED Requirements

### Requirement: Entrée Multi-Agents Studio complète dans la source de données
Le tableau `PROJECTS` dans `src/data/projects.ts` SHALL contenir un objet `ProjectData` avec `id: "multi-agents-studio"` incluant tous les champs requis pour la card homepage et la page case study.

#### Scenario: Champs homepage présents
- **WHEN** on accède à l'entrée `id: "multi-agents-studio"` dans le tableau PROJECTS
- **THEN** les champs `client`, `year`, `title`, `tagline`, `tags`, `color`, `image`, `href`, `kpi` et `deepDive` sont tous définis et non vides

#### Scenario: Champs case study présents
- **WHEN** on accède à l'entrée `id: "multi-agents-studio"` dans le tableau PROJECTS
- **THEN** les champs `context`, `role`, `duration`, `approach` (tableau avec au moins 3 étapes) et `results` (tableau avec au moins 3 items) sont définis

#### Scenario: Tags reflètent les compétences du projet
- **WHEN** on inspecte le champ `tags` de l'entrée Multi-Agents Studio
- **THEN** les tags incluent des mentions liées à l'IA, au multi-agents ou à la gouvernance IA

#### Scenario: Image disponible et servable par Next.js
- **WHEN** Next.js génère la page ou la card Multi-Agents Studio
- **THEN** le chemin `image` pointe vers un fichier existant dans `public/images/projects/multi-agents-studio/`

### Requirement: Champs étendus défis, deep dive et flux d'agents
L'entrée `multi-agents-studio` SHALL inclure les champs optionnels `challenges`, `deepDiveSections` et `agentFlow` définis dans `ProjectData`.

#### Scenario: Challenges présents
- **WHEN** on accède au champ `challenges` de l'entrée `multi-agents-studio`
- **THEN** le tableau contient au moins 2 entrées avec `flaw`, `flawDetail`, `solution` et `solutionDetail` non vides

#### Scenario: DeepDiveSections présentes
- **WHEN** on accède au champ `deepDiveSections` de l'entrée `multi-agents-studio`
- **THEN** le tableau contient au moins 3 sections avec `title` et `body` non vides

#### Scenario: AgentFlow présent et cohérent
- **WHEN** on accède au champ `agentFlow` de l'entrée `multi-agents-studio`
- **THEN** le tableau contient au moins un nœud de type `input`, un de type `process` et un de type `output`

### Requirement: Assets Multi-Agents Studio copiés dans public
Une sélection d'images représentatives du projet SHALL être présente dans `public/images/projects/multi-agents-studio/` avec des noms de fichiers en kebab-case ASCII, pour être servies par le serveur Next.js.

#### Scenario: Fichiers accessibles via HTTP
- **WHEN** le navigateur demande une image listée dans le champ `gallery` de l'entrée `multi-agents-studio`
- **THEN** le fichier est retourné avec statut 200

#### Scenario: Noms de fichiers sans accents ni espaces
- **WHEN** on inspecte les noms de fichiers dans `public/images/projects/multi-agents-studio/`
- **THEN** aucun nom ne contient d'accent, d'espace ou de caractère spécial non URL-safe
