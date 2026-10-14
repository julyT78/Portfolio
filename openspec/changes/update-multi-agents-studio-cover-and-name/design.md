## Context

Le projet `multi-agents-studio` est la dernière entrée de `PROJECTS` dans `src/data/projects.ts`. Sa couverture actuelle (`getup-forward-dashboard.png`, 1660x962, 272 Ko) est aussi le premier visuel de sa galerie, et son titre porte encore le nom interne « GETUP Forward ».

Le nouvel asset livré, `assets/Projets/Multi-agents Studio/Pulse-dashboard.svg`, est un SVG de 1,8 Mo au `viewBox` `0 0 1400 1258` (rapport ~1,11:1, quasi carré). Il ne contient aucun tracé vectoriel : deux images PNG encodées en base64 dans un `<defs>`, l'une servant de fond plein cadre, l'autre superposée à `x=127 y=109`. C'est donc un PNG empaqueté en SVG, pas un vecteur redimensionnable sans perte.

Les composants consommateurs du champ `image` sont déjà en place et ne changent pas :
- `Projects.tsx` — card homepage, conteneur `aspect-[16/9]`, `object-cover`
- `CaseStudyHero.tsx` — hero du cas d'étude, conteneur `aspect-[16/7]`, `object-cover`
- `PresentationHero.tsx` — carousel, si le projet y figure

`next.config.ts` active déjà `dangerouslyAllowSVG` avec une CSP `script-src 'none'; sandbox`, le format SVG est donc servable sans configuration supplémentaire (le projet PULSE utilise déjà un SVG de ce type en couverture).

## Goals / Non-Goals

**Goals:**
- Remplacer la couverture du projet Multi-Agents Studio par le nouvel asset fourni.
- Faire disparaître le nom « GETUP Forward » de tout ce qui est rendu dans le portfolio : titre, textes du cas d'étude, noms de fichiers publiés.
- Garder la galerie, la structure de l'entrée et le rendu des composants inchangés.

**Non-Goals:**
- Pas de modification des composants de rendu (`Projects.tsx`, `CaseStudyHero.tsx`, `CaseStudyGallery.tsx`) : le cadrage reste celui, partagé, des autres projets.
- Pas de réécriture du récit du cas d'étude au-delà du remplacement du nom.
- Pas de renommage du slug, de la route `/projects/multi-agents-studio` ni de l'`id` de l'entrée — ils ne contiennent pas « getup ».
- Pas de modification de l'asset du projet PULSE ni du dossier source `assets/`.

## Decisions

**1. Nom du fichier publié : `multi-agents-studio-cover.svg`, pas `Pulse-dashboard.svg`**
La spec `multi-agents-studio-project-entry` impose des noms kebab-case ASCII dans `public/images/projects/multi-agents-studio/` ; `Pulse-dashboard.svg` comporte une majuscule. Conserver le nom d'origine créerait en plus deux fichiers homonymes dans deux dossiers projets différents, source de confusion au moment d'une future relecture. Alternative écartée : `pulse-dashboard.svg`, conforme au kebab-case mais qui attache durablement le nom d'un autre projet du portfolio à la couverture de celui-ci.

**2. Renommer aussi les deux assets `getup-forward-*.png`**
La demande est de supprimer le nom GETUP Forward du projet. Les chemins d'images sont visibles dans le HTML rendu et dans l'onglet réseau ; les laisser tels quels laisserait l'ancien nom accessible. Le renommage est sans risque : ces deux fichiers ne sont référencés que depuis `src/data/projects.ts`. Alternative écartée : ne toucher qu'au titre, ce qui laisse « getup-forward » dans le DOM.

**3. Garder les 6 visuels de la galerie**
La couverture actuelle (le tableau de bord de formation) reste pertinente comme premier visuel de galerie : c'est un écran réel du produit. Contrairement au change SACEM, où l'ancien visuel était remplacé, il n'y a ici aucune raison de l'enlever. Alternative écartée : retirer `multi-agents-studio-dashboard.png` de la galerie, ce qui appauvrirait le cas d'étude sans bénéfice.

