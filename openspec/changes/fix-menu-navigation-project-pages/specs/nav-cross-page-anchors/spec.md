## ADDED Requirements

### Requirement: Navigation vers les sections de la home depuis une page intérieure
Depuis n'importe quelle page autre que la page d'accueil, les liens du menu principal (Projets, À propos, Contact) SHALL rediriger l'utilisateur vers la section correspondante de la page d'accueil tout en préservant la locale active.

#### Scenario: Clic sur Projets depuis une page projet
- **WHEN** l'utilisateur se trouve sur `/[locale]/projects/[slug]` et clique sur le lien "Projets" dans le menu
- **THEN** le navigateur navigue vers `[locale]/#projets` et scrolle jusqu'à la section projets de la home

#### Scenario: Clic sur À propos depuis une page projet
- **WHEN** l'utilisateur se trouve sur `/[locale]/projects/[slug]` et clique sur le lien "À propos"
- **THEN** le navigateur navigue vers `[locale]/#about` et scrolle jusqu'à la section about de la home

#### Scenario: Clic sur Contact depuis une page projet
- **WHEN** l'utilisateur se trouve sur `/[locale]/projects/[slug]` et clique sur le lien "Contact"
- **THEN** le navigateur navigue vers `[locale]/#contact` et scrolle jusqu'à la section contact de la home

### Requirement: Comportement inchangé sur la page d'accueil
Sur la page d'accueil, les liens du menu SHALL continuer à fonctionner comme des ancres simples (scroll fluide sans rechargement de page).

#### Scenario: Clic sur Projets depuis la home
- **WHEN** l'utilisateur se trouve sur `/[locale]/` et clique sur le lien "Projets"
- **THEN** la page scrolle vers la section `#projets` sans rechargement

#### Scenario: Clic sur Contact depuis la home
- **WHEN** l'utilisateur se trouve sur `/[locale]/` et clique sur le lien "Contact"
- **THEN** la page scrolle vers la section `#contact` sans rechargement

### Requirement: Cohérence desktop et mobile
Les liens du menu mobile (hamburger) SHALL avoir le même comportement de redirection cross-page que les liens desktop.

#### Scenario: Clic sur Projets via menu mobile depuis une page projet
- **WHEN** l'utilisateur ouvre le menu hamburger sur `/[locale]/projects/[slug]` et clique sur "Projets"
- **THEN** le menu se ferme et le navigateur navigue vers `[locale]/#projets`
