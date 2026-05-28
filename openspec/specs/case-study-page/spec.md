# Spec: case-study-page

<!-- synced from change: case-study-pages — 2026-05-28 -->

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
