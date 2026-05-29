## ADDED Requirements

### Requirement: Section Deep Dive en accordéons affichée
La page case study SHALL afficher le composant `CaseStudyDeepDive` lorsque le projet possède un champ `deepDiveSections` non vide. Chaque section SHALL être rendue sous forme d'un accordéon natif avec titre cliquable et corps dépliable.

#### Scenario: Affichage d'une section dépliée
- **WHEN** un visiteur clique sur le titre d'une section accordéon fermée
- **THEN** le corps de la section se déploie et devient visible

#### Scenario: Fermeture d'une section ouverte
- **WHEN** un visiteur clique sur le titre d'une section accordéon déjà ouverte
- **THEN** le corps se referme

#### Scenario: Absence de sections deep dive
- **WHEN** le champ `deepDiveSections` est absent ou vide dans les données projet
- **THEN** le composant n'est pas rendu et aucun espace vide n'apparaît dans la page

### Requirement: État initial des accordéons
Tous les accordéons SHALL être fermés par défaut au chargement de la page.

#### Scenario: Chargement initial de la page
- **WHEN** la page case study se charge avec des sections deep dive disponibles
- **THEN** tous les accordéons sont dans un état fermé et seuls les titres sont visibles

### Requirement: Accessibilité des accordéons
Les accordéons SHALL respecter le pattern ARIA `button[aria-expanded]` + `div[aria-hidden]` pour garantir la compatibilité avec les lecteurs d'écran.

#### Scenario: État aria-expanded cohérent
- **WHEN** un accordéon est ouvert
- **THEN** le bouton de titre possède `aria-expanded="true"` et le corps possède `aria-hidden="false"`

#### Scenario: État aria-expanded à la fermeture
- **WHEN** un accordéon est fermé
- **THEN** le bouton de titre possède `aria-expanded="false"` et le corps possède `aria-hidden="true"`
