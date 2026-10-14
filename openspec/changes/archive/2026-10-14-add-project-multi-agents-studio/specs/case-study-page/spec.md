## ADDED Requirements

### Requirement: Route /projects/multi-agents-studio générée statiquement
La route `/[locale]/projects/multi-agents-studio` SHALL être générée statiquement via `generateStaticParams` et retourner HTTP 200 pour les locales `fr` et `en`.

#### Scenario: Accès à la page case study en français
- **WHEN** un visiteur accède à `/fr/projects/multi-agents-studio`
- **THEN** la page se charge avec statut 200 et affiche le contenu du projet Multi-Agents Studio

#### Scenario: Accès à la page case study en anglais
- **WHEN** un visiteur accède à `/en/projects/multi-agents-studio`
- **THEN** la page se charge avec statut 200 et affiche le contenu du projet Multi-Agents Studio

### Requirement: Contenu narratif Multi-Agents Studio affiché dans la page case study
La page case study Multi-Agents Studio SHALL afficher le contexte Docaposte/GETUP Forward, la démarche en étapes, et les résultats obtenus.

#### Scenario: Section contexte visible
- **WHEN** la page `/[locale]/projects/multi-agents-studio` se charge
- **THEN** un bloc "Contexte" décrivant la plateforme GETUP Forward et ses 4 pôles est visible

#### Scenario: Section démarche avec étapes de conception
- **WHEN** la page case study Multi-Agents Studio se charge
- **THEN** les étapes de la démarche (cadrage des 4 pôles, parcours utilisateur, framework multi-agents, tests utilisateurs) sont affichées dans l'ordre

#### Scenario: Images de la galerie affichées
- **WHEN** la page case study Multi-Agents Studio se charge
- **THEN** au moins une image de `public/images/projects/multi-agents-studio/` est visible sans erreur 404

### Requirement: Modules AgentFlow, ChallengeModule et DeepDive affichés
La page case study Multi-Agents Studio SHALL afficher les composants `CaseStudyAgentFlow`, `CaseStudyChallengeModule` et `CaseStudyDeepDive`, les données de l'entrée `multi-agents-studio` renseignant les trois champs correspondants.

#### Scenario: Flux d'agents visible
- **WHEN** la page case study Multi-Agents Studio se charge
- **THEN** le composant `CaseStudyAgentFlow` affiche le flux orchestrateur → workers → guardians

#### Scenario: Module défis visible
- **WHEN** la page case study Multi-Agents Studio se charge
- **THEN** le composant `CaseStudyChallengeModule` affiche les couples flaw/solution issus des tests utilisateurs