**4. Conserver `object-cover` malgré le format quasi carré du SVG**
L'asset est en 1400x1258 alors que la card est en 16/9 et le hero en 16/7. En `object-cover` centré, environ 56 % de la hauteur est rognée sur la card et 65 % sur le hero : les bandes haute et basse de l'image (haut du mur violet, pied de l'écran et bureau) disparaissent, et l'écran du tableau de bord, qui occupe la bande centrale, reste visible. Le cadrage est donc acceptable sans toucher au composant. Alternatives écartées : (a) passer en `object-contain`, qui modifierait un composant partagé par tous les projets et laisserait des bandes vides ; (b) produire une variante recadrée en ajustant le `viewBox` du SVG (par exemple `0 300 1400 787`), techniquement propre puisque les images embarquées gardent leurs coordonnées, mais qui crée un second fichier à maintenir. L'option (b) reste la solution de repli si le rendu réel se révèle mal cadré à l'étape de validation.

**5. Ne pas optimiser le poids de l'asset dans ce change**
1,8 Mo pour une couverture de homepage est lourd, mais le projet PULSE sert déjà un SVG comparable (1,6 Mo) : le changement n'introduit pas une pratique nouvelle. Une conversion en PNG ou WebP compressé relève d'un change de performance distinct, couvrant tous les projets. Le poids est mesuré à l'étape de validation pour vérifier qu'il ne dégrade pas le chargement de la homepage.

## Risks / Trade-offs

- **La même image en couverture de deux projets** → Risque principal, non technique : la crédibilité de la homepage. Voir Open Questions ; arbitrage utilisateur requis avant d'exécuter les tâches de publication d'asset.
- **Cadrage 16/9 et 16/7 sur un visuel quasi carré** → Contrôle visuel sur card et hero à l'étape de validation ; repli documenté en décision 4 (variante au `viewBox` recadré).
- **Poids de 1,8 Mo sur la première image visible de la homepage** → Mesure du temps de chargement et du poids transféré à la validation ; si la dégradation est nette, ouvrir un change d'optimisation des couvertures.
- **Oubli d'une occurrence de « GETUP »** → Un `grep -ri "getup"` sur `src/` et `public/` sert de critère d'acceptation explicite dans les tâches.
- **Lien rompu si un fichier renommé est référencé ailleurs** → Vérification par `grep` avant renommage ; la recherche initiale n'a trouvé de référence que dans `src/data/projects.ts`.

## Migration Plan

Changement de données et d'assets, sans migration d'état ni de schéma. Déploiement en une étape avec le reste du site. Retour arrière : `git revert` du commit restaure l'ancienne couverture, les anciens noms de fichiers et l'ancien titre.

Les specs `openspec/specs/multi-agents-studio-project-entry/spec.md` et `openspec/specs/case-study-page/spec.md` sont mises à jour au moment de l'archivage du change, pas pendant l'implémentation.

## Open Questions

**Q1 — Doublon supposé avec la couverture du projet PULSE : question close, l'alerte était infondée.**
Une première lecture du SVG n'avait décodé que son calque de fond et concluait à un doublon avec la couverture du projet PULSE. C'est faux : le fichier superpose deux calques. Le calque de fond (`img1`, 1400x1258) est bien la même photo d'écran en ambiance violette que celle du projet PULSE, mais le calque supérieur (`img2`, 1088x907, positionné à `x=127 y=109`) est l'écran du tableau de bord Multi-Agents Studio, incrusté sur la dalle. Les deux couvertures partagent donc la mise en situation et le cadrage, pas le contenu affiché. Vérifié au rendu : la card PULSE montre le dashboard de suivi de tâches, la card Multi-Agents Studio le tableau de bord de formation.

Option retenue le 14 octobre 2026 : appliquer tel quel. La couverture du projet PULSE n'est pas modifiée.

**Q2 — Le logo « GETUP Forward » est incrusté dans l'image de couverture.**
Le calque supérieur du SVG est une capture de l'interface telle qu'elle existait, en-tête compris : le logo « GETUP Forward » apparaît en haut à gauche du tableau de bord. Le nom a donc disparu du texte, des titres et des noms de fichiers, mais reste visible dans le pixel de la couverture sur la card homepage. Le cadrage 16/7 du hero le fait disparaître, celui de la card 16/9 le laisse visible en petit.

Trois issues possibles :
- **(a)** Laisser tel quel : le logo est peu lisible à la taille de la card.
- **(b)** Faire regénérer le visuel à partir d'une maquette dont l'en-tête porte le nouveau nom.
- **(c)** Retoucher l'image publiée pour masquer ou remplacer le logo.

Non bloquant pour ce change : décision à prendre séparément, l'exigence « aucune occurrence de GETUP » portant sur le contenu textuel et les chemins de fichiers.
