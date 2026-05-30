## MODIFIED Requirements

### Requirement: Couverture i18n complète
Toutes les chaînes de la page SHALL être externalisées dans `fr.json` et `en.json` sous le namespace `aboutPage`, y compris les chaînes utilisées dans les composants `AboutPageHero`, `AboutPivot`, `AboutTimeline` et `AboutSkills`.

#### Scenario: Aucune chaîne hardcodée en français
- **WHEN** la page est servie en locale `en`
- **THEN** tous les textes affichés sont en anglais (aucune chaîne en français n'apparaît)

#### Scenario: Aucune chaîne hardcodée en anglais
- **WHEN** la page est servie en locale `fr`
- **THEN** tous les textes affichés sont en français (aucune chaîne en anglais n'apparaît)

#### Scenario: Basculement depuis le LanguageSwitcher sur /about
- **WHEN** l'utilisateur est sur `/fr/about` et clique sur "EN" dans le LanguageSwitcher
- **THEN** la page `/en/about` affiche tous ses textes en anglais sans clé manquante (aucune clé brute `aboutPage.*` visible)
