# Spec: projects-section

<!-- synced from change: case-study-pages — 2026-05-28 -->
<!-- synced from change: add-project-sacem — 2026-06-17 -->
<!-- synced from change: reorder-project-sacem-first — 2026-06-17 -->

### Requirement: Lien "Voir le cas" pointe vers la page case study
Le bouton/lien "Voir le cas →" de chaque card projet SHALL pointer vers `/[locale]/projects/[id]` au lieu de `#projets`.

#### Scenario: Lien card fonctionnel vers case study
- **WHEN** un visiteur clique sur "Voir le cas →" sur la card du projet Numspot
- **THEN** il est redirigé vers `/fr/projects/numspot` (ou `/en/projects/numspot` selon la locale active)

#### Scenario: Lien card fonctionnel pour tous les projets
- **WHEN** un visiteur clique sur "Voir le cas →" sur n'importe quelle card projet
- **THEN** il est redirigé vers la page case study correspondante sans erreur 404

#### Scenario: href utilise la locale courante
- **WHEN** le visiteur est sur la version anglaise du site (`/en`)
- **THEN** le lien de la card pointe vers `/en/projects/[slug]`

---

### Requirement: Card Sacem visible dans la section Projets homepage
La section Projets de la homepage SHALL afficher une card pour le projet Sacem dès que l'entrée est présente dans PROJECTS.

#### Scenario: Card Sacem affichée sur la homepage
- **WHEN** un visiteur charge la homepage
- **THEN** une card avec le titre du projet Sacem et la couleur `bg-lilac` est visible dans la grille projets

#### Scenario: Lien "Voir le cas" pointe vers /projects/sacem
- **WHEN** un visiteur clique sur "Voir le cas →" sur la card Sacem
- **THEN** il est redirigé vers `/[locale]/projects/sacem` sans erreur 404

---

### Requirement: Projet Sacem affiché en première position dans la grille
La section Projets de la homepage SHALL afficher le projet Sacem en première position (index 0) dans la grille des cards.

#### Scenario: Sacem est la première card visible
- **WHEN** un visiteur charge la homepage
- **THEN** la card du projet Sacem est affichée en première position dans la grille projets, avant toutes les autres cards
