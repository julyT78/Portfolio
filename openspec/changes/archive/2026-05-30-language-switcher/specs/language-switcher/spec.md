## ADDED Requirements

### Requirement: Composant LanguageSwitcher visible dans la navigation
Le composant `LanguageSwitcher` SHALL être présent et visible dans la barre de navigation principale sur toutes les pages du portfolio.

#### Scenario: Présence dans la nav sur la page d'accueil
- **WHEN** un visiteur charge la page d'accueil (`/fr` ou `/en`)
- **THEN** un élément avec les labels "FR" et "EN" est visible dans la navigation

#### Scenario: Présence dans la nav sur la page About
- **WHEN** un visiteur charge la page `/fr/about` ou `/en/about`
- **THEN** le composant LanguageSwitcher est visible dans la navigation

#### Scenario: Présence dans la nav sur la page Projects
- **WHEN** un visiteur charge la page `/fr/projects` ou `/en/projects`
- **THEN** le composant LanguageSwitcher est visible dans la navigation

---

### Requirement: Basculement de locale sans rechargement complet
Lorsqu'un utilisateur clique sur une locale différente, la page SHALL naviguer vers la même route dans la nouvelle locale sans rechargement complet de l'application.

#### Scenario: Basculement FR → EN depuis la page d'accueil
- **WHEN** l'utilisateur est sur `/fr` et clique sur "EN"
- **THEN** l'URL devient `/en` et le contenu de la page est mis à jour en anglais

#### Scenario: Basculement EN → FR depuis la page About
- **WHEN** l'utilisateur est sur `/en/about` et clique sur "FR"
- **THEN** l'URL devient `/fr/about` et le contenu de la page est mis à jour en français

#### Scenario: Aucun rechargement de page complet
- **WHEN** l'utilisateur clique sur une langue différente
- **THEN** la page ne subit pas de rechargement complet (navigation client-side)

---

### Requirement: Indicateur de locale active
La locale courante SHALL être visuellement distinguée dans le switcher pour que l'utilisateur sache quelle langue est actuellement active.

#### Scenario: Locale active mise en évidence
- **WHEN** la page est en français (`/fr/*`)
- **THEN** le label "FR" est visuellement distinct du label "EN" (poids de police, couleur, ou soulignement)

#### Scenario: Locale inactive en retrait visuel
- **WHEN** la page est en anglais (`/en/*`)
- **THEN** le label "EN" est mis en évidence et "FR" est en retrait visuel

---

### Requirement: Accessibilité clavier et ARIA
Le composant SHALL être navigable au clavier et annoté avec des attributs ARIA appropriés.

#### Scenario: Navigation clavier
- **WHEN** l'utilisateur atteint le switcher via Tab
- **THEN** les deux options ("FR" et "EN") sont focusables et activables via Entrée ou Espace

#### Scenario: Attributs ARIA présents
- **WHEN** le composant est rendu
- **THEN** chaque bouton a un `aria-label` décrivant l'action (ex. "Passer en anglais" / "Switch to French")

#### Scenario: Bouton de la locale active marqué
- **WHEN** la locale active est "fr"
- **THEN** le bouton "FR" a l'attribut `aria-current="true"` ou `aria-pressed="true"`

---

### Requirement: Persistance de la locale entre les pages
La locale choisie SHALL être mémorisée et appliquée lors de la navigation entre pages.

#### Scenario: Persistance après navigation
- **WHEN** l'utilisateur sélectionne "EN" et navigue vers `/en/about`
- **THEN** la locale reste "en" et le LanguageSwitcher indique "EN" comme actif

#### Scenario: Persistance au rechargement
- **WHEN** l'utilisateur a sélectionné "EN" et recharge la page
- **THEN** la page se charge en anglais (cookie `NEXT_LOCALE` respecté)
