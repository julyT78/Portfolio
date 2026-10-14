## 1. Arbitrage préalable

- [x] 1.1 Trancher la question Q1 de `design.md` : le visuel `Pulse-dashboard.svg` est le même que la couverture du projet PULSE — **décision : option (a), appliquer tel quel**. Le doublon de couverture entre PULSE et Multi-Agents Studio est assumé, la couverture de PULSE reste inchangée.

## 2. Publication de l'asset de couverture

- [x] 2.1 Copier `assets/Projets/Multi-agents Studio/Pulse-dashboard.svg` vers `public/images/projects/multi-agents-studio/multi-agents-studio-cover.svg`
- [x] 2.2 Vérifier que le fichier copié est identique à la source (`md5`) et que le dossier source `assets/Projets/Multi-agents Studio/` n'a pas été modifié
- [x] 2.3 Renommer `public/images/projects/multi-agents-studio/getup-forward-dashboard.png` en `multi-agents-studio-dashboard.png` (`git mv`)
- [x] 2.4 Renommer `public/images/projects/multi-agents-studio/getup-forward-niveau-1.png` en `multi-agents-studio-niveau-1.png` (`git mv`)
- [x] 2.5 Lister `public/images/projects/multi-agents-studio/` et confirmer 7 fichiers, tous en kebab-case ASCII, aucun ne contenant `getup-forward`

## 3. Mise à jour de la source de données

- [x] 3.1 Dans `src/data/projects.ts`, entrée `id: "multi-agents-studio"` : remplacer le champ `image` par `/images/projects/multi-agents-studio/multi-agents-studio-cover.svg`
- [x] 3.2 Remplacer le champ `title` `"GETUP Forward — Multi-Agents Studio"` par `"Multi-Agents Studio"`
- [x] 3.3 Mettre à jour les deux premiers chemins du champ `gallery` vers `multi-agents-studio-dashboard.png` et `multi-agents-studio-niveau-1.png`, en conservant l'ordre et les 6 visuels
- [x] 3.4 Dans le champ `context`, remplacer « une plateforme GETUP Forward structurée en 4 pôles continus » par la même phrase désignant la plateforme sous le nom « Multi-Agents Studio »
- [x] 3.5 Dans `approach[1].body`, remplacer « Conception du parcours GETUP Forward » par « Conception du parcours Multi-Agents Studio »
- [x] 3.6 Exécuter `grep -ri "getup" src/ public/` et confirmer zéro résultat

## 4. Validation

- [x] 4.1 Lancer `npx tsc --noEmit` puis `npm run build` et confirmer l'absence d'erreur
- [x] 4.2 Démarrer le serveur de dev, ouvrir la homepage et vérifier que la card Multi-Agents Studio affiche la nouvelle couverture et le titre « Multi-Agents Studio »
- [x] 4.3 Contrôler le cadrage de la couverture en 16/9 sur la card : l'écran du tableau de bord reste lisible et n'est pas coupé au point de perdre son sujet — **cadrage validé, repli de la décision 4 non nécessaire**
- [x] 4.4 Ouvrir `/fr/projects/multi-agents-studio` et `/en/projects/multi-agents-studio` : statut 200, hero en 16/7 avec la nouvelle couverture correctement cadrée, galerie à 6 visuels sans 404
- [x] 4.5 Vérifier dans l'onglet réseau que `multi-agents-studio-cover.svg`, `multi-agents-studio-dashboard.png` et `multi-agents-studio-niveau-1.png` renvoient un statut 200, et relever le poids transféré de la couverture — **200 pour les trois ; couverture servie en 1 849 176 octets (`image/svg+xml`)**
- [x] 4.6 Rechercher « GETUP » dans le HTML rendu de la homepage et de la page case study : aucune occurrence — **0 sur `/fr`, `/en`, `/fr/projects/multi-agents-studio`, `/en/projects/multi-agents-studio`**
- [x] 4.7 Tester avec playwright-skill le rendu responsive de la card et du hero en mobile (375 px) et en desktop : pas de débordement, visuel lisible
- [x] 4.8 Contrôler la card du projet PULSE sur la homepage : vérifier le résultat de l'arbitrage de la tâche 1.1 sur la cohabitation des deux couvertures — **pas de doublon : voir la correction de Q1 dans `design.md`, les deux couvertures partagent la photo de fond mais affichent des écrans différents**
