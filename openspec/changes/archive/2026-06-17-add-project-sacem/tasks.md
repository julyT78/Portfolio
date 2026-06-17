## 1. Préparation des assets

- [x] 1.1 Copier `assets/Projets/Sacem/ecran_sacem.png` vers `public/images/projects/sacem/ecran_sacem.png`
- [x] 1.2 Vérifier que le fichier est accessible via l'URL `/images/projects/sacem/ecran_sacem.png` (lancer le dev server si besoin)

## 2. Données projet dans projects.ts

- [x] 2.1 Ajouter l'objet `ProjectData` pour `id: "sacem"` dans le tableau `PROJECTS` avec les champs homepage : `client: "SACEM"`, `year: "2026"`, `title`, `tagline`, `tags`, `color: "bg-lilac"`, `image`, `href`, `kpi`, `deepDive`
- [x] 2.2 Ajouter les champs case study : `context` (description CENSO et fédérations), `role`, `duration`, `approach` (3+ étapes : audit RGAA IA, base de connaissances, recherche UX), `results` (4 items issus des images)
- [x] 2.3 Vérifier que TypeScript compile sans erreur (`npx tsc --noEmit`)

## 3. Vérification homepage

- [x] 3.1 Démarrer le dev server et confirmer que la card Sacem apparaît dans la section Projets de la homepage avec la couleur lilac
- [x] 3.2 Confirmer que le lien "Voir le cas" pointe vers `/fr/projects/sacem` (ou `/en/projects/sacem`)

## 4. Vérification page case study

- [x] 4.1 Accéder à `/fr/projects/sacem` et confirmer que la page s'affiche sans erreur 404
- [x] 4.2 Vérifier que le hero affiche : client SACEM, titre, tagline, KPI badge et tags
- [x] 4.3 Vérifier que l'image `ecran_sacem.png` s'affiche dans la galerie ou le hero sans erreur
- [x] 4.4 Vérifier que les sections contexte, démarche et résultats sont visibles et cohérentes avec le contenu des images Sacem
