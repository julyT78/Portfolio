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

## MODIFIED Requirements

### Requirement: Contenu narratif Sacem affiché dans la page case study
La page case study Sacem SHALL afficher le contexte CENSO, la démarche UX en étapes, et les résultats obtenus.

#### Scenario: Section contexte CENSO visible
- **WHEN** la page `/[locale]/projects/sacem` se charge
- **THEN** un bloc "Contexte" décrivant CENSO et les fédérations partenaires est visible

#### Scenario: Section démarche avec étapes d'audit RGAA
- **WHEN** la page case study Sacem se charge
- **THEN** les étapes de la démarche (audit IA, base de connaissances, recherche UX) sont affichées dans l'ordre

#### Scenario: Visuels de la galerie CENSO affichés
- **WHEN** la page case study Sacem se charge
- **THEN** les visuels listés dans le champ `gallery` de l'entrée Sacem sont visibles sans erreur 404
