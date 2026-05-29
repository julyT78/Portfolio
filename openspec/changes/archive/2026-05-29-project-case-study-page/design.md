## Context

La page case study (`/[locale]/projects/[slug]`) est opérationnelle avec six composants : Hero, Context, Approach, Gallery, Results, Nav. Ces composants couvrent le "Niveau 1" (lecture rapide) mais n'implémentent pas le gabarit Double Vitesse décrit dans PRODUCT.md, qui exige un module "Challenge IA vs Solution UX" et des accordéons "Deep Dive" pour la lecture Voie B. Sans ces éléments, le persona Thomas (Head of Design) quitte la page sans avoir évalué la rigueur méthodologique.

Le modèle de données `ProjectData` dans `src/data/projects.ts` est centré sur les champs de lecture rapide. Aucun champ ne permet de stocker les paires (faille IA → solution UX), les sections deep dive structurées, ou les métadonnées de flux d'agent.

## Goals / Non-Goals

**Goals:**
- Ajouter le module "Challenge IA vs Solution UX" dans la page case study
- Ajouter la section Deep Dive en accordéons (Voie B)
- Ajouter un composant schéma de flux d'agent (diagramme visuel simplifié)
- Étendre `ProjectData` avec les champs nécessaires sans casser les composants existants (champs optionnels)
- Respecter les tokens design existants (DESIGN.md : pill buttons, color-block sections, no glassmorphism)

**Non-Goals:**
- Refonte des composants existants (Hero, Context, Approach, Gallery, Results, Nav)
- Système de filtres dynamiques sur la page case study (appartient à la liste de projets, pas au détail)
- Diagrammes interactifs ou animés (hors scope MVP)
- Contenu deep dive pour tous les projets dès le premier sprint (les champs sont optionnels)

## Decisions

### 1. Champs optionnels dans `ProjectData`

**Décision** : Les nouveaux champs (`challenges`, `deepDiveSections`, `agentFlow`) sont optionnels (`?`) dans le type TypeScript.

**Rationale** : Les projets existants (pulse, numspot, sharecare) n'ont pas encore ce contenu rédigé. Les rendre optionnels évite de bloquer le déploiement et permet une adoption incrémentale.

**Alternative considérée** : Créer un fichier de données séparé `projects-extended.ts`. Rejeté — la fragmentation des sources de vérité augmente la charge de maintenance sans bénéfice architectural.

---

### 2. Structure des challenges

**Décision** : `challenges: Array<{ flaw: string; flawDetail: string; solution: string; solutionDetail: string; image?: string }>`.

**Rationale** : La structure à deux colonnes du PRODUCT.md se mappe directement sur une paire `(flaw, solution)`. Les champs `Detail` permettent un texte court d'explication. `image` optionnelle pour illustrer la solution (screenshot de l'écran conçu).

---

### 3. Structure des sections Deep Dive

**Décision** : `deepDiveSections: Array<{ title: string; body: string }>` — structure générique plutôt que champs nommés (trainingData, trustManagement…).

**Rationale** : Les quatre catégories mentionnées dans PRODUCT.md (données d'entraînement, confiance, fallback, parcours probabilistes) varient selon les projets. Une structure générique titre/corps est plus flexible et ne force pas de remplir des champs non pertinents pour chaque projet.

---

### 4. Composant `CaseStudyAgentFlow`

**Décision** : Le flux d'agent est rendu comme une liste d'étapes visuelles (composant HTML/CSS) plutôt qu'un SVG inline ou une bibliothèque de diagrammes.

**Rationale** : Aucune bibliothèque de diagramme n'est actuellement dans les dépendances. Un composant CSS-only avec des nœuds et des connecteurs couvre le besoin "diagramme simplifié" du Niveau 1 sans ajouter de dépendance externe.

**Champ de données** : `agentFlow: Array<{ node: string; label: string; type: 'input' | 'process' | 'output' | 'decision' }>`.

---

### 5. Position dans la page

**Décision** : Ordre d'affichage dans `/[locale]/projects/[slug]/page.tsx` :
1. CaseStudyHero
2. CaseStudyContext
3. CaseStudyApproach
4. **CaseStudyAgentFlow** (nouveau — Niveau 1)
5. **CaseStudyChallengeModule** (nouveau — Niveau 1+2)
6. CaseStudyGallery
7. **CaseStudyDeepDive** (nouveau — Niveau 2)
8. CaseStudyResults
9. CaseStudyNav

**Rationale** : Le flux d'agent appartient à la démarche (Niveau 1), les challenges sont le cœur de la valeur (visibles sans scroll profond), et le deep dive arrive en fin de page pour ne pas bloquer la lecture rapide.

---

### 6. Internationalisation

**Décision** : Les labels des nouveaux composants passent par les clés i18n existantes dans `messages/fr.json` et `messages/en.json` via `getTranslations({ namespace: "caseStudy" })`. Le contenu narratif (flaw, solution, body) reste dans `projects.ts` en langue unique pour le MVP — les champs seront localisés dans un sprint suivant.

**Rationale** : Localiser les données projet dans `projects.ts` nécessite une refonte de la structure (objet par locale) qui dépasse le scope de ce changement.

## Risks / Trade-offs

**[Risque] Contenu vide pour les projets existants** → Les composants n'affichent rien si les champs optionnels sont absents (guard `if (!project.challenges?.length) return null`). Aucun composant cassé.

**[Risque] Composant `CaseStudyAgentFlow` sans SVG peut paraître basique** → Pour le MVP, la lisibilité prime sur l'esthétique. Une migration vers un SVG généré ou une lib légère (ex. `reactflow` lite) est possible dans un sprint ultérieur.

**[Trade-off] Contenu dans `projects.ts` vs MDX** → Stocker le contenu dans le fichier de données (vs MDX par projet) simplifie le routing et la gestion des types mais rend l'édition de contenu long moins confortable. À revoir si le volume de contenu deep dive augmente significativement.

## Open Questions

- Le schéma de flux d'agent pour le projet `pulse` est-il disponible sous forme de liste d'étapes, ou faut-il le créer de zéro ?
- Les screenshots "solution UX" du module Challenge doivent-ils être les mêmes images que la galerie, ou des images dédiées ?
