## MODIFIED Requirements

### Requirement: Route case study accessible et pré-rendue
La route `/[locale]/projects/[slug]` SHALL exister pour chaque slug de projet défini dans `src/data/projects.ts` et retourner HTTP 200. Les pages SHALL être générées statiquement via `generateStaticParams`.

#### Scenario: Accès à un case study existant en français
- **WHEN** un visiteur accède à `/fr/projects/numspot`
- **THEN** la page se charge avec statut 200 et affiche le contenu en français

#### Scenario: Accès à un case study existant en anglais
- **WHEN** un visiteur accède à `/en/projects/numspot`
- **THEN** la page se charge avec statut 200 et affiche le contenu en anglais

#### Scenario: Slug inexistant
- **WHEN** un visiteur accède à `/fr/projects/inexistant`
- **THEN** la page retourne une 404 via `notFound()`

---

### Requirement: Intégration des nouveaux modules dans la page case study
La page `/[locale]/projects/[slug]` SHALL intégrer les composants `CaseStudyAgentFlow`, `CaseStudyChallengeModule` et `CaseStudyDeepDive` dans l'ordre de rendu suivant : Hero → Context → Approach → AgentFlow → ChallengeModule → Gallery → DeepDive → Results → Nav. Chaque nouveau composant SHALL recevoir les données projet en prop et SHALL gérer lui-même l'affichage conditionnel (retourner `null` si les données sont absentes).

#### Scenario: Page avec tous les nouveaux modules renseignés
- **WHEN** un projet possède les champs `agentFlow`, `challenges` et `deepDiveSections`
- **THEN** les trois nouveaux composants sont visibles dans la page dans l'ordre défini

#### Scenario: Page avec modules partiellement renseignés
- **WHEN** un projet ne possède que le champ `challenges` (sans `agentFlow` ni `deepDiveSections`)
- **THEN** seul `CaseStudyChallengeModule` est affiché ; les autres composants sont absents sans impact visuel

## ADDED Requirements

### Requirement: Extension du modèle de données ProjectData
Le type `ProjectData` dans `src/data/projects.ts` SHALL inclure trois nouveaux champs optionnels : `challenges`, `deepDiveSections` et `agentFlow`. L'ajout de ces champs SHALL être rétrocompatible : les projets existants sans ces champs SHALL continuer à s'afficher correctement.

#### Scenario: Projet existant sans nouveaux champs
- **WHEN** un projet ne déclare pas les champs `challenges`, `deepDiveSections` ou `agentFlow`
- **THEN** la page case study s'affiche sans erreur TypeScript ni erreur runtime, avec les composants existants inchangés

#### Scenario: Projet avec champs partiels
- **WHEN** un projet déclare uniquement `challenges` parmi les nouveaux champs
- **THEN** TypeScript accepte la définition et la page compile sans erreur
