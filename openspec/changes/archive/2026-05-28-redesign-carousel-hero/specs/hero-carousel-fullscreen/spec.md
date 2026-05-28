## ADDED Requirements

### Requirement: Image plein fond avec dégradé blanc
Le carousel SHALL afficher l'image de la slide active en fond plein écran de la section hero, avec un overlay dégradé blanc partant de la gauche (oklch ~35% de largeur opaque, transition vers transparent à ~75%) pour préserver la lisibilité du texte.

#### Scenario: Image visible en fond
- **WHEN** la page se charge
- **THEN** l'image de la première slide couvre toute la surface de la section hero en `object-fit: cover`

#### Scenario: Dégradé blanc sur la gauche
- **WHEN** l'image est affichée en fond
- **THEN** un dégradé blanc semi-opaque couvre la partie gauche de la section, rendant le texte lisible sans fond opaque

#### Scenario: Transition entre slides
- **WHEN** le slide change (autoplay ou click sur dot)
- **THEN** la nouvelle image apparaît en fondu (cross-dissolve, ~0.8s) sans flash ni saut de layout

### Requirement: Navigation dots verticale droite
Le carousel SHALL afficher les indicateurs de navigation (dots) en colonne verticale, positionnés sur le bord droit de la section hero, centrés verticalement.

#### Scenario: Affichage des dots
- **WHEN** la section hero est visible sur desktop (>= md)
- **THEN** les dots sont affichés en colonne verticale, alignés à droite, centrés sur l'axe vertical de la section

#### Scenario: Dot actif distinct
- **WHEN** la slide i est active
- **THEN** le dot i est visuellement distinct (plus grand ou plus foncé) des dots inactifs

#### Scenario: Click sur dot
- **WHEN** l'utilisateur clique sur un dot
- **THEN** la slide correspondante devient active et le timer d'autoplay est réinitialisé

### Requirement: Légende de la slide active
Le carousel SHALL afficher le label et le contexte de la slide active en overlay discret sur l'image.

#### Scenario: Légende visible
- **WHEN** une slide est active
- **THEN** son label et son contexte sont affichés (bas ou coin de l'image, texte lisible sur fond sombre ou dégradé)

### Requirement: Comportement mobile
Sur mobile (< md), le carousel SHALL adapter l'affichage pour maintenir la lisibilité du texte hero.

#### Scenario: Image en fond sur mobile
- **WHEN** la viewport est < 768px
- **THEN** soit l'image background est masquée, soit son opacité est réduite (≤ 0.15) pour ne pas gêner la lecture du texte hero
