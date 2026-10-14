## MODIFIED Requirements

### Requirement: Slugs uniques et stables
Chaque projet SHALL avoir un `id` unique en kebab-case servant de slug URL (`/projects/[id]`).

#### Scenario: Unicité des slugs
- **WHEN** on inspecte le tableau PROJECTS
- **THEN** chaque `id` est unique dans le tableau

#### Scenario: Slugs sans caractères spéciaux
- **WHEN** on consulte les ids des projets
- **THEN** tous les ids sont en kebab-case ASCII (pas d'accents, pas d'espaces)

#### Scenario: Slug "multi-agents-studio" présent et unique
- **WHEN** on filtre le tableau PROJECTS sur `id === "multi-agents-studio"`
- **THEN** exactement un résultat est retourné

#### Scenario: TypeScript accepte l'entrée Multi-Agents Studio sans erreur
- **WHEN** TypeScript compile le projet (`tsc --noEmit`)
- **THEN** aucune erreur de type n'est levée pour l'objet Multi-Agents Studio dans PROJECTS
