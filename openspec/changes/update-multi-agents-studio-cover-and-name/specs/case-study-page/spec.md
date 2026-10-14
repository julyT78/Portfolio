## MODIFIED Requirements

### Requirement: Contenu narratif Multi-Agents Studio affiché dans la page case study
La page case study Multi-Agents Studio SHALL afficher le contexte Docaposte/Multi-Agents Studio, la démarche en étapes, et les résultats obtenus. Le nom interne « GETUP Forward » SHALL NOT apparaître dans le contenu rendu.

#### Scenario: Section contexte visible
- **WHEN** la page `/[locale]/projects/multi-agents-studio` se charge
- **THEN** un bloc "Contexte" décrivant la plateforme Multi-Agents Studio et ses 4 pôles est visible

#### Scenario: Aucune mention GETUP Forward dans la page rendue
- **WHEN** la page `/[locale]/projects/multi-agents-studio` se charge
- **THEN** le texte rendu ne contient aucune occurrence de « GETUP »

#### Scenario: Section démarche avec étapes de conception
- **WHEN** la page case study Multi-Agents Studio se charge
- **THEN** les étapes de la démarche (cadrage des 4 pôles, parcours utilisateur, framework multi-agents, tests utilisateurs) sont affichées dans l'ordre

#### Scenario: Images de la galerie affichées
- **WHEN** la page case study Multi-Agents Studio se charge
- **THEN** au moins une image de `public/images/projects/multi-agents-studio/` est visible sans erreur 404

#### Scenario: Hero affiche la nouvelle couverture
- **WHEN** la page case study Multi-Agents Studio se charge
- **THEN** le hero (`CaseStudyHero`) affiche `multi-agents-studio-cover.svg` et le titre « Multi-Agents Studio »
