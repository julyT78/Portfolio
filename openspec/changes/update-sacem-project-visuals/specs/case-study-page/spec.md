## ADDED Requirements

### Requirement: Mise en page uniforme de la galerie
Le composant `CaseStudyGallery` SHALL rendre toutes ses vignettes au même format, sans traitement particulier du premier visuel, quel que soit le nombre d'images de la galerie.

#### Scenario: Toutes les vignettes à la même taille
- **WHEN** une page case study affiche une galerie de 3 visuels ou plus
- **THEN** chaque vignette a le même ratio et la même largeur, et aucune ne s'étend sur plusieurs colonnes

#### Scenario: Grille sans cellule orpheline sur un nombre pair
- **WHEN** une galerie contient un nombre pair de visuels et que la fenêtre est assez large pour deux colonnes
- **THEN** toutes les rangées sont complètes

#### Scenario: Colonne unique en mobile
- **WHEN** la page case study est affichée dans une fenêtre de moins de 640 px de large
- **THEN** les vignettes s'empilent sur une seule colonne, sans débordement horizontal de la page
