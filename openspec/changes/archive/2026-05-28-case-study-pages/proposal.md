## Why

Les cards projets de la homepage exposent un deepDive en accordéon — suffisant pour un survol, mais insuffisant pour convaincre un recruteur ou un client qui veut comprendre la démarche complète. Il manque une page dédiée par projet qui raconte le contexte, la méthodologie, les livrables et les résultats de façon immersive et mémorable.

## What Changes

- Création d'une route dynamique `/[locale]/projects/[slug]` pour chaque projet
- Chaque case study page affiche : hero avec accroche + KPI, contexte, objectif, démarche UX (sections visuelles), résultats clés, navigation entre projets
- Les cards projets de la homepage obtiennent un lien fonctionnel vers leur case study (remplacement du `href: "#projets"` placeholder)
- Ajout des données case study étendues (galerie d'images, étapes, livrables) dans la source de données projets

## Capabilities

### New Capabilities

- `case-study-page` : Route `/[locale]/projects/[slug]` — page case study complète par projet avec hero, sections narrative, galerie de visuels, résultats et navigation inter-projets
- `project-data-model` : Modèle de données étendu pour les projets — ajout des champs case study (images galerie, sections narrative, étapes démarche) dans une source centralisée (`src/data/projects.ts`)

### Modified Capabilities

- `projects-section` : Le lien "Voir le cas →" des cards pointe désormais vers `/[locale]/projects/[slug]` au lieu de `#projets`

## Impact

- Nouveau dossier `src/app/[locale]/projects/[slug]/`
- Nouveau fichier `src/data/projects.ts` (source de vérité des projets, partagée entre homepage cards et case study pages)
- Modification `src/components/sections/Projects.tsx` pour utiliser `src/data/projects.ts` et corriger les `href`
- Images déjà présentes dans `public/images/book/` pour chaque client
- Messages i18n à étendre pour les labels des case study pages
