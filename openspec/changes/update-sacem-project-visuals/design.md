## Context

Le dossier source `assets/Projets/Sacem/` contient 11 fichiers non versionnés livrés en septembre 2026, à côté des 3 visuels déjà publiés. Ces sources ont des noms hétérogènes (`Capture d'écran 2026-09-07 123045.png`, avec accent et espaces) incompatibles avec la convention des autres dossiers de `public/images/projects/`, où tous les fichiers sont en kebab-case ASCII.

Le composant `CaseStudyGallery` applique une règle de mise en page implicite : quand la galerie contient 3 visuels ou plus, le premier occupe toute la largeur en ratio 16/7, les suivants se répartissent en grille 2 colonnes en ratio 16/10. La galerie SACEM actuelle ne contient qu'un seul visuel et ne déclenche donc jamais cette mise en page.

Toutes les images sont rendues en `object-cover` : une capture au ratio très différent de 16/10 sera rognée verticalement.

## Goals / Non-Goals

**Goals:**
- Donner au cas SACEM une couverture distincte et une galerie qui raconte le projet sur les 3 profils utilisateurs.
- Publier uniquement des visuels propres, nommés selon la convention du dépôt.
- Produire un nombre de visuels qui tombe juste dans la grille de `CaseStudyGallery`.

**Non-Goals:**
- Modifier `CaseStudyHero` ou `Projects.tsx`.
- Ajouter des légendes par visuel : le type `ProjectData` n'expose pas ce champ et l'introduire dépasserait le besoin.
- Retoucher, recadrer ou compresser les images sources.
- Versionner l'ensemble des captures du dossier `assets/` : seules les retenues sont copiées vers `public/`.

## Decisions

### Décision 1 — Sélection de 5 visuels publiés (1 couverture + 4 galerie)

Visuels retenus, avec leur rôle narratif :

| Source | Nom publié | Rôle |
|---|---|---|
| `BG_Censo.png` | `censo-cover.png` | Couverture : mise en situation du tableau de bord sur portable |
| `maquette_admin.png` | `censo-dashboard-admin.png` | Profil Administrateur : KPI, droits collectés, répartition par barème |
| `Capture d'écran ... 123045.png` | `censo-declarations-panneau.png` | Profil Gestionnaire fédération : liste des déclarations + panneau latéral |
| `gestionnaire_btn_paiement.png` | `censo-paiement-modale.png` | Tunnel de paiement structuré, l'un des manques identifiés dans le contexte |
| `Capture d'écran ... 123443.png` | `censo-contraste-rgaa.png` | Accessibilité : contrôle de contraste WCAG AA en temps réel, adossé au KPI « 106 critères RGAA » |

`ecran_sacem.png`, seul visuel de la galerie avant ce changement, est retiré : sa mise en situation fait doublon avec la nouvelle couverture et son écran date de juin, antérieur à l'état du produit montré par les autres captures. Le fichier publié est supprimé ; la source reste archivée dans `assets/Projets/Sacem/`.

Écartés et pourquoi :
- `Capture d'écran ... 123023.png` : chrome Figma visible en haut et notification « Outil Capture d'écran » incrustée en bas.
- `Capture d'écran ... 123013.png` : même écran que `123045` mais tronqué à gauche.
- `Capture d'écran ... 113402.png` : variante antérieure de la modale de paiement, moins aboutie que `gestionnaire_btn_paiement.png`.
- `Capture d'écran ... 122335.png` : tableau « Demandes d'adhésion » à 4 lignes, large zone vide en bas qui rend mal en `object-cover`.
- `Capture d'écran ... 123302.png` et `123313.png` : zone sensible / modale de désactivation. Bons exemples d'UX writing, mais ils racontent une fonctionnalité d'administration périphérique au récit du cas.
- `sacem1.png`, `sacem2.png` : déjà présents dans `assets/`, non retenus par le cas d'étude actuel, hors périmètre de ce changement.

**Alternative écartée :** publier les 11 nouvelles images et laisser la galerie tout afficher. Rejetée car la demande vise 3 à 4 visuels et une galerie longue dilue le propos ; les captures redondantes affaibliraient la lecture.

