## MODIFIED Requirements

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

#### Scenario: Lien "Voir le cas" pointe vers /projects/multi-agents-studio
- **WHEN** un visiteur clique sur "Voir le cas →" sur la card Multi-Agents Studio
- **THEN** il est redirigé vers `/[locale]/projects/multi-agents-studio` sans erreur 404

## ADDED Requirements

### Requirement: Card Multi-Agents Studio visible dans la section Projets homepage
La section Projets de la homepage SHALL afficher une card pour le projet Multi-Agents Studio dès que l'entrée est présente dans PROJECTS.

#### Scenario: Card Multi-Agents Studio affichée sur la homepage
- **WHEN** un visiteur charge la homepage
- **THEN** une card avec le titre du projet Multi-Agents Studio et la couleur `bg-mint` est visible dans la grille projets
