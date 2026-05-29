## Why

La page case study existante couvre uniquement le "Niveau 1" du gabarit Double Vitesse défini dans PRODUCT.md : contexte, démarche, galerie, résultats. Les éléments différenciateurs qui justifient le positionnement d'Orchestratrice IA — le module "Challenge IA vs Solution UX" et les blocs Deep Dive en accordéon — sont absents, ce qui prive Thomas (Head of Design) de la rigueur méthodologique qu'il vient chercher.

## What Changes

- **Module "Challenge IA vs Solution UX"** : nouveau composant à deux colonnes — gauche : la faille IA identifiée (latence, hallucination, incohérence) ; droite : l'écran conçu pour l'absorber. Répété comme pattern récurrent sur chaque case study.
- **Blocs Deep Dive en accordéon** : section dépliable "Niveau 2" contenant analyse des données d'entraînement, gestion de la confiance (explicabilité algorithmique), arbres de décision fallback UX, et parcours utilisateur probabilistes.
- **Schéma de flux d'agent simplifié** : diagramme visuel (SVG ou composant) illustrant l'architecture d'agent du projet, affiché en Niveau 1 (lecture rapide).
- **Extension du modèle de données** : ajout des champs `challenges`, `deepDive sections` et `agentFlow` dans `ProjectData` pour alimenter ces nouveaux modules.

## Capabilities

### New Capabilities
- `case-study-challenge-module`: Composant "Challenge IA vs Solution UX" — layout deux colonnes affiché dans chaque case study, alimenté par un tableau de paires `{ flaw, solution }` dans les données projet.
- `case-study-deep-dive-accordions`: Section accordéon "Deep Dive" — blocs dépliables pour la lecture Voie B (Thomas), avec contenu structuré : données d'entraînement, confiance, fallback UX, parcours probabilistes.
- `case-study-agent-flow`: Composant schéma de flux d'agent — diagramme visuel simplifié (SVG/inline) de l'architecture d'agent, affiché en lecture Voie A.

### Modified Capabilities
- `case-study-page`: Extension du type `ProjectData` avec les champs `challenges`, `deepDiveSections` et `agentFlow` ; intégration des trois nouveaux composants dans la page `/[locale]/projects/[slug]`.

## Impact

- `src/data/projects.ts` : extension du type `ProjectData` et des données des projets existants (pulse, numspot, sharecare).
- `src/components/sections/case-study/` : ajout de `CaseStudyChallengeModule.tsx`, `CaseStudyDeepDive.tsx`, `CaseStudyAgentFlow.tsx`.
- `src/app/[locale]/projects/[slug]/page.tsx` : intégration des nouveaux composants.
- `messages/fr.json` et `messages/en.json` : ajout des clés i18n pour les labels des nouveaux modules.
- Aucune dépendance externe ajoutée — utilisation des composants et tokens design existants.