### Décision 2 — `BG_Censo.png` en couverture plutôt qu'en galerie

`BG_Censo.png` est une mise en situation (personne devant un portable), pas un écran exploitable à l'analyse. Elle fonctionne comme accroche sur la card homepage et le hero. `ecran_sacem.png` jouait le même rôle de mise en situation ; les deux ne sont pas cumulables, et c'est `BG_Censo.png` qui l'emporte car le tableau de bord qu'elle montre correspond au nouvel état du produit.

**Alternative écartée :** garder `ecran_sacem.png` en couverture et mettre `BG_Censo.png` en premier visuel de galerie. Rejetée pour la même raison d'actualité du produit.

### Décision 3 — Grille uniforme dans `CaseStudyGallery`

Le composant appliquait au premier visuel un traitement pleine largeur en 16/7 dès 3 images. Cette règle est supprimée : toutes les vignettes partagent désormais le même ratio 16/10 dans une grille à 2 colonnes.

Deux raisons. D'abord le cadrage : en 16/7, `censo-dashboard-admin.png` perdait son en-tête au rognage `object-cover` ; en 16/10 la capture est lisible en entier. Ensuite la régularité des rangées : la règle précédente produisait une cellule orpheline sur toutes les galeries à nombre pair, soit les trois concernées (Sacem 4, Société Générale 4, Multi-Agents Studio 6).

La portée est volontairement globale plutôt que limitée à Sacem. Les deux autres galeries y gagnent une grille complète, et le composant reste sans condition de mise en page.

**Alternative écartée :** conditionner le visuel pleine largeur à un nombre impair d'images. Même résultat visuel sur les trois galeries existantes, mais une règle implicite qui se déclencherait à la prochaine image ajoutée.

**Alternative écartée :** ajouter un champ au modèle de données pour désactiver le visuel pleine largeur projet par projet. Rejetée : un champ de plus pour un réglage dont aucun projet n'a aujourd'hui besoin.

### Décision 4 — Copie plutôt que déplacement des sources

Les fichiers sont copiés de `assets/Projets/Sacem/` vers `public/images/projects/sacem/`, pas déplacés. `assets/` reste le dépôt de travail de référence, cohérent avec ce qui est fait pour les autres projets (`assets/Projets/` et `public/images/projects/` coexistent).

## Risks / Trade-offs

- **Rognage en `object-cover`** → Les captures retenues ont un ratio proche de 16/10 ; leur information utile est en haut à gauche, préservée par le rognage centré. Vérification visuelle au navigateur prévue dans les tâches.
- **Perte du visuel pleine largeur sur deux autres cas d'étude** → Société Générale et Multi-Agents Studio n'ont plus de visuel mis en avant. Compensé par des rangées complètes ; réversible en restaurant la condition dans `CaseStudyGallery`.
- **Poids des images** → `BG_Censo.png` fait 1,2 Mo. Le composant `Image` de Next.js optimise et sert en AVIF/WebP à la demande, donc le poids livré au navigateur reste maîtrisé ; aucune pré-compression n'est faite pour ne pas dégrader la source.
- **Noms de fichiers source avec accents et espaces** → Résolu par le renommage à la copie ; aucun chemin accentué n'entre dans le code.
- **Données personnelles dans les captures** → Les captures contiennent des noms de personnes, adresses e-mail et numéros de téléphone. Décision prise : floutage gaussien des zones concernées à la copie vers `public/`, les sources dans `assets/` restent intactes. Le floutage ne porte que sur les identifiants de personnes physiques ; les noms d'associations sont conservés car ils portent le contexte métier de l'écran.

## Migration Plan

Aucune migration : ajout de fichiers statiques et modification de deux champs de données. Rollback = `git revert` du commit, les anciens chemins restant valides puisque `ecran_sacem.png` n'est pas supprimé.

## Open Questions

Aucune. La question des identités visibles dans `censo-declarations-panneau.png` et `censo-paiement-modale.png` est tranchée : floutage avant publication (voir Risks / Trade-offs).
