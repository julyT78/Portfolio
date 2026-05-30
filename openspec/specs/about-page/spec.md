# Spec: about-page

<!-- synced from change: page-about — 2026-05-28 -->
<!-- synced from change: language-switcher — 2026-05-30 -->

### Requirement: Page /about accessible et indexable
La route `/[locale]/about` SHALL exister et retourner un statut HTTP 200 pour les locales `fr` et `en`.

#### Scenario: Accès direct à la page en français
- **WHEN** un visiteur accède à `/fr/about`
- **THEN** la page se charge avec un statut 200 et affiche le contenu en français

#### Scenario: Accès direct à la page en anglais
- **WHEN** un visiteur accède à `/en/about`
- **THEN** la page se charge avec un statut 200 et affiche le contenu en anglais

#### Scenario: Navigation depuis la homepage
- **WHEN** un visiteur clique sur le CTA "En savoir plus sur mon parcours" dans `AboutTeaser`
- **THEN** il est redirigé vers `/[locale]/about` sans erreur 404

---

### Requirement: Section hero synthétique (Persona A — scan 30s)
La page SHALL présenter une section hero permettant à un recruteur pressé de comprendre le positionnement de Julie en moins de 30 secondes.

#### Scenario: Affichage du titre principal
- **WHEN** la page se charge
- **THEN** un heading `h1` est visible avec le titre de posture de Julie (ex. "AI Orchestrator & UX Designer")

#### Scenario: Affichage du sous-titre de positionnement
- **WHEN** la page se charge
- **THEN** un sous-titre décrivant la spécialité IA est visible sous le titre

#### Scenario: Pills CTA présents
- **WHEN** la page se charge
- **THEN** au moins un lien CTA vers `#contact` est visible dans la section hero

---

### Requirement: Bloc narratif du pivot (Persona B — profil pointu)
La page SHALL inclure une section narrative expliquant le pivot de Product Design classique vers l'AI Design, destinée aux profils techniques.

#### Scenario: Affichage du contenu narratif
- **WHEN** la page se charge
- **THEN** un bloc de texte d'au moins 3 phrases sur le pivot 2024 est présent dans le DOM

#### Scenario: Contenu non tronqué sur desktop
- **WHEN** la page est affichée sur un viewport ≥ 1280px
- **THEN** le bloc narratif est entièrement lisible sans interaction (pas de "Lire plus" par défaut)

---

### Requirement: Timeline d'expériences professionnelles
La page SHALL afficher les expériences clés de Julie en ordre chronologique inverse.

#### Scenario: Au moins 3 entrées de timeline visibles
- **WHEN** la page se charge
- **THEN** au moins 3 entrées d'expérience sont visibles, chacune avec une année, un titre et une description courte

#### Scenario: Ordre chronologique inverse
- **WHEN** la page se charge
- **THEN** l'expérience la plus récente apparaît en premier dans la liste

---

### Requirement: Grille compétences et certifications
La page SHALL afficher les compétences et certifications de Julie.

#### Scenario: Compétences affichées sous forme de pills
- **WHEN** la page se charge
- **THEN** les compétences clés sont visibles sous forme de pills ou tags

#### Scenario: Certifications avec années
- **WHEN** la page se charge
- **THEN** chaque certification affiche son année associée

---

### Requirement: CTA contact en bas de page
La page SHALL inclure une invitation claire à contacter Julie.

#### Scenario: Présence du CTA contact
- **WHEN** la page se charge
- **THEN** un lien ou bouton pointant vers `#contact` ou la section contact est visible

---

### Requirement: Page responsive
La page SHALL être utilisable sur mobile (375px), tablette (768px) et desktop (1280px).

#### Scenario: Affichage mobile sans overflow horizontal
- **WHEN** la page est affichée sur un viewport de 375px de large
- **THEN** aucun contenu ne déborde horizontalement (scrollWidth ≤ innerWidth)

#### Scenario: Lisibilité sur tablette
- **WHEN** la page est affichée sur un viewport de 768px de large
- **THEN** tous les titres et corps de texte sont lisibles sans zoom

---

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
