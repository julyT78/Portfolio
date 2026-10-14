## MODIFIED Requirements

### Requirement: Entrée Multi-Agents Studio complète dans la source de données
Le tableau `PROJECTS` dans `src/data/projects.ts` SHALL contenir un objet `ProjectData` avec `id: "multi-agents-studio"` incluant tous les champs requis pour la card homepage et la page case study. Le champ `title` SHALL valoir exactement `"Multi-Agents Studio"`, sans mention de l'ancien nom interne « GETUP Forward ».

#### Scenario: Champs homepage présents
- **WHEN** on accède à l'entrée `id: "multi-agents-studio"` dans le tableau PROJECTS
- **THEN** les champs `client`, `year`, `title`, `tagline`, `tags`, `color`, `image`, `href`, `kpi` et `deepDive` sont tous définis et non vides

#### Scenario: Titre sans mention GETUP Forward
- **WHEN** on inspecte le champ `title` de l'entrée `id: "multi-agents-studio"`
- **THEN** sa valeur est `"Multi-Agents Studio"` et ne contient aucune occurrence de « GETUP » ni de « Forward »

#### Scenario: Corps de texte sans mention GETUP Forward
- **WHEN** on inspecte les champs textuels de l'entrée `id: "multi-agents-studio"` (`tagline`, `deepDive`, `context`, `role`, `approach`, `results`, `challenges`, `deepDiveSections`)
- **THEN** aucune de ces valeurs ne contient l'occurrence « GETUP », la plateforme y étant désignée sous le nom « Multi-Agents Studio »

#### Scenario: Champs case study présents
- **WHEN** on accède à l'entrée `id: "multi-agents-studio"` dans le tableau PROJECTS
- **THEN** les champs `context`, `role`, `duration`, `approach` (tableau avec au moins 3 étapes) et `results` (tableau avec au moins 3 items) sont définis

#### Scenario: Tags reflètent les compétences du projet
- **WHEN** on inspecte le champ `tags` de l'entrée Multi-Agents Studio
- **THEN** les tags incluent des mentions liées à l'IA, au multi-agents ou à la gouvernance IA

#### Scenario: Image disponible et servable par Next.js
- **WHEN** Next.js génère la page ou la card Multi-Agents Studio
- **THEN** le chemin `image` pointe vers un fichier existant dans `public/images/projects/multi-agents-studio/`

#### Scenario: Couverture dédiée au format vectoriel
- **WHEN** on inspecte le champ `image` de l'entrée `id: "multi-agents-studio"`
- **THEN** sa valeur est `/images/projects/multi-agents-studio/multi-agents-studio-cover.svg` et non une capture d'écran du tableau de bord de formation

---

### Requirement: Assets Multi-Agents Studio copiés dans public
Une sélection d'images représentatives du projet SHALL être présente dans `public/images/projects/multi-agents-studio/` avec des noms de fichiers en kebab-case ASCII, pour être servies par le serveur Next.js. Aucun nom de fichier publié SHALL contenir l'ancien nom interne « getup-forward ».

#### Scenario: Fichiers accessibles via HTTP
- **WHEN** le navigateur demande une image listée dans le champ `gallery` de l'entrée `multi-agents-studio`
- **THEN** le fichier est retourné avec statut 200

#### Scenario: Couverture accessible via HTTP
- **WHEN** le navigateur demande `/images/projects/multi-agents-studio/multi-agents-studio-cover.svg`
- **THEN** le fichier est retourné avec statut 200 et le type MIME `image/svg+xml`

#### Scenario: Noms de fichiers sans accents ni espaces
- **WHEN** on inspecte les noms de fichiers dans `public/images/projects/multi-agents-studio/`
- **THEN** aucun nom ne contient d'accent, d'espace ou de caractère spécial non URL-safe

#### Scenario: Noms de fichiers sans mention getup-forward
- **WHEN** on inspecte les noms de fichiers dans `public/images/projects/multi-agents-studio/`
- **THEN** aucun nom ne contient la chaîne `getup-forward`, et aucun chemin de `src/data/projects.ts` ne la référence

#### Scenario: Galerie conservée après changement de couverture
- **WHEN** on inspecte le champ `gallery` de l'entrée `multi-agents-studio`
- **THEN** le tableau contient toujours 6 visuels, dans le même ordre qu'avant le changement, les deux premiers chemins pointant vers les fichiers renommés `multi-agents-studio-dashboard.png` et `multi-agents-studio-niveau-1.png`
