# Spec: case-study-page

<!-- synced from change: project-case-study-page — 2026-05-29 -->
<!-- synced from change: add-project-sacem — 2026-06-17 -->

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

### Requirement: Hero section immersive
La page SHALL afficher un hero avec la couleur de fond du projet, le nom du client, l'année, le titre, la tagline, le KPI badge et les tags.

#### Scenario: Affichage du hero
- **WHEN** la page case study se charge
- **THEN** un `h1` avec le titre du projet est visible dans un bloc coloré (couleur du projet), accompagné du client, de l'année, du KPI et des tags

#### Scenario: KPI badge visible
- **WHEN** la page se charge
- **THEN** le badge KPI (valeur + label) est affiché dans le hero

---

### Requirement: Sections narrative contexte et démarche
La page SHALL afficher les sections textuelles du case study : contexte (problème), démarche UX (étapes), résultats.

#### Scenario: Section contexte présente
- **WHEN** la page se charge
- **THEN** une section "Contexte" ou équivalent est visible avec le texte de contexte du projet

#### Scenario: Section résultats présente
- **WHEN** la page se charge
- **THEN** une section résultats est visible avec le deepDive du projet

---

### Requirement: Galerie de visuels du projet
La page SHALL afficher une galerie des images associées au projet, issues de `public/images/book/<client>/`.

#### Scenario: Images galerie affichées
- **WHEN** la page case study se charge
- **THEN** au moins une image de galerie est visible pour les projets ayant des images listées

#### Scenario: Galerie vide tolérée
- **WHEN** un projet n'a pas d'images de galerie définies
- **THEN** la page s'affiche sans erreur, sans section galerie vide

---

### Requirement: Navigation entre projets
La page SHALL afficher des liens vers le projet précédent et le projet suivant (ordre circulaire).

#### Scenario: Lien projet suivant fonctionnel
- **WHEN** un visiteur clique sur "Projet suivant"
- **THEN** il est redirigé vers la page case study du projet suivant dans la liste

#### Scenario: Lien projet précédent fonctionnel
- **WHEN** un visiteur clique sur "Projet précédent"
- **THEN** il est redirigé vers la page case study du projet précédent dans la liste (circulaire)

---

### Requirement: Lien retour vers la homepage
La page SHALL afficher un lien de retour vers la section projets de la homepage.

#### Scenario: Retour homepage
- **WHEN** un visiteur clique sur le lien retour
- **THEN** il est redirigé vers `/{locale}#projets`

---

### Requirement: Intégration des nouveaux modules dans la page case study
La page `/[locale]/projects/[slug]` SHALL intégrer les composants `CaseStudyAgentFlow`, `CaseStudyChallengeModule` et `CaseStudyDeepDive` dans l'ordre de rendu suivant : Hero → Context → Approach → AgentFlow → ChallengeModule → Gallery → DeepDive → Results → Nav. Chaque nouveau composant SHALL recevoir les données projet en prop et SHALL gérer lui-même l'affichage conditionnel (retourner `null` si les données sont absentes).

#### Scenario: Page avec tous les nouveaux modules renseignés
- **WHEN** un projet possède les champs `agentFlow`, `challenges` et `deepDiveSections`
- **THEN** les trois nouveaux composants sont visibles dans la page dans l'ordre défini

#### Scenario: Page avec modules partiellement renseignés
- **WHEN** un projet ne possède que le champ `challenges` (sans `agentFlow` ni `deepDiveSections`)
- **THEN** seul `CaseStudyChallengeModule` est affiché ; les autres composants sont absents sans impact visuel

---

### Requirement: Extension du modèle de données ProjectData
Le type `ProjectData` dans `src/data/projects.ts` SHALL inclure trois nouveaux champs optionnels : `challenges`, `deepDiveSections` et `agentFlow`. L'ajout de ces champs SHALL être rétrocompatible : les projets existants sans ces champs SHALL continuer à s'afficher correctement.

#### Scenario: Projet existant sans nouveaux champs
- **WHEN** un projet ne déclare pas les champs `challenges`, `deepDiveSections` ou `agentFlow`
- **THEN** la page case study s'affiche sans erreur TypeScript ni erreur runtime, avec les composants existants inchangés

#### Scenario: Projet avec champs partiels
- **WHEN** un projet déclare uniquement `challenges` parmi les nouveaux champs
- **THEN** TypeScript accepte la définition et la page compile sans erreur

---

### Requirement: Route /projects/sacem générée statiquement
La route `/[locale]/projects/sacem` SHALL être générée statiquement via `generateStaticParams` et retourner HTTP 200 pour les locales `fr` et `en`.

#### Scenario: Accès à la page case study Sacem en français
- **WHEN** un visiteur accède à `/fr/projects/sacem`
- **THEN** la page se charge avec statut 200 et affiche le contenu du projet Sacem

#### Scenario: Accès à la page case study Sacem en anglais
- **WHEN** un visiteur accède à `/en/projects/sacem`
- **THEN** la page se charge avec statut 200 et affiche le contenu du projet Sacem

---

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
