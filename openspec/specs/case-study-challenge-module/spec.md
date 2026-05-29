# Spec: case-study-challenge-module

<!-- synced from change: project-case-study-page — 2026-05-29 -->

### Requirement: Module Challenge IA vs Solution UX affiché
La page case study SHALL afficher le composant `CaseStudyChallengeModule` lorsque le projet possède un champ `challenges` non vide. Chaque entrée du tableau SHALL être rendue sous forme d'une paire à deux colonnes : colonne gauche (faille IA) et colonne droite (solution UX conçue).

#### Scenario: Affichage d'un challenge unique
- **WHEN** un projet possède un tableau `challenges` avec au moins une entrée
- **THEN** le composant affiche le titre de la faille et son détail dans la colonne gauche, et le titre de la solution et son détail dans la colonne droite

#### Scenario: Plusieurs challenges
- **WHEN** un projet possède plusieurs entrées dans `challenges`
- **THEN** chaque paire est affichée en séquence, dans l'ordre du tableau, en conservant le layout deux colonnes

#### Scenario: Absence de challenges
- **WHEN** le champ `challenges` est absent ou vide dans les données projet
- **THEN** le composant n'est pas rendu et aucun espace vide n'apparaît dans la page

---

### Requirement: Image de solution optionnelle dans le module Challenge
Lorsqu'une entrée `challenges` possède un champ `image`, le composant SHALL afficher cette image dans la colonne droite, au-dessus ou en illustration du texte de solution.

#### Scenario: Image de solution présente
- **WHEN** une entrée challenge possède un champ `image` renseigné
- **THEN** l'image est affichée dans la colonne droite avec un attribut `alt` descriptif

#### Scenario: Image de solution absente
- **WHEN** une entrée challenge ne possède pas de champ `image`
- **THEN** la colonne droite affiche uniquement le texte de solution, sans espace réservé vide

---

### Requirement: Accessibilité du module Challenge
Le composant SHALL être accessible selon les critères WCAG 2.1 AA.

#### Scenario: Structure sémantique correcte
- **WHEN** le composant est rendu
- **THEN** les colonnes utilisent des balises sémantiques appropriées (section, article, ou div avec rôle explicite) et chaque paire constitue une unité lisible dans l'ordre du DOM
