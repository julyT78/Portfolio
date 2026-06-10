## ADDED Requirements

### Requirement: Libellé d'expérience correct sur toutes les surfaces FR
Le portfolio SHALL afficher "+ de 10 ans" (ou "+ DE 10 ANS" en majuscules) partout où l'expérience est mentionnée en français, sans jamais afficher "19 ans".

#### Scenario: Hero eyebrow FR
- **WHEN** la page d'accueil est chargée en locale FR
- **THEN** l'eyebrow du hero affiche "PRODUCT DESIGNER · AI ORCHESTRATOR · + DE 10 ANS"

#### Scenario: Pitch Playground eyebrow FR
- **WHEN** la section pitchPlayground est affichée en locale FR
- **THEN** l'eyebrow affiche "+ DE 10 ANS · DESIGN SYSTEM · IA DEPUIS 2024"

#### Scenario: Métrique d'expérience FR
- **WHEN** la métrique d'expérience est affichée en locale FR
- **THEN** la valeur affiche "+ de 10" avec le label "ans d'expérience"

### Requirement: Libellé d'expérience correct sur toutes les surfaces EN
Le portfolio SHALL afficher "10+ years" (ou "10+ YEARS" en majuscules) partout où l'expérience est mentionnée en anglais, sans jamais afficher "19 years".

#### Scenario: Hero eyebrow EN
- **WHEN** la page d'accueil est chargée en locale EN
- **THEN** l'eyebrow du hero affiche "PRODUCT DESIGNER · AI ORCHESTRATOR · 10+ YEARS"

#### Scenario: About section title EN
- **WHEN** la section about est affichée en locale EN
- **THEN** le titre affiche "10+ years of design, an AI speciality"

#### Scenario: AboutPage headline EN
- **WHEN** la page à propos est chargée en locale EN
- **THEN** le headline affiche "10+ years of design. A pivot in 2024."
