## ADDED Requirements

### Requirement: Route /projects/sacem générée statiquement
La route `/[locale]/projects/sacem` SHALL être générée statiquement via `generateStaticParams` et retourner HTTP 200 pour les locales `fr` et `en`.

#### Scenario: Accès à la page case study Sacem en français
- **WHEN** un visiteur accède à `/fr/projects/sacem`
- **THEN** la page se charge avec statut 200 et affiche le contenu du projet Sacem

#### Scenario: Accès à la page case study Sacem en anglais
- **WHEN** un visiteur accède à `/en/projects/sacem`
- **THEN** la page se charge avec statut 200 et affiche le contenu du projet Sacem

### Requirement: Contenu narratif Sacem affiché dans la page case study
La page case study Sacem SHALL afficher le contexte CENSO, la démarche UX en étapes, et les résultats obtenus.

#### Scenario: Section contexte CENSO visible
- **WHEN** la page `/[locale]/projects/sacem` se charge
- **THEN** un bloc "Contexte" décrivant CENSO et les fédérations partenaires est visible

#### Scenario: Section démarche avec étapes d'audit RGAA
- **WHEN** la page case study Sacem se charge
- **THEN** les étapes de la démarche (audit IA, base de connaissances, recherche UX) sont affichées dans l'ordre

#### Scenario: Image ecran_sacem.png affichée
- **WHEN** la page case study Sacem se charge
- **THEN** l'image `/images/projects/sacem/ecran_sacem.png` est visible sans erreur 404
