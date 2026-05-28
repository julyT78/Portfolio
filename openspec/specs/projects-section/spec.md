# Spec: projects-section

<!-- synced from change: case-study-pages — 2026-05-28 -->

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
