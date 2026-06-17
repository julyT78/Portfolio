## ADDED Requirements

### Requirement: Card Sacem visible dans la section Projets homepage
La section Projets de la homepage SHALL afficher une card pour le projet Sacem dès que l'entrée est présente dans PROJECTS.

#### Scenario: Card Sacem affichée sur la homepage
- **WHEN** un visiteur charge la homepage
- **THEN** une card avec le titre du projet Sacem et la couleur `bg-lilac` est visible dans la grille projets

#### Scenario: Lien "Voir le cas" pointe vers /projects/sacem
- **WHEN** un visiteur clique sur "Voir le cas →" sur la card Sacem
- **THEN** il est redirigé vers `/[locale]/projects/sacem` sans erreur 404
