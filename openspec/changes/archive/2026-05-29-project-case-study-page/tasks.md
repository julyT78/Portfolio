## 1. Extension du modèle de données

- [x] 1.1 Ajouter les types `ChallengeEntry`, `DeepDiveSection` et `AgentFlowNode` dans `src/data/projects.ts`
- [x] 1.2 Ajouter les champs optionnels `challenges`, `deepDiveSections` et `agentFlow` dans le type `ProjectData`
- [x] 1.3 Vérifier que le build TypeScript passe sans erreur (`tsc --noEmit`)

## 2. Composant CaseStudyChallengeModule

- [x] 2.1 Créer `src/components/sections/case-study/CaseStudyChallengeModule.tsx`
- [x] 2.2 Implémenter le layout deux colonnes (faille IA / solution UX) avec les tokens design (color-block, typography)
- [x] 2.3 Gérer l'affichage conditionnel de l'image optionnelle dans la colonne droite
- [x] 2.4 Retourner `null` si `project.challenges` est absent ou vide
- [x] 2.5 Ajouter les attributs ARIA pour l'accessibilité de la structure sémantique

## 3. Composant CaseStudyDeepDive

- [x] 3.1 Créer `src/components/sections/case-study/CaseStudyDeepDive.tsx`
- [x] 3.2 Implémenter les accordéons avec état local React (`useState`) — tous fermés par défaut
- [x] 3.3 Ajouter les attributs ARIA (`aria-expanded`, `aria-hidden`) sur les boutons et corps
- [x] 3.4 Retourner `null` si `project.deepDiveSections` est absent ou vide

## 4. Composant CaseStudyAgentFlow

- [x] 4.1 Créer `src/components/sections/case-study/CaseStudyAgentFlow.tsx`
- [x] 4.2 Implémenter le rendu des nœuds avec styles différenciés par type (`input`, `process`, `output`, `decision`)
- [x] 4.3 Ajouter les connecteurs visuels entre nœuds adjacents
- [x] 4.4 Assurer le layout vertical (colonne) sous 768px
- [x] 4.5 Retourner `null` si `project.agentFlow` est absent ou vide

## 5. Intégration dans la page case study

- [x] 5.1 Importer les trois nouveaux composants dans `src/app/[locale]/projects/[slug]/page.tsx`
- [x] 5.2 Ajouter les clés i18n pour les labels des nouveaux modules dans `messages/fr.json` et `messages/en.json`
- [x] 5.3 Intégrer les composants dans l'ordre : Hero → Context → Approach → AgentFlow → ChallengeModule → Gallery → DeepDive → Results → Nav
- [x] 5.4 Passer les props nécessaires depuis `getTranslations` pour les labels

## 6. Données de démonstration

- [x] 6.1 Renseigner `challenges`, `deepDiveSections` et `agentFlow` pour le projet `pulse` dans `src/data/projects.ts`
- [x] 6.2 Vérifier visuellement la page `/fr/projects/pulse` avec les nouveaux modules affichés

## 7. Validation

- [x] 7.1 Vérifier que les projets sans nouveaux champs (numspot, sharecare si présents) s'affichent sans erreur
- [x] 7.2 Tester la responsivité mobile des trois nouveaux composants (viewport < 768px)
- [x] 7.3 Tester l'accessibilité des accordéons avec un lecteur d'écran ou l'outil d'audit du navigateur
- [x] 7.4 Lancer le build de production (`next build`) sans erreur TypeScript ni runtime
