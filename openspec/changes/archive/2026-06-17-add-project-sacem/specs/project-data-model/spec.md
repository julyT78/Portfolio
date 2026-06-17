## ADDED Requirements

### Requirement: Slug "sacem" présent et unique dans PROJECTS
Le tableau `PROJECTS` SHALL contenir exactement un objet avec `id: "sacem"`, en kebab-case ASCII, sans doublon.

#### Scenario: Unicité du slug sacem
- **WHEN** on filtre le tableau PROJECTS sur `id === "sacem"`
- **THEN** exactement un résultat est retourné

#### Scenario: TypeScript accepte l'entrée Sacem sans erreur
- **WHEN** TypeScript compile le projet (`tsc --noEmit`)
- **THEN** aucune erreur de type n'est levée pour l'objet Sacem dans PROJECTS
