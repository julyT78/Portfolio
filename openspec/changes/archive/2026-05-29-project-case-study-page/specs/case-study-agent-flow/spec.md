## ADDED Requirements

### Requirement: Schéma de flux d'agent affiché
La page case study SHALL afficher le composant `CaseStudyAgentFlow` lorsque le projet possède un champ `agentFlow` non vide. Chaque nœud du tableau SHALL être rendu visuellement avec son label et un style différencié selon son type (`input`, `process`, `output`, `decision`).

#### Scenario: Affichage d'un flux complet
- **WHEN** un projet possède un tableau `agentFlow` avec plusieurs nœuds
- **THEN** les nœuds sont affichés dans l'ordre du tableau avec des connecteurs visuels entre chaque nœud adjacent

#### Scenario: Absence de flux d'agent
- **WHEN** le champ `agentFlow` est absent ou vide dans les données projet
- **THEN** le composant n'est pas rendu et aucun espace vide n'apparaît dans la page

### Requirement: Types de nœuds visuellement distincts
Le composant SHALL différencier visuellement les quatre types de nœuds selon les tokens design du projet.

#### Scenario: Nœud de type input
- **WHEN** un nœud possède le type `input`
- **THEN** il est affiché avec un style visuel distinctif identifiant l'entrée du flux

#### Scenario: Nœud de type output
- **WHEN** un nœud possède le type `output`
- **THEN** il est affiché avec un style visuel distinctif identifiant la sortie du flux

#### Scenario: Nœud de type decision
- **WHEN** un nœud possède le type `decision`
- **THEN** il est affiché avec un style visuel distinctif (ex. losange ou bordure différente) signalant un branchement conditionnel

### Requirement: Lisibilité mobile du flux
Le composant SHALL rester lisible sur mobile en adoptant un layout vertical (colonne) en dessous de 768px.

#### Scenario: Affichage mobile
- **WHEN** la page est consultée sur un viewport inférieur à 768px
- **THEN** les nœuds s'affichent en colonne verticale avec les connecteurs orientés verticalement
